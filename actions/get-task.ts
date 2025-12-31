"use server";

import {
	TaskGetDocument,
	type TaskGetQuery,
	type TaskGetQueryVariables,
} from "@/graphql/generated";
import { getApolloClient } from "@/lib/apollo/client";

export async function getTask(taskId: string) {
	const client = await getApolloClient();

	const { data } = await client.query<TaskGetQuery, TaskGetQueryVariables>({
		query: TaskGetDocument,
		variables: {
			filter: {
				_id: taskId,
			},
		},
	});

	return data?.taskGet;
}
