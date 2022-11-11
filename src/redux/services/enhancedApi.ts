import {kuskApi} from './kuskApi';

export const enhancedApi = kuskApi.enhanceEndpoints({
  addTagTypes: ['API', 'SERVICE', 'FLEET', 'STATIC_ROUTE', 'NAMESPACE', 'LOGS'],
  endpoints: {
    getEnvoyFleetLogs: {
      query: undefined,
      queryFn: () => {
        return {data: []};
      },
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState, dispatch}) {
        const connect = async () => {
          const logsUrl = 'ws://139.178.84.155/api/logs'; // `${(getState() as RootState).main.apiEndpoint.replace('http', 'ws')}/logs`;
          const ws = new WebSocket(logsUrl);
          const listener = async (event: MessageEvent) => {
            event.preventDefault();
            event.stopPropagation();

            updateCachedData(draft => {
              draft.push(event.data);
            });
          };

          try {
            await cacheDataLoaded;
            ws.addEventListener('message', listener, {passive: true});
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log('error', e);
          }
          await cacheEntryRemoved;
          ws.removeEventListener('message', listener);
          ws?.close();
        };

        connect();
      },
    },
    getApis: {
      providesTags: ['API'],
    },
    getApi: {
      providesTags: ['API'],
    },
    updateApi: {
      invalidatesTags: ['API'],
    },
    getApiCrd: {
      providesTags: ['API'],
    },
    getApiDefinition: {
      providesTags: ['API'],
    },
    deleteApi: {
      invalidatesTags: ['API'],
    },
    deployApi: {
      invalidatesTags: ['API'],
    },
    getServices: {
      providesTags: ['SERVICE'],
    },
    getService: {
      providesTags: ['SERVICE'],
    },
    getEnvoyFleets: {
      providesTags: ['FLEET'],
    },
    createFleet: {
      invalidatesTags: ['FLEET', 'SERVICE'],
    },
    deleteFleet: {
      invalidatesTags: ['FLEET'],
    },
    getEnvoyFleet: {
      providesTags: ['FLEET'],
    },
    getEnvoyFleetCrd: {
      providesTags: ['FLEET'],
    },
    getStaticRoutes: {
      providesTags: ['STATIC_ROUTE'],
    },
    createStaticRoute: {
      invalidatesTags: ['STATIC_ROUTE'],
    },
    deleteStaticRoute: {
      invalidatesTags: ['STATIC_ROUTE'],
    },
    getStaticRoute: {
      providesTags: ['STATIC_ROUTE'],
    },
    getStaticRouteCrd: {
      providesTags: ['STATIC_ROUTE'],
    },
    updateStaticRoute: {
      invalidatesTags: ['STATIC_ROUTE'],
    },
    getNamespaces: {
      providesTags: ['NAMESPACE'],
    },
  },
});

export const {
  useGetApisQuery,
  useDeployApiMutation,
  useGetApiQuery,
  useDeleteApiMutation,
  useGetApiCrdQuery,
  useGetApiDefinitionQuery,
  useGetServicesQuery,
  useGetServiceQuery,
  useGetEnvoyFleetsQuery,
  useCreateFleetMutation,
  useGetEnvoyFleetQuery,
  useDeleteFleetMutation,
  useGetEnvoyFleetCrdQuery,
  useGetStaticRoutesQuery,
  useCreateStaticRouteMutation,
  useGetStaticRouteQuery,
  useDeleteStaticRouteMutation,
  useGetStaticRouteCrdQuery,
  useUpdateStaticRouteMutation,
  useGetNamespacesQuery,
  useGetEnvoyFleetLogsQuery,
} = enhancedApi;
