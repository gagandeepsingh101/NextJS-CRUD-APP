import { Todo } from "@/backend/models/Todo";
import { NextResponse } from "next/server";
import { connectDB } from "@/backend/connection";

connectDB();

export const POST = async (request) => {
	try {
		const { title } = await request.json();
        console.log(title)
		let todo = await Todo.create({ title });
		await todo.save();
		return NextResponse.json({
			success: true,
			message: "Todo create successfully",
		});
	} catch (error) {
		return NextResponse.json({ success: false, message: error.message });
	}
};
