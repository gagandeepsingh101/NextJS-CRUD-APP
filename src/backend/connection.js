import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGODB_URI,{
			dbName:"CRUD-TODO"
		});
		if (connection.STATES.connected) {
			console.log("MongoDB COnnected");
		}
	} catch (error) {
		console.log(error);
	}
};
