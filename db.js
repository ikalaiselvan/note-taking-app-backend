import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async ()=>{

    try {
        await mongoose.connect(process.env.mongodb_url);
        console.log("mongoDb connected ...");
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;