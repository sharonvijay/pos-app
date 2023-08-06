import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.CONNECTION_URL);
		console.log(`MongoDB Connected ${mongoose.connection.host}`);
	} catch (error) {
		console.log(`Error : ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
