"use client";
import DashBoard from "./Dashboard/page";

export default function Home() {
	return (
		<main className={`w-screen h-[90vh] bg-["#f5f5f5"] flex flex-col`}>
			<DashBoard />
		</main>
	);
}
