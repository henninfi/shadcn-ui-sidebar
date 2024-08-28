import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input:
    'http://localhost:8000/openapi.json',
  output: {
    format: 'prettier',
    path: './src/client',
  },
  plugins: ['@tanstack/react-query'], 
  types: {
    dates: 'types+transform',
    enums: 'javascript',
  },
});