import type {ConfigFile} from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'https://raw.githubusercontent.com/kubeshop/kusk-gateway/main/api/openapi.yaml',
  apiFile: './src/redux/services/api.ts',
  outputFile: './src/redux/services/kuskApi.ts',
  exportName: 'kuskApi',
  hooks: true,
};

export default config;
