const { NextResponse } = require("next/server");

export const middleware = async (request) => {
	const path = request.nextUrl.pathname;
	const isPublicPath =
		path === "/" || path === "/SignUp" || path === "/Login";
	const token = request.cookies.get("token")?.value || "";
	if (isPublicPath && token) {
		return NextResponse.redirect(new URL("/Dashboard", request.nextUrl));
	}
	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/Login", request.nextUrl));
	}
};

export const config = {
	matcher: ["/", "/Dashboard", "/Login", "/SignUp"],
};
