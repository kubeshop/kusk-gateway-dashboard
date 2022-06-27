import {BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {RootState} from '@redux/store';

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  WebApi,
  extraOptions
) => {
  const baseUrl = (WebApi.getState() as RootState).main.apiEndpoint;
  const rawBaseQuery = fetchBaseQuery({baseUrl});
  return rawBaseQuery(args, WebApi, extraOptions);
};

export const api = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
});
