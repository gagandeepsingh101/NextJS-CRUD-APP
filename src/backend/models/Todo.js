import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
    author:{
        type:String
    }
});

mongoose.models={}
export const Todo=mongoose.model("Todo",TodoSchema)
