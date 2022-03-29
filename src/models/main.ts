import {ApiItem, EnvoyFleetItem} from './api';

interface MainState {
  /**  currently selected API */
  selectedApi: ApiItem | null;
  /**  currently selected EnvoyFleet */
  selectedEnvoyFleet: EnvoyFleetItem | null;
}

export type {MainState};
