import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Enable overwrite via environment variable
  overwrite: true,

  // Schema can be a URL or a local file
  schema: ${NEXT_PUBLIC_GRAPHQL_ENDPOINT}, // or './schema.graphql'

  // Where your queries/mutations/subscriptions are located
  documents: 'graphql/**/*.ts',

  // Output configuration
  generates: {
    './graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: false,
      },
    },
  },
};

export default config;