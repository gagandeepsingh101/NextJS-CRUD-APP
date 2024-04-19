import { connectDB } from "@/backend/connection";
import { User } from "@/backend/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connectDB();

export const GET = async (request) => {
	try {
		const token = request.cookies.get("token").value || "";
		if (!token) {
			return NextResponse.json({ success: false, message: "Not Authorized" });
		}
		const decoded = jwt.verify(token, process.env.JWT_TOKEN);
		const user = await User.findOne(decoded.email, "-password");
		if (!user) {
			return NextResponse.json({
				success: false,
				message: "User not found",
			});
		}
		return NextResponse.json({
			success: true,
			userData: {
				email: user.email,
				username: user.username,
			},
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: error.message,
		});
	}
};
