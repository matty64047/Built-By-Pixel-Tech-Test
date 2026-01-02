"use server";

import { getApolloClient } from "@/graphql/client";
import {
	CreateUserDocument,
	type CreateUserMutation,
	type CreateUserMutationVariables,
} from "@/graphql/generated";

export default async function signUpAction(
	first_name: string,
	last_name: string,
	email: string,
	password: string,
	username: string,
) {
	const response = {
		success: true,
		error: undefined,
	};
	const client = await getApolloClient();

	try {
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

		if (!data?.createUser) {
			return { error: "User creation failed" };
		}

		return {
			token: data.createUser.token,
			tokenExpiry: data.createUser.tokenExpiry,
		};
	} catch (error: any) {
		// Return only the GraphQL error message
		const message =
			error?.graphQLErrors?.[0]?.message || error?.message || "Unknown error";
		response.success = false;
		response.error = message;
	}

	return response;
}
