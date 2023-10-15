import type { CodegenConfig } from '@graphql-codegen/cli'

import { API_URL } from './consts/config'

const config: CodegenConfig = {
  overwrite: true,
  schema: `${API_URL}/graphql`,
  documents: 'services/**/*.ts',
  generates: {
    'gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
