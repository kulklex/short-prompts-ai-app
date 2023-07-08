import User from '@/models/user'
import { connectDB } from '@/utils/database'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {       
        async session({ session }) {
            const sessionUser = await User.findOne({email: session.user.email})

            session.user.id = sessionUser._id.toString()

            return session;
        },
        async signIn({ profile }) {
            try {
                await connectDB()

                //check if the user already exists
                const userExists = await User.findOne({email: profile.email})
                
                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;
            } catch (error) {
                console.error("Error checking if user exists",error?.message)
                return false;
            }
        }
    }
})

export {handler as GET, handler as POST}