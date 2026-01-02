import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,

	schema: process.env.GRAPHQL_ENDPOINT,

	documents: "graphql/**/*.ts",

	generates: {
		"./graphql/generated.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-react-apollo",
			],
			config: {
				withHooks: false,
				withMutationFn: true,
				addDocBlocks: true,
				skipTypename: false,
			},
		},
	},
};

export default config;
