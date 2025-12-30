import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

let apolloClient: ApolloClient | null = null;

export const getApolloClient = (): ApolloClient => {
	if (apolloClient) return apolloClient;

	apolloClient = new ApolloClient({
		ssrMode: true,
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
			fetch,
		}),
		cache: new InMemoryCache(),
	});

	return apolloClient;
};
