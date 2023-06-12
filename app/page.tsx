"use client";

import { useEffect, useState } from "react";

import { FiTrash } from "react-icons/fi";

// Services
import { createTodo, deleteTodo, readTodos } from "@/services/todoServices";

type Todo = {
	_id: string;
	text: string;
};

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [todoText, setTodoText] = useState("");

	// Actions
	const handleTodos = async () => {
		const data = await readTodos();
		setTodos(data);
	};

	const handleDelete = async (id: string) => {
		await deleteTodo(id);
		await handleTodos();
	};
 
	const handleCreate = async (e: any) => {
		e.preventDefault();
		if (!todoText) return;
		await createTodo(todoText);
		await handleTodos();
		setTodoText("");
	};

	// Get todos from server on first render
	useEffect(() => {
		const getTodos = async () => {
			await handleTodos();
		};
		getTodos();
	}, []);

	return (
		<div className="todo-page flex justify-center items-center h-full flex-col gap-2">
			<h1 className="text-4xl mb-2">Todo App</h1>

			<form
				onSubmit={handleCreate}
				className="flex gap-2 "
			>
				<input
					type="text"
					placeholder="Your todo..."
					className="border-0 px-2 py-1 bg-transparent outline-none border-b-2 border-gray-800"
					value={todoText}
					onChange={(e) => setTodoText(e.target.value)}
				/>
				<button className="border-2 px-3 rounded-sm hover:bg-gray-800 ease-in duration-75">
					Add
				</button>
			</form>
			<ul className="flex gap-2 flex-col w-[300px]">
				{todos?.map((todo) => (
					<li
						className="flex items-center gap-2 w-full"
						key={todo?._id}
					>
						<div className="todo-item border-2 p-2 flex items-center gap-2 border-gray-800 rounded-md cursor-pointer justify-between w-full">
							<span className="todo-text ">{todo?.text}</span>
							<div
								className="todo-delete cursor-pointer bg-gray-900 p-2 rounded-full flex justify-center items-center  hover:bg-gray-800 active:scale-95"
								onClick={() => {
									handleDelete(todo?._id);
								}}
							>
								<FiTrash color="#d00000" />
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
