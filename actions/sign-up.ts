"use server";

import { getApolloClient } from "@/graphql/client";
import {
	CreateUserDocument,
	CreateUserMutation,
	CreateUserMutationVariables,
} from "@/graphql/generated";

export default async function signUpAction(
	first_name: string,
	last_name: string,
	email: string,
	password: string,
	username: string,
) {
	const client = await getApolloClient();
	const { data } = await client.mutate<
		CreateUserMutation,
		CreateUserMutationVariables
	>({
		mutation: CreateUserDocument,
		variables: {
			record: {
				email,
				first_name,
				last_name,
				password,
				username,
				is_email_verified: true,
			},
		},
	});
	return {
		token: data?.createUser?.token,
		tokenExpiry: data?.createUser?.tokenExpiry,
	};
}
