import { connectDB } from "@/backend/connection";
import { User } from "@/backend/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
connectDB();

export const POST = async (request) => {
	try {
		const { email, password } = await request.json();
		console.log(email);
		let user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json({
				success: false,
				message: " User not found ! Please SignUp",
			});
		}
		const isMatchPassword = bcrypt.compare(password, user.password);
		if (!isMatchPassword) {
			return NextResponse.json({
				success: false,
				message: " Invalid Password ! Please check it ",
			});
		}
		const token = jwt.sign(email, process.env.JWT_TOKEN);
		let response = NextResponse.json({
			success: true,
			message: "User Login successfully",
			data:{
				username:user.username,
				email:user.email
			}
		});
		response.cookies.set("token", token, {
			httpOnly: true,
			path: "/",
		});
		return response;
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: error.message,
		});
	}
};
