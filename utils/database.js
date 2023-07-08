import mongoose from "mongoose";


// This will allow to track the connection status
let isConnected = false 

export const connectDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        console.log(`MongoDB is already connected...`)
        return;
    }

    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, {
            dbName: "Promptopia",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true
        console.log(`MongoDB connected`)
    } catch (error) {
        console.error(error)
    }
}