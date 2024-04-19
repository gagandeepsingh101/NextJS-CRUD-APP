import { NextResponse } from "next/server";

export const GET = async (request) => {
	try {
		let res = NextResponse.json({
			success: true,
			message: "Logout SuccessFully",
		});
		res.cookies.set("token", "", {
			expires: new Date(0),
			httpOnly: true,
		});
		return res;
	} catch (error) {
		NextResponse.json({ succcess: false, message: error.message });
	}
};
