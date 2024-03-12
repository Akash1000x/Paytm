import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`,{dbName:"paytm"});
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
    } catch (err) {
        console.error("MongoDb connection failed ",err);
        throw err;
    }
}


export default connectDB;