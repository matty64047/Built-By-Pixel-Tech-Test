"use server";

import {
	GetUserDocument,
	type GetUserQuery,
	type GetUserQueryVariables,
} from "@/graphql/generated";
import { getApolloClient } from "@/lib/apollo/client";
import { getUserId } from "./utils";

export interface User {
	email?: string;
	first_name?: string;
	last_name?: string;
}

export async function getUser(): Promise<User> {
	const client = await getApolloClient();
	const userId = await getUserId();

	const { data } = await client.query<GetUserQuery, GetUserQueryVariables>({
		query: GetUserDocument,
		variables: {
			filter: {
				_id: userId,
			},
		},
	});

	return {
		email: data?.getUser?.email,
		first_name: data?.getUser?.first_name,
		last_name: data?.getUser?.last_name,
	};
}
