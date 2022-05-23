/* Generated by restful-react */
import {Get, GetProps, Mutate, MutateProps, UseGetProps, UseMutateProps, useGet, useMutate} from 'restful-react';

export const SPEC_VERSION = '1.0.0';
export interface ApiItem {
  name: string;
  namespace: string;
  fleet: ApiItemFleet;
  service: ApiItemService;
  version: string;
}

export interface ServiceItem {
  name: string;
  status: 'available' | 'unavailable';
  namespace: string;
  ports: ServicePortItem[];
}

export interface EnvoyFleetItem {
  name: string;
  namespace: string;
  apis?: ApiItemFleet[];
  services?: ServiceItem[];
  staticRoutes?: StaticRouteItemFleet[];
}

export interface StaticRouteItem {
  name: string;
  namespace: string;
  envoyFleetName?: string;
  envoyFleetNamespace?: string;
}

export interface ApiItemFleet {
  name: string;
  namespace: string;
}

export interface ServicePortItem {
  name: string;
  nodePort: number;
  port: number;
  protocol: string;
  targetPort: string;
}

export interface StaticRouteItemFleet {
  name: string;
  namespace: string;
}

export interface ApiItemService {
  name: string;
  namespace: string;
}

export interface NamespaceItem {
  name?: string;
}

export interface GetApisQueryParams {
  /**
   * optional filter on fleet
   */
  fleetname?: string;
  /**
   * optional filter on fleet
   */
  fleetnamespace?: string;
  /**
   * optional filter on namespace
   */
  namespace?: string;
}

export type GetApisProps = Omit<GetProps<ApiItem[], unknown, GetApisQueryParams, void>, 'path'>;

/**
 * Get a list of APIs
 *
 * Returns the list of APIs available in the cluster
 */
export const GetApis = (props: GetApisProps) => (
  <Get<ApiItem[], unknown, GetApisQueryParams, void> path="/apis" {...props} />
);

export type UseGetApisProps = Omit<UseGetProps<ApiItem[], unknown, GetApisQueryParams, void>, 'path'>;

/**
 * Get a list of APIs
 *
 * Returns the list of APIs available in the cluster
 */
export const useGetApis = (props: UseGetApisProps) =>
  useGet<ApiItem[], unknown, GetApisQueryParams, void>(`/apis`, props);

export interface DeployApiRequestBody {
  name?: string;
  namespace?: string;
  envoyFleetName?: string;
  envoyFleetNamespace?: string;
  openapi?: string;
}

export type DeployApiProps = Omit<MutateProps<void, string, void, DeployApiRequestBody, void>, 'path' | 'verb'>;

/**
 * Deploy new API
 *
 * Deploys a new API to the cluster
 */
export const DeployApi = (props: DeployApiProps) => (
  <Mutate<void, string, void, DeployApiRequestBody, void> verb="POST" path="/apis" {...props} />
);

export type UseDeployApiProps = Omit<UseMutateProps<void, string, void, DeployApiRequestBody, void>, 'path' | 'verb'>;

/**
 * Deploy new API
 *
 * Deploys a new API to the cluster
 */
export const useDeployApi = (props: UseDeployApiProps) =>
  useMutate<void, string, void, DeployApiRequestBody, void>('POST', `/apis`, props);

export interface GetApiPathParams {
  namespace: string;
  name: string;
}

export type GetApiProps = Omit<GetProps<ApiItem, void, void, GetApiPathParams>, 'path'> & GetApiPathParams;

/**
 * Get an API instance by namespace and name
 */
export const GetApi = ({namespace, name, ...props}: GetApiProps) => (
  <Get<ApiItem, void, void, GetApiPathParams> path={`/apis/${namespace}/${name}`} {...props} />
);

export type UseGetApiProps = Omit<UseGetProps<ApiItem, void, void, GetApiPathParams>, 'path'> & GetApiPathParams;

/**
 * Get an API instance by namespace and name
 */
export const useGetApi = ({namespace, name, ...props}: UseGetApiProps) =>
  useGet<ApiItem, void, void, GetApiPathParams>(
    (paramsInPath: GetApiPathParams) => `/apis/${paramsInPath.namespace}/${paramsInPath.name}`,
    {pathParams: {namespace, name}, ...props}
  );

export interface GetApiCRDResponse {
  [key: string]: any;
}

export interface GetApiCRDPathParams {
  namespace: string;
  name: string;
}

export type GetApiCRDProps = Omit<GetProps<GetApiCRDResponse, void, void, GetApiCRDPathParams>, 'path'> &
  GetApiCRDPathParams;

/**
 * Get API CRD from cluster
 */
