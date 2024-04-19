"use client";
import { logOutUser, setAuthUser } from "@/redux/slices/authSlice";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
	const dispatch = useDispatch();
	const logout = async () => {
		try {
			const res = await axios.get("/api/LogOut");
			const data = await res.data;
			if (data.success) {
				dispatch(logOutUser());
				dispatch(setAuthUser({}));
				toast.success(data.message);
				document.location.reload();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const { isAuth } = useSelector((state) => state.auth);
	return (
		<div className=" w-full h-[10vh] flex justify-between items-center shadow-md shadow-purple-400 px-4">
			<h3 className="font-bold text-xl">NextJS-CRUD-TODO-APP</h3>
			<div className=" flex justify-between gap-4 text-xl font-bold text-purple-400">
				{isAuth && (
					<Link className="hover:text-purple-600" href={"/Dashboard"}>
						Dashboard
					</Link>
				)}
				{!isAuth ? (
					<Link className="hover:text-purple-600" href={"/Login"}>
						Login
					</Link>
				) : (
					<span onClick={logout} className="hover:text-purple-600">
						Logout
					</span>
				)}
			</div>
		</div>
	);
};

export default Navbar;
