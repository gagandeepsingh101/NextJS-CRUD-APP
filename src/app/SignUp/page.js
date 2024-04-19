"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const handleSignUp = async (e) => {
		try {
			e.preventDefault();
			const res = await axios.post("/api/SignUp", {
				username,
				email,
				password,
			});
			const data = await res?.data;

			if (data && data?.success) {
				toast.success(data?.message);
			} else {
				toast.error(data?.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex items-center justify-center h-[90vh]">
			<Toaster />
			<div className="w-full max-w-md">
				<form
					className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
					onSubmit={handleSignUp}>
					<div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
						Sign Up Page
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-normal mb-2"
							htmlFor="username">
							Username
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							name="username"
							v-model="form.username"
							value={username}
							onChange={(e) => setUserName(e.target.value)}
							type="text"
							required
							autoFocus
							placeholder="Username"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-normal mb-2"
							htmlFor="email">
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
							autocomplete="current-password"
						/>
					</div>
					<div className="flex items-center justify-evenly">
						<button
							className="px-4 py-2 rounded text-white inline-block shadow-lg bg-purple-500 hover:bg-purple-600 focus:bg-purple-700"
							type="submit">
							Sign Up
						</button>
						<Link
							className="text-purple-500 hover:text-purple-600"
							href={"/Login"}>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
