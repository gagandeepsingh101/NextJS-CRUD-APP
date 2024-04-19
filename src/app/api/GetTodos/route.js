import { connectDB } from "@/backend/connection";
import { Todo } from "@/backend/models/Todo";
import { NextResponse } from "next/server";
connectDB();
export const GET = async (request) => {
	try {
		const todo = await Todo.find({});
		if (todo.length === 0) {
			return NextResponse.json({ success: false, message: "No Todo Found" });
		} else {
			return NextResponse.json({ success: true, message: "Todo", data: todo });
		}
	} catch (error) {
		return NextResponse.json({ success: false, message: error.message });
	}
};
