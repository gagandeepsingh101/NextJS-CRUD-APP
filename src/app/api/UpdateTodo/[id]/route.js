import { connectDB } from "@/backend/connection";
import { Todo } from "@/backend/models/Todo";
import { NextResponse } from "next/server";
connectDB();
export const PUT = async (request, { params }) => {
	try {
		const id = params.id;
		const {title} = await request.json();
		console.log(title)
		const todo = await Todo.findByIdAndUpdate(id,{title});
		if (todo) {
			return NextResponse.json({
				success: true,
				message: "Todo Update successfully",
			});
		} else {
			return NextResponse.json({ success: false, message: "No Todo Found" });
		}
	} catch (error) {
		return NextResponse.json({ success: false, message: error.message });
	}
};
