export const readTodos = async () => {
	try {
		const response = await fetch("/api/todos/read", {
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (data.success) {
			return data ? data?.data : [];
		}
		return [];
	} catch (error) {
		console.log("Error reading todos: ", error);
		return [];
	}
};

export const createTodo = async (text: string) => {
	try {
		const res = await fetch("/api/todos/create", {
			method: "POST",
			body: JSON.stringify({ text }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		if (data.success) {
			await readTodos();
		}
		return data;
	} catch (error) {
		console.log("Error creating todo: ", error);
		return [];
	}
};

export const deleteTodo = async (id: string) => {
	try {
		const res = await fetch(`api/todos/delete?id=${id}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (data.success) {
			await readTodos();
		}
		return data;
	} catch (error) {
		console.log("Error deleting todo: ", error);
		return [];
	}
};
