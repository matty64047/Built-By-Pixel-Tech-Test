"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTask } from "@/actions/get-tasks";

export function TaskSkeleton() {
	return (
		<div className="p-6 w-full rounded shadow space-y-4 animate-pulse">
			<div className="h-8 w-2/3 bg-gray-700 rounded" />
			<div className="space-y-2">
				<div className="h-4 w-full bg-gray-700 rounded" />
				<div className="h-4 w-5/6 bg-gray-700 rounded" />
			</div>
			<div className="flex gap-4">
				<div className="h-6 w-20 bg-gray-700 rounded" />
				<div className="h-6 w-24 bg-gray-700 rounded" />
				<div className="h-6 w-16 bg-gray-700 rounded" />
			</div>
			<div className="space-y-2">
				<div className="h-4 w-1/2 bg-gray-700 rounded" />
				<div className="h-4 w-1/3 bg-gray-700 rounded" />
				<div className="h-4 w-1/4 bg-gray-700 rounded" />
			</div>
			<div className="space-y-2">
				<div className="h-4 w-40 bg-gray-700 rounded" />
				<div className="h-4 w-32 bg-gray-700 rounded" />
				<div className="h-4 w-28 bg-gray-700 rounded" />
			</div>
			<div className="h-4 w-48 bg-gray-700 rounded" />
		</div>
	);
}

export function TaskDetails() {
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

	if (!task) return <TaskSkeleton />;

	return (
		<div className="p-6 w-full rounded shadow space-y-4 text-left">
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
