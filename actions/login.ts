"use server";

import { setAuthTokenCookie } from "@/actions/utils";
import { getApolloClient } from "@/graphql/client";
import {
	LoginDocument,
	type LoginMutation,
	type LoginMutationVariables,
} from "@/graphql/generated";

export async function loginAction(email: string, password: string) {
	const response = {
		success: true,
		error: undefined,
	};

	try {
		const client = await getApolloClient();

		const { data } = await client.mutate<LoginMutation, LoginMutationVariables>(
			{
				mutation: LoginDocument,
				variables: { email, password },
			},
		);

		const login = data?.login;
		if (!login || !login.user || !login.user.token)
			throw new Error("User does not exist");

		await setAuthTokenCookie(login.user.token);
	} catch (error: any) {
		// Return only the GraphQL error message
		const message =
			error?.graphQLErrors?.[0]?.message || error?.message || "Unknown error";
		response.success = false;
		response.error = message;
	}
	return response;
}
