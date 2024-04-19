"use client";
import { loginUser, setAuthUser } from "@/redux/slices/authSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
export default function DashBoard() {
	const [title, setTitle] = useState("");
	const [allTodos, setallTodo] = useState();
	const [editMode, setEditMode] = useState(false);
	const [editTodoId, setEditTodoId] = useState("");
	const postTodo = async () => {
		try {
			const res = await axios.post("/api/PostTodo", {
				title,
			});
			const data = await res.data;
			if (data && data.success) {
				setTitle("");
				getTodos();
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const getTodos = async () => {
		try {
			const res = await axios.get("/api/GetTodos");
			const { data, message } = await res.data;
			setallTodo(data);
		} catch (error) {
			console.log(error);
		}
	};
	const dispatch = useDispatch();
	const getUser = async () => {
		try {
			const res = await axios.get("/api/GetUser");
			const { success, userData, message } = await res.data;
			if (success) {
				dispatch(loginUser());
				dispatch(setAuthUser(userData));
			} else {
				toast.error(message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateTodo = async () => {
		try {
			const res = await axios.put("/api/UpdateTodo/" + editTodoId, { title });
			const data = await res.data;
			if (data && data.success) {
				getTodos();
				setEditTodoId("");
				setTitle("");
				setEditMode(false);

				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const deleteTodo = async (id) => {
		try {
			const res = await axios.delete("/api/DeleteTodo/" + id);
			const data = await res.data;
			if (data && data.success) {
				getTodos();
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getTodos();
		getUser();
	}, []);
	return (
		<main
			className={` w-screen h-[90vh] bg-transparent flex flex-col items-center gap-10"`}>
			<Toaster></Toaster>
			<div className="flex justify-center items-center gap-2">
				<input
					id="todo"
					className="w-[80vw]  px-3 py-2  my-10 mx-auto outline-none border-2 border-b-purple-500 text-purple-600 border-l-0 border-r-0 border-t-0 placeholder:text-purple-300"
					type="text"
					name="todo"
					placeholder="Enter Todo"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button
					onClick={() => {
						if (editMode) {
							updateTodo();
						} else {
							postTodo();
						}
					}}
					className="px-3 py-2 border-2 bg-purple-300 font-bold text-white ring-2 ring-purple-500 rounded-md hover:bg-purple-600 hover:ring-purple-300 ">
					{editMode ? "Update Todo" : "Add Todo"}
				</button>
			</div>
			<div className="w-5/6 flex flex-col gap-4 ">
				{allTodos?.map((todo) => (
					<div
						key={todo._id}
						className="flex justify-between items-center gap-4 border-2 bg-purple-200 px-3 py-2 ring-1 ring-purple-700 rounded-lg">
						<h3>{todo?.title}</h3>
						<div className="flex w-1/12 justify-evenly text-3xl">
							<MdModeEdit
								onClick={() => {
									setEditMode(true);
									setEditTodoId(todo._id);
									setTitle(todo.title);
								}}
								className="text-purple-400 hover:text-purple-700 cursor-pointer"
							/>
							<MdDelete
								onClick={() => deleteTodo(todo._id)}
								className="text-purple-400 hover:text-purple-700 cursor-pointer"
							/>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
