"use server";

import { setAuthTokenCookie } from "@/actions/utils";
import {
	LoginDocument,
	type LoginMutation,
	type LoginMutationVariables,
} from "@/graphql/generated";
import { getApolloClient } from "@/lib/apollo/client";

interface LoginResult {
	token: string;
	tokenExpiry: string;
}

export async function loginAction(
	email: string,
	password: string,
): Promise<LoginResult | null> {
	const client = getApolloClient();

	const { data } = await client.mutate<LoginMutation, LoginMutationVariables>({
		mutation: LoginDocument,
		variables: { email, password },
	});

	// Make sure login and user exist
	const login = data?.login;
	if (!login || !login.user || !login.user.token)
		throw new Error("User does not exist");

	await setAuthTokenCookie(login.user.token, login.user.tokenExpiry);

	return {
		token: login.user.token,
		tokenExpiry: login.user.tokenExpiry,
	};
}