export const GetApiCRD = ({namespace, name, ...props}: GetApiCRDProps) => (
  <Get<GetApiCRDResponse, void, void, GetApiCRDPathParams> path={`/apis/${namespace}/${name}/crd`} {...props} />
);

export type UseGetApiCRDProps = Omit<UseGetProps<GetApiCRDResponse, void, void, GetApiCRDPathParams>, 'path'> &
  GetApiCRDPathParams;

/**
 * Get API CRD from cluster
 */
export const useGetApiCRD = ({namespace, name, ...props}: UseGetApiCRDProps) =>
  useGet<GetApiCRDResponse, void, void, GetApiCRDPathParams>(
    (paramsInPath: GetApiCRDPathParams) => `/apis/${paramsInPath.namespace}/${paramsInPath.name}/crd`,
    {pathParams: {namespace, name}, ...props}
  );

export interface GetApiDefinitionResponse {
  [key: string]: any;
}

export interface GetApiDefinitionPathParams {
  namespace: string;
  name: string;
}

export type GetApiDefinitionProps = Omit<
  GetProps<GetApiDefinitionResponse, void, void, GetApiDefinitionPathParams>,
  'path'
> &
  GetApiDefinitionPathParams;

/**
 * Get API definition ( Post-Processed version )
 */
export const GetApiDefinition = ({namespace, name, ...props}: GetApiDefinitionProps) => (
  <Get<GetApiDefinitionResponse, void, void, GetApiDefinitionPathParams>
    path={`/apis/${namespace}/${name}/definition`}
    {...props}
  />
);

export type UseGetApiDefinitionProps = Omit<
  UseGetProps<GetApiDefinitionResponse, void, void, GetApiDefinitionPathParams>,
  'path'
> &
  GetApiDefinitionPathParams;

/**
 * Get API definition ( Post-Processed version )
 */
export const useGetApiDefinition = ({namespace, name, ...props}: UseGetApiDefinitionProps) =>
  useGet<GetApiDefinitionResponse, void, void, GetApiDefinitionPathParams>(
    (paramsInPath: GetApiDefinitionPathParams) => `/apis/${paramsInPath.namespace}/${paramsInPath.name}/definition`,
    {pathParams: {namespace, name}, ...props}
  );

export interface GetServicesQueryParams {
  /**
   * optional filter on namespace
   */
  namespace?: string;
}

export type GetServicesProps = Omit<GetProps<ServiceItem[], unknown, GetServicesQueryParams, void>, 'path'>;

/**
 * Get a list of services handled by kusk-gateway
 *
 * Returns the list of services available in the cluster that are related to kusk-gateway
 */
export const GetServices = (props: GetServicesProps) => (
  <Get<ServiceItem[], unknown, GetServicesQueryParams, void> path="/services" {...props} />
);

export type UseGetServicesProps = Omit<UseGetProps<ServiceItem[], unknown, GetServicesQueryParams, void>, 'path'>;

/**
 * Get a list of services handled by kusk-gateway
 *
 * Returns the list of services available in the cluster that are related to kusk-gateway
 */
export const useGetServices = (props: UseGetServicesProps) =>
  useGet<ServiceItem[], unknown, GetServicesQueryParams, void>(`/services`, props);

export interface GetServicePathParams {
  namespace: string;
  name: string;
}

export type GetServiceProps = Omit<GetProps<ServiceItem, void, void, GetServicePathParams>, 'path'> &
  GetServicePathParams;

/**
 * Get details for a single service
 *
 * Returns an object containing info about the service corresponding to the namespace and name
 */
export const GetService = ({namespace, name, ...props}: GetServiceProps) => (
  <Get<ServiceItem, void, void, GetServicePathParams> path={`/services/${namespace}/${name}`} {...props} />
);

export type UseGetServiceProps = Omit<UseGetProps<ServiceItem, void, void, GetServicePathParams>, 'path'> &
  GetServicePathParams;

/**
 * Get details for a single service
 *
 * Returns an object containing info about the service corresponding to the namespace and name
 */
export const useGetService = ({namespace, name, ...props}: UseGetServiceProps) =>
  useGet<ServiceItem, void, void, GetServicePathParams>(
    (paramsInPath: GetServicePathParams) => `/services/${paramsInPath.namespace}/${paramsInPath.name}`,
    {pathParams: {namespace, name}, ...props}
  );

export interface GetEnvoyFleetsQueryParams {
  /**
   * optional filter on namespace
   */
  namespace?: string;
}

export type GetEnvoyFleetsProps = Omit<GetProps<EnvoyFleetItem[], unknown, GetEnvoyFleetsQueryParams, void>, 'path'>;

/**
 * Get a list of envoy fleets
 *
 * Returns a list of envoy fleets that are available in the cluster
 */
