import { connectDB } from "@/backend/connection";
import { Todo } from "@/backend/models/Todo";
import { NextResponse } from "next/server";
connectDB();
export const DELETE = async (request, { params }) => {
	try {
		const id = params.id;
		const todo = await Todo.findByIdAndDelete(id);
		console.log(todo);
		if (todo) {
			return NextResponse.json({
				success: true,
				message: "Todo delete successfully",
			});
		} else {
			return NextResponse.json({ success: false, message: "No Todo Found" });
		}
	} catch (error) {
		return NextResponse.json({ success: false, message: error.message });
	}
};
