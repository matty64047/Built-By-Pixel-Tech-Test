import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import fetch from "cross-fetch";
import { getAuthToken } from "@/actions/utils";

let apolloClient: ApolloClient | null = null;

export const getApolloClient = async (): Promise<ApolloClient> => {
	if (apolloClient) return apolloClient;

	const token = await getAuthToken();

	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
		fetch,
	});

	// Add auth token to headers
	const authLink = new ApolloLink((operation, forward) => {
		operation.setContext(({ headers = {} }) => ({
			headers: {
				...headers,
				Authorization: token ? token : "",
			},
		}));
		return forward(operation);
	});

	apolloClient = new ApolloClient({
		ssrMode: true,
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});

	return apolloClient;
};
