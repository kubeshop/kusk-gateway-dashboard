import {ApiItem, EnvoyFleetItem, ServiceItem, StaticRouteItem} from './api';

interface MainState {
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
}

interface ApiContent {
  name: string;
  namespace: string;
  openapi: {[key: string]: any};
}
interface ServicesData {
  isLoading: boolean;
  items: ServiceItem[];
  error?: string;
}

export type {ApiContent, MainState, ServicesData};
