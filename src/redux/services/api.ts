import {BaseQueryFn, FetchArgs, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {RootState} from '@redux/store';

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, {message: string}> = async (
  args,
  WebApi,
  extraOptions
) => {
  const baseUrl = (WebApi.getState() as RootState).main.apiEndpoint;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  });
  const result = await rawBaseQuery(args, WebApi, extraOptions);
  if (result.error) {
    return {...result, error: {message: result.error.data as string}};
  }
  return result;
};

export const api = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
});
