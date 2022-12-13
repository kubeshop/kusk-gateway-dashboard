import {api} from './api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getApis: build.query<GetApisApiResponse, GetApisApiArg>({
      query: queryArg => ({
        url: `/apis`,
        params: {
          fleetname: queryArg.fleetname,
          fleetnamespace: queryArg.fleetnamespace,
          namespace: queryArg['namespace'],
        },
      }),
    }),
    deployApi: build.mutation<DeployApiApiResponse, DeployApiApiArg>({
      query: queryArg => ({url: `/apis`, method: 'POST', body: queryArg.body}),
    }),
    getApi: build.query<GetApiApiResponse, GetApiApiArg>({
      query: queryArg => ({url: `/apis/${queryArg['namespace']}/${queryArg.name}`}),
    }),
    updateApi: build.mutation<UpdateApiApiResponse, UpdateApiApiArg>({
      query: queryArg => ({url: `/apis/${queryArg['namespace']}/${queryArg.name}`, method: 'PUT', body: queryArg.body}),
    }),
    deleteApi: build.mutation<DeleteApiApiResponse, DeleteApiApiArg>({
      query: queryArg => ({url: `/apis/${queryArg['namespace']}/${queryArg.name}`, method: 'DELETE'}),
    }),
    getApiCrd: build.query<GetApiCrdApiResponse, GetApiCrdApiArg>({
      query: queryArg => ({url: `/apis/${queryArg['namespace']}/${queryArg.name}/crd`}),
    }),
    getApiDefinition: build.query<GetApiDefinitionApiResponse, GetApiDefinitionApiArg>({
      query: queryArg => ({url: `/apis/${queryArg['namespace']}/${queryArg.name}/definition`}),
    }),
    getServices: build.query<GetServicesApiResponse, GetServicesApiArg>({
      query: queryArg => ({url: `/services`, params: {namespace: queryArg['namespace']}}),
    }),
    getService: build.query<GetServiceApiResponse, GetServiceApiArg>({
      query: queryArg => ({url: `/services/${queryArg['namespace']}/${queryArg.name}`}),
    }),
    getEnvoyFleets: build.query<GetEnvoyFleetsApiResponse, GetEnvoyFleetsApiArg>({
      query: queryArg => ({url: `/fleets`, params: {namespace: queryArg['namespace']}}),
    }),
    createFleet: build.mutation<CreateFleetApiResponse, CreateFleetApiArg>({
      query: queryArg => ({url: `/fleets`, method: 'POST', body: queryArg.serviceItem}),
    }),
    getEnvoyFleet: build.query<GetEnvoyFleetApiResponse, GetEnvoyFleetApiArg>({
      query: queryArg => ({url: `/fleets/${queryArg['namespace']}/${queryArg.name}`}),
    }),
    deleteFleet: build.mutation<DeleteFleetApiResponse, DeleteFleetApiArg>({
      query: queryArg => ({url: `/fleets/${queryArg['namespace']}/${queryArg.name}`, method: 'DELETE'}),
    }),
    getEnvoyFleetCrd: build.query<GetEnvoyFleetCrdApiResponse, GetEnvoyFleetCrdApiArg>({
      query: queryArg => ({url: `/fleets/${queryArg['namespace']}/${queryArg.name}/crd`}),
    }),
    getEnvoyFleetLogs: build.query<GetEnvoyFleetLogsApiResponse, GetEnvoyFleetLogsApiArg>({
      query: queryArg => ({url: `/logs`, params: {namespace: queryArg['namespace'], name: queryArg.name}}),
    }),
    getStaticRoutes: build.query<GetStaticRoutesApiResponse, GetStaticRoutesApiArg>({
      query: queryArg => ({url: `/staticroutes`, params: {namespace: queryArg['namespace']}}),
    }),
    createStaticRoute: build.mutation<CreateStaticRouteApiResponse, CreateStaticRouteApiArg>({
      query: queryArg => ({url: `/staticroutes`, method: 'POST', body: queryArg.body}),
    }),
    getStaticRoute: build.query<GetStaticRouteApiResponse, GetStaticRouteApiArg>({
      query: queryArg => ({url: `/staticroutes/${queryArg['namespace']}/${queryArg.name}`}),
    }),
    updateStaticRoute: build.mutation<UpdateStaticRouteApiResponse, UpdateStaticRouteApiArg>({
      query: queryArg => ({
        url: `/staticroutes/${queryArg['namespace']}/${queryArg.name}`,
        method: 'PUT',
        body: queryArg.body,
      }),
    }),
    deleteStaticRoute: build.mutation<DeleteStaticRouteApiResponse, DeleteStaticRouteApiArg>({
      query: queryArg => ({url: `/staticroutes/${queryArg['namespace']}/${queryArg.name}`, method: 'DELETE'}),
    }),
    getStaticRouteCrd: build.query<GetStaticRouteCrdApiResponse, GetStaticRouteCrdApiArg>({
      query: queryArg => ({url: `/staticroutes/${queryArg['namespace']}/${queryArg.name}/crd`}),
    }),
    getNamespaces: build.query<GetNamespacesApiResponse, GetNamespacesApiArg>({
      query: () => ({url: `/namespaces`}),
    }),
  }),
  overrideExisting: false,
});
export {injectedRtkApi as kuskApi};
export type GetApisApiResponse = /** status 200 a list of apis */ ApiItem[];
export type GetApisApiArg = {
  /** optional filter on fleet */
  fleetname?: string;
  /** optional filter on fleet */
  fleetnamespace?: string;
  /** optional filter on namespace */
  namespace?: string;
};
export type DeployApiApiResponse = /** status 201 API deployed */ undefined;
export type DeployApiApiArg = {
  /** API content that needs to be deployed */
  body: {
    name?: string;
    namespace?: string;
    envoyFleetName?: string;
    envoyFleetNamespace?: string;
    openapi?: string;
  };
};
export type GetApiApiResponse = /** status 200 API item */ ApiItem;
export type GetApiApiArg = {
  namespace: string;
  name: string;
};
export type UpdateApiApiResponse = /** status 201 API deployed */ undefined;
export type UpdateApiApiArg = {
  namespace: string;
  name: string;
  /** API content that needs to be updated */
  body: {
    name?: string;
    namespace?: string;
    envoyFleetName?: string;
    envoyFleetNamespace?: string;
    openapi?: string;
  };
};
export type DeleteApiApiResponse = unknown;
export type DeleteApiApiArg = {
  namespace: string;
  name: string;
};
export type GetApiCrdApiResponse = /** status 200 returns the CRD of the API ( Raw Api Spec ) */ object;
export type GetApiCrdApiArg = {
  namespace: string;
  name: string;
};
export type GetApiDefinitionApiResponse = /** status 200 API definition item */ object;
export type GetApiDefinitionApiArg = {
  namespace: string;
  name: string;
};
export type GetServicesApiResponse = /** status 200 list of services */ ServiceItem[];
export type GetServicesApiArg = {
  /** optional filter on namespace */
  namespace?: string;
};
export type GetServiceApiResponse = /** status 200 service details */ ServiceItem;
export type GetServiceApiArg = {
  namespace: string;
  name: string;
};
export type GetEnvoyFleetsApiResponse = /** status 200 list of envoy fleets */ EnvoyFleetItem[];
export type GetEnvoyFleetsApiArg = {
  /** optional filter on namespace */
  namespace?: string;
};
export type CreateFleetApiResponse = /** status 200 created fleet */ EnvoyFleetItem;
export type CreateFleetApiArg = {
  /** create fleet content */
  serviceItem: ServiceItem;
};
export type GetEnvoyFleetApiResponse = /** status 200 envoy fleet details */ EnvoyFleetItem;
export type GetEnvoyFleetApiArg = {
  /** the namespace of the fleet */
  namespace: string;
  /** the name of the fleet */
  name: string;
};
export type DeleteFleetApiResponse = unknown;
export type DeleteFleetApiArg = {
  namespace: string;
  name: string;
};
export type GetEnvoyFleetCrdApiResponse = /** status 200 Envoy fleet CRD */ object;
export type GetEnvoyFleetCrdApiArg = {
  namespace: string;
  name: string;
};
export type GetEnvoyFleetLogsApiResponse = /** status 200 Envoy fleet logs */ Array<string>;
export type GetEnvoyFleetLogsApiArg = {
  namespace: string;
  name: string;
};
export type GetStaticRoutesApiResponse = /** status 200 list of static routes */ StaticRouteItem[];
export type GetStaticRoutesApiArg = {
  /** optional filter on namespace */
  namespace?: string;
};
export type CreateStaticRouteApiResponse = /** status 200 created static route */ StaticRouteItem;
export type CreateStaticRouteApiArg = {
  /** static route content */
  body: {
    name?: string;
    namespace?: string;
    envoyFleetName?: string;
    envoyFleetNamespace?: string;
    openapi?: string;
  };
};
export type GetStaticRouteApiResponse = /** status 200 get static route details */ StaticRouteItem;
export type GetStaticRouteApiArg = {
  /** the namespace of the static route */
  namespace: string;
  /** the name of the static route */
  name: string;
};
export type UpdateStaticRouteApiResponse = /** status 201 static route updated */ StaticRouteItem;
export type UpdateStaticRouteApiArg = {
  namespace: string;
  name: string;
  /** static route content */
  body: {
    name?: string;
    namespace?: string;
    envoyFleetName?: string;
    envoyFleetNamespace?: string;
    openapi?: string;
  };
};
export type DeleteStaticRouteApiResponse = unknown;
export type DeleteStaticRouteApiArg = {
  namespace: string;
  name: string;
};
export type GetStaticRouteCrdApiResponse = /** status 200 Static route CRD */ object;
export type GetStaticRouteCrdApiArg = {
  namespace: string;
  name: string;
};
export type GetNamespacesApiResponse = /** status 200 list of namespaces */ NamespaceItem[];
export type GetNamespacesApiArg = void;
export type ApiItemFleet = {
  name: string;
  namespace: string;
};
export type ApiItemService = {
  name: string;
  namespace: string;
};
export type ApiItem = {
  name: string;
  namespace: string;
  fleet: ApiItemFleet;
  service: ApiItemService;
  version: string;
  crunch42url?: string;
};
export type ServicePortItem = {
  name: string;
  nodePort?: number;
  port: number;
  protocol?: string;
  targetPort: string;
};
export type ServiceItem = {
  name: string;
  status?: 'available' | 'unavailable';
  namespace: string;
  serviceType: 'ClusterIP' | 'LoadBalancer';
  ports: ServicePortItem[];
};
export type StaticRouteItemFleet = {
  name: string;
  namespace: string;
};
export type EnvoyFleetItem = {
  name: string;
  namespace: string;
  apis?: ApiItemFleet[];
  services?: ServiceItem[];
  staticRoutes?: StaticRouteItemFleet[];
};
export type StaticRouteItem = {
  name: string;
  namespace: string;
  envoyFleetName?: string;
  envoyFleetNamespace?: string;
};
export type NamespaceItem = {
  name?: string;
};
export const {
  useGetApisQuery,
  useDeployApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
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
  useGetEnvoyFleetLogsQuery,
  useGetStaticRoutesQuery,
  useCreateStaticRouteMutation,
  useGetStaticRouteQuery,
  useUpdateStaticRouteMutation,
  useDeleteStaticRouteMutation,
  useGetStaticRouteCrdQuery,
  useGetNamespacesQuery,
} = injectedRtkApi;
