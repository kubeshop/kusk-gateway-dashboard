import {kuskApi} from './kuskApi';

export const enhancedApi = kuskApi.enhanceEndpoints({
  addTagTypes: ['API', 'SERVICE', 'FLEET', 'STATIC_ROUTE', 'NAMESPACE'],
  endpoints: {
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
      invalidatesTags: ['FLEET'],
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
  useGetNamespacesQuery,
} = enhancedApi;
