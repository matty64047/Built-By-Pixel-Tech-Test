import { Suspense } from "react";
import { TaskDetails, TaskSkeleton } from "@/components/task-details";

export default function Page() {
	return (
		<Suspense fallback={<TaskSkeleton />}>
			<TaskDetails />
		</Suspense>
	);
}
