"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getTask } from "@/actions/get-task";

export default function Page() {
	const searchParams = useSearchParams();
	const taskId = searchParams.get("task_id");

	const [task, setTask] = useState<any>(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!taskId) return;

		const fetchTask = async () => {
			try {
				const result = await getTask(taskId);
				setTask(result);
			} catch (err) {
				console.error(err);
				setError(true);
			}
		};

		fetchTask();
	}, [taskId]);

	if (error) return <div>Error loading task</div>;
	if (!task) return <div>Choose a task from the menu to view</div>;

	return (
		<div className="p-6 max-w-xl mx-auto rounded shadow space-y-4">
			<h1 className="text-2xl font-bold">{task.title}</h1>
			<p className="text-gray-200">{task.description}</p>

			<div className="flex gap-4 flex-wrap">
				<span
					className={`px-2 py-1 rounded text-white ${task.is_active ? "bg-green-500" : "bg-gray-400"}`}
				>
					{task.is_active ? "Active" : "Inactive"}
				</span>
				<span
					className={`px-2 py-1 rounded text-white ${task.is_suspended ? "bg-red-500" : "bg-blue-500"}`}
				>
					{task.is_suspended ? "Suspended" : task.type}
				</span>
				{task.is_remote && (
					<span className="px-2 py-1 rounded bg-indigo-500 text-white">
						Remote
					</span>
				)}
			</div>

			<div>
				<strong>Start Date:</strong>{" "}
				{new Date(task.start_date).toLocaleString()} <br />
				<strong>End Date:</strong> {new Date(task.end_date).toLocaleString()}{" "}
				<br />
				<strong>Time Left:</strong> {task.time_left}
			</div>

			<div>
				<strong>Payment Terms Accepted:</strong>
				<ul className="list-disc ml-6">
					{task.payment_terms_accepted.map((term: string) => (
						<li key={term}>{term}</li>
					))}
				</ul>
			</div>

			<div>
				<strong>Offers:</strong> {task.number_of_offers} |{" "}
				<strong>Likes:</strong> {task.number_of_likes}
			</div>
		</div>
	);
}
