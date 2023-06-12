"use client";

import { useEffect, useState } from "react";

export default function Json() {
	const [users, setUsers] = useState([]);

	// Effects
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((json) => setUsers(json));
	}, []);

	return (
		<section className="json-page">
			<h1 className="page-title text-2xl py-2 text-center">JSONPlaceholder</h1>

			<h2>Fake User List</h2>
			<ul className="border rounded-sm p-4 flex flex-col gap-4">
				<li className="border-b">User</li>


			</ul>
		</section>
	);
}
