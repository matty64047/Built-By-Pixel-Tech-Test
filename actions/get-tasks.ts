"use server";

import { getApolloClient } from "@/graphql/client";
import {
	GetUserTaskListDocument,
	type GetUserTaskListQuery,
	type GetUserTaskListQueryResult,
	type GetUserTaskListQueryVariables,
	TaskGetDocument,
	type TaskGetQuery,
	type TaskGetQueryVariables,
	TaskListDocument,
	type TaskListQuery,
	type TaskListQueryResult,
} from "@/graphql/generated";
import { getUser, type User } from "./get-user";
import { getUserId } from "./utils";

export interface Tasks {
	user?: User;
	tasks: TaskListQueryResult;
	userTasks?: GetUserTaskListQueryResult;
}

export async function getTasksAction(): Promise<Tasks> {
	const client = await getApolloClient();
	const userId = await getUserId();

	const { data } = await client.query<TaskListQuery>({
		query: TaskListDocument,
	});

	const response: Tasks = {
		tasks: data?.taskList || [],
	};

	if (userId) {
		try {
			const user = await getUser();

			const { data } = await client.query<
				GetUserTaskListQuery,
				GetUserTaskListQueryVariables
			>({
				query: GetUserTaskListDocument,
				variables: { userId },
			});

			response.user = user;
			response.userTasks = data?.getUserTasks || [];
		} catch {}
	}

	return response;
}

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
