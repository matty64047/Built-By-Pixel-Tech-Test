"use server";

import {
	GetUserTaskListDocument,
	type GetUserTaskListQuery,
	type GetUserTaskListQueryResult,
	type GetUserTaskListQueryVariables,
	TaskListDocument,
	type TaskListQuery,
} from "@/graphql/generated";
import { getApolloClient } from "@/lib/apollo/client";
import { getUser, type User } from "./get-user";
import { getUserId } from "./utils";

export interface Tasks {
	user?: User;
	tasks: GetUserTaskListQueryResult;
}

export async function getTasksAction(): Promise<Tasks> {
	const client = await getApolloClient();
	const userId = await getUserId();

	if (userId) {
		const user = await getUser();

		const { data } = await client.query<
			GetUserTaskListQuery,
			GetUserTaskListQueryVariables
		>({
			query: GetUserTaskListDocument,
			variables: { userId },
		});

		return {
			user,
			tasks: data?.getUserTasks || [],
		};
	}

	const { data } = await client.query<TaskListQuery>({
		query: TaskListDocument,
	});

	return {
		tasks: data?.taskList || [],
	};
}
