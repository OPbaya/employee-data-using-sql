import mongoose from "mongoose"


export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB);

        console.log("MongoDB Connected");
    } catch (error){
        console.error(error.message);
        process.exit(1) 
    }
}