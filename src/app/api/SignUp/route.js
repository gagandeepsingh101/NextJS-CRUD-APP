import { connectDB } from "@/backend/connection";
import { User } from "@/backend/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
connectDB();

export const POST = async (request) => {
	try {
		const { username, email, password } = await request.json();
		const hasUser = await User.findOne({ email });
		if (hasUser) {
			return NextResponse.json({
				success: false,
				message: "User already present with this email ! Please Login",
			});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
            username,
			email,
			password: hashedPassword,
		});
		newUser.save();
		return NextResponse.json({
			success: true,
			message: "User create successfully",
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: error.message,
		});
	}
};
