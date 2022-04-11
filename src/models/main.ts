import {ApiItem, EnvoyFleetItem, ServiceItem, StaticRouteItem} from './api';

interface ServicesData {
  isLoading: boolean;
  items: ServiceItem[];
  error?: string;
}

interface MainState {
  /** list of apis */
  apis: ApiItem[];
  /**  currently selected API */
  selectedApi: ApiItem | null;
  /**  currently selected Envoy Fleet */
  selectedEnvoyFleet: EnvoyFleetItem | null;
  /**  currently selected Static Route */
  selectedStaticRoute: StaticRouteItem | null;
  /** list of services */
  services: ServicesData;
}

export type {MainState, ServicesData};
