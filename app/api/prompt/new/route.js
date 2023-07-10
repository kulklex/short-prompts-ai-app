import { connectDB } from '@/utils/database'
import Prompt from '@/models/prompt'

export const POST = async (req, res) => {
    const posts = await req.json()

    try{
        await connectDB()

        const newPrompt = new Prompt({...posts, creator: posts.userId})

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        console.error(error)
        return new Response("Failed to create a new prompt", {status: 500})
    }
}