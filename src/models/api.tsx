/* Generated by restful-react */
import {Get, GetProps, UseGetProps, useGet} from 'restful-react';

export const SPEC_VERSION = '1.0.0';
export interface ApiItem {
  name: string;
  id: string;
  fleet: ApiItemFleet;
  service: ApiItemService;
}

export interface ServiceItem {
  name: string;
  id: string;
  status: 'available' | 'unavailable';
}

export interface EnvoyFleetItem {
  name: string;
  id: string;
}

export interface ApiItemFleet {
  name: string;
  namespace: string;
}

export interface ApiItemService {
  name: string;
  namespace: string;
}

export interface GetApisQueryParams {
  /**
   * optional filter on fleet
   */
  fleet?: string;
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

export interface GetApiOpenApiSpecResponse {
  [key: string]: any;
}

export interface GetApiOpenApiSpecPathParams {
  apiId: string;
}

export type GetApiOpenApiSpecProps = Omit<
  GetProps<GetApiOpenApiSpecResponse, void, void, GetApiOpenApiSpecPathParams>,
  'path'
> &
  GetApiOpenApiSpecPathParams;

/**
 * Get the OpenAPI spec by API id
 *
 * Returns the OpenAPI specification
 */
export const GetApiOpenApiSpec = ({apiId, ...props}: GetApiOpenApiSpecProps) => (
  <Get<GetApiOpenApiSpecResponse, void, void, GetApiOpenApiSpecPathParams>
    path={`/apis/${apiId}/openapispec`}
    {...props}
  />
);

export type UseGetApiOpenApiSpecProps = Omit<
  UseGetProps<GetApiOpenApiSpecResponse, void, void, GetApiOpenApiSpecPathParams>,
  'path'
> &
  GetApiOpenApiSpecPathParams;

/**
 * Get the OpenAPI spec by API id
 *
 * Returns the OpenAPI specification
 */
export const useGetApiOpenApiSpec = ({apiId, ...props}: UseGetApiOpenApiSpecProps) =>
  useGet<GetApiOpenApiSpecResponse, void, void, GetApiOpenApiSpecPathParams>(
    (paramsInPath: GetApiOpenApiSpecPathParams) => `/apis/${paramsInPath.apiId}/openapispec`,
    {pathParams: {apiId}, ...props}
  );

export interface GetServicesQueryParams {
  /**
   * optional filter on namespace
   */
  namespace?: string;
}

export type GetServicesProps = Omit<GetProps<ServiceItem[], unknown, GetServicesQueryParams, void>, 'path'>;

/**
 * Get a list of services
 *
 * Returns the list of services available in the cluster
 */
export const GetServices = (props: GetServicesProps) => (
  <Get<ServiceItem[], unknown, GetServicesQueryParams, void> path="/services" {...props} />
);

export type UseGetServicesProps = Omit<UseGetProps<ServiceItem[], unknown, GetServicesQueryParams, void>, 'path'>;

/**
 * Get a list of services
 *
 * Returns the list of services available in the cluster
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