export const GetEnvoyFleets = (props: GetEnvoyFleetsProps) => (
  <Get<EnvoyFleetItem[], unknown, GetEnvoyFleetsQueryParams, void> path="/fleets" {...props} />
);

export type UseGetEnvoyFleetsProps = Omit<
  UseGetProps<EnvoyFleetItem[], unknown, GetEnvoyFleetsQueryParams, void>,
  'path'
>;

/**
 * Get a list of envoy fleets
 *
 * Returns a list of envoy fleets that are available in the cluster
 */
export const useGetEnvoyFleets = (props: UseGetEnvoyFleetsProps) =>
  useGet<EnvoyFleetItem[], unknown, GetEnvoyFleetsQueryParams, void>(`/fleets`, props);

export interface GetEnvoyFleetPathParams {
  /**
   * the namespace of the fleet
   */
  namespace: string;
  /**
   * the name of the fleet
   */
  name: string;
}

export type GetEnvoyFleetProps = Omit<GetProps<EnvoyFleetItem, void, void, GetEnvoyFleetPathParams>, 'path'> &
  GetEnvoyFleetPathParams;

/**
 * Get details for a single envoy fleet
 *
 * Returns an object containing info about the envoy fleet corresponding to the namespace and name
 */
export const GetEnvoyFleet = ({namespace, name, ...props}: GetEnvoyFleetProps) => (
  <Get<EnvoyFleetItem, void, void, GetEnvoyFleetPathParams> path={`/fleets/${namespace}/${name}`} {...props} />
);

export type UseGetEnvoyFleetProps = Omit<UseGetProps<EnvoyFleetItem, void, void, GetEnvoyFleetPathParams>, 'path'> &
  GetEnvoyFleetPathParams;

/**
 * Get details for a single envoy fleet
 *
 * Returns an object containing info about the envoy fleet corresponding to the namespace and name
 */
export const useGetEnvoyFleet = ({namespace, name, ...props}: UseGetEnvoyFleetProps) =>
  useGet<EnvoyFleetItem, void, void, GetEnvoyFleetPathParams>(
    (paramsInPath: GetEnvoyFleetPathParams) => `/fleets/${paramsInPath.namespace}/${paramsInPath.name}`,
    {pathParams: {namespace, name}, ...props}
  );

export interface GetEnvoyFleetCRDResponse {
  [key: string]: any;
}

export interface GetEnvoyFleetCRDPathParams {
  namespace: string;
  name: string;
}

export type GetEnvoyFleetCRDProps = Omit<
  GetProps<GetEnvoyFleetCRDResponse, void, void, GetEnvoyFleetCRDPathParams>,
  'path'
> &
  GetEnvoyFleetCRDPathParams;

/**
 * Get envoy fleet CRD
 */
export const GetEnvoyFleetCRD = ({namespace, name, ...props}: GetEnvoyFleetCRDProps) => (
  <Get<GetEnvoyFleetCRDResponse, void, void, GetEnvoyFleetCRDPathParams>
    path={`/fleets/${namespace}/${name}/crd`}
    {...props}
  />
);

export type UseGetEnvoyFleetCRDProps = Omit<
  UseGetProps<GetEnvoyFleetCRDResponse, void, void, GetEnvoyFleetCRDPathParams>,
  'path'
> &
  GetEnvoyFleetCRDPathParams;

/**
 * Get envoy fleet CRD
 */
export const useGetEnvoyFleetCRD = ({namespace, name, ...props}: UseGetEnvoyFleetCRDProps) =>
  useGet<GetEnvoyFleetCRDResponse, void, void, GetEnvoyFleetCRDPathParams>(
    (paramsInPath: GetEnvoyFleetCRDPathParams) => `/fleets/${paramsInPath.namespace}/${paramsInPath.name}/crd`,
    {pathParams: {namespace, name}, ...props}
  );

export interface GetStaticRoutesQueryParams {
  /**
   * optional filter on namespace
   */
  namespace?: string;
}

export type GetStaticRoutesProps = Omit<GetProps<StaticRouteItem[], unknown, GetStaticRoutesQueryParams, void>, 'path'>;

/**
 * Get a list of static routes
 *
 * Returns a list of static routes
 */
export const GetStaticRoutes = (props: GetStaticRoutesProps) => (
  <Get<StaticRouteItem[], unknown, GetStaticRoutesQueryParams, void> path="/staticroutes" {...props} />
);

export type UseGetStaticRoutesProps = Omit<
  UseGetProps<StaticRouteItem[], unknown, GetStaticRoutesQueryParams, void>,
  'path'
>;

/**
 * Get a list of static routes
 *
 * Returns a list of static routes
 */
export const useGetStaticRoutes = (props: UseGetStaticRoutesProps) =>
  useGet<StaticRouteItem[], unknown, GetStaticRoutesQueryParams, void>(`/staticroutes`, props);

