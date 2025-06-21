import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)

        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI)
            console.log('MongoDB connected')
        } else {
            throw new Error("Variable d'environnement MONGO_URI non définie")
        }
    }
    catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

export default connectDB