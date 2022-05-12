import {ApiItem, EnvoyFleetItem, ServiceItem, StaticRouteItem} from './api';

interface MainState {
  /** API server endpoint */
  apiEndpoint: string;
  /** list of apis */
  apis: ApiItem[];
  /** content of the new publishing API */
  newApiContent: ApiContent | null;
  /**  currently selected API */
  selectedApi: ApiItem | null;
  /**  currently selected Envoy Fleet */
  selectedEnvoyFleet: EnvoyFleetItem | null;
  /**  currently selected Static Route */
  selectedStaticRoute: StaticRouteItem | null;
  /** list of services */
  services: ServicesData;
  /** list of static routes */
  staticRoutes: StaticRouteItem[];
}

interface ApiContent {
  name: string;
  namespace: string;
  envoyFleetName: string;
  envoyFleetNamespace: string;
  openapi: {[key: string]: any};
}
interface ServicesData {
  isLoading: boolean;
  items: ServiceItem[];
  error?: string;
}

export type {ApiContent, MainState, ServicesData};