export interface CreateStaticRouteRequestBody {
  name?: string;
  namespace?: string;
  envoyFleetName?: string;
  envoyFleetNamespace?: string;
  openapi?: string;
}

export type CreateStaticRouteProps = Omit<
  MutateProps<StaticRouteItem, string, void, CreateStaticRouteRequestBody, void>,
  'path' | 'verb'
>;

/**
 * create new static route
 */
export const CreateStaticRoute = (props: CreateStaticRouteProps) => (
  <Mutate<StaticRouteItem, string, void, CreateStaticRouteRequestBody, void>
    verb="POST"
    path="/staticroutes"
    {...props}
  />
);

export type UseCreateStaticRouteProps = Omit<
  UseMutateProps<StaticRouteItem, string, void, CreateStaticRouteRequestBody, void>,
  'path' | 'verb'
>;

/**
 * create new static route
 */
export const useCreateStaticRoute = (props: UseCreateStaticRouteProps) =>
  useMutate<StaticRouteItem, string, void, CreateStaticRouteRequestBody, void>('POST', `/staticroutes`, props);

export interface GetStaticRoutePathParams {
  /**
   * the namespace of the static route
   */
  namespace: string;
  /**
   * the name of the static route
   */
  name: string;
}

export type GetStaticRouteProps = Omit<GetProps<StaticRouteItem, void, void, GetStaticRoutePathParams>, 'path'> &
  GetStaticRoutePathParams;

/**
 * Get details for a single static route
 *
 * Returns an object containing info about the static route corresponding to the namespace and name
 */
export const GetStaticRoute = ({namespace, name, ...props}: GetStaticRouteProps) => (
  <Get<StaticRouteItem, void, void, GetStaticRoutePathParams> path={`/staticroutes/${namespace}/${name}`} {...props} />
);

export type UseGetStaticRouteProps = Omit<UseGetProps<StaticRouteItem, void, void, GetStaticRoutePathParams>, 'path'> &
  GetStaticRoutePathParams;

/**
 * Get details for a single static route
 *
 * Returns an object containing info about the static route corresponding to the namespace and name
 */
export const useGetStaticRoute = ({namespace, name, ...props}: UseGetStaticRouteProps) =>
  useGet<StaticRouteItem, void, void, GetStaticRoutePathParams>(
    (paramsInPath: GetStaticRoutePathParams) => `/staticroutes/${paramsInPath.namespace}/${paramsInPath.name}`,
    {pathParams: {namespace, name}, ...props}
  );

export interface GetStaticRouteCRDResponse {
  [key: string]: any;
}

export interface GetStaticRouteCRDPathParams {
  namespace: string;
  name: string;
}

export type GetStaticRouteCRDProps = Omit<
  GetProps<GetStaticRouteCRDResponse, void, void, GetStaticRouteCRDPathParams>,
  'path'
> &
  GetStaticRouteCRDPathParams;

/**
 * Get static route CRD
 */
export const GetStaticRouteCRD = ({namespace, name, ...props}: GetStaticRouteCRDProps) => (
  <Get<GetStaticRouteCRDResponse, void, void, GetStaticRouteCRDPathParams>
    path={`/staticroutes/${namespace}/${name}/crd`}
    {...props}
  />
);

export type UseGetStaticRouteCRDProps = Omit<
  UseGetProps<GetStaticRouteCRDResponse, void, void, GetStaticRouteCRDPathParams>,
  'path'
> &
  GetStaticRouteCRDPathParams;

/**
 * Get static route CRD
 */
export const useGetStaticRouteCRD = ({namespace, name, ...props}: UseGetStaticRouteCRDProps) =>
  useGet<GetStaticRouteCRDResponse, void, void, GetStaticRouteCRDPathParams>(
    (paramsInPath: GetStaticRouteCRDPathParams) => `/staticroutes/${paramsInPath.namespace}/${paramsInPath.name}/crd`,
    {pathParams: {namespace, name}, ...props}
  );

export type GetNamespacesProps = Omit<GetProps<NamespaceItem[], unknown, void, void>, 'path'>;

/**
 * Get a list of namespaces
 *
 * Returns a list of namespaces
 */
export const GetNamespaces = (props: GetNamespacesProps) => (
  <Get<NamespaceItem[], unknown, void, void> path="/namespaces" {...props} />
);

export type UseGetNamespacesProps = Omit<UseGetProps<NamespaceItem[], unknown, void, void>, 'path'>;

/**
 * Get a list of namespaces
 *
 * Returns a list of namespaces
 */
export const useGetNamespaces = (props: UseGetNamespacesProps) =>
  useGet<NamespaceItem[], unknown, void, void>(`/namespaces`, props);
