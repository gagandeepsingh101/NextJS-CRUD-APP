"use client";
import { loginUser, setAuthUser } from "@/redux/slices/authSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const dispatch = useDispatch();
	const handleSignUp = async (e) => {
		try {
			e.preventDefault();
			const res = await axios.post("/api/Login", {
				email,
				password,
			});
			const data = await res.data;
			if (data && data.success) {
				dispatch(loginUser());
				dispatch(setAuthUser(data.data));
				router.push("/Dashboard");
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex items-center justify-center h-[90vh]">
			<Toaster />{" "}
			<div className="w-full max-w-md">
				<form
					className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
					onSubmit={handleSignUp}>
					<div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
						Login Page
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-normal mb-2"
							htmlFor="username">
							Email
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							name="email"
							v-model="form.email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							required
							autoFocus
							placeholder="Email"
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-normal mb-2"
							htmlFor="password">
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							v-model="form.password"
							type="password"
							placeholder="Password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							autoComplete="current-password"
						/>
					</div>
					<div className="flex items-center justify-evenly">
						<button
							className="px-4 py-2 rounded text-white inline-block shadow-lg bg-purple-500 hover:bg-purple-600 focus:bg-purple-700"
							type="submit">
							Login
						</button>
						<Link
							className="text-purple-500 hover:text-purple-600"
							href={"/SignUp"}>
							SignUp
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;
