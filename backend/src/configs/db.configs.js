import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URI);

        console.log("DB CONNECTED \nHOST:", connectionInstance.connection.host);

    } catch (error) {
        console.log("DB CONNECTION FAILED");
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;