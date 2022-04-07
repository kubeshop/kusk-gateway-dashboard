import {ApiItem, EnvoyFleetItem, StaticRouteItem} from './api';

interface MainState {
  /** list of apis */
  apis: ApiItem[];
  /**  currently selected API */
  selectedApi: ApiItem | null;
  /**  currently selected Envoy Fleet */
  selectedEnvoyFleet: EnvoyFleetItem | null;
  /**  currently selected Static Route */
  selectedStaticRoute: StaticRouteItem | null;
}

export type {MainState};
