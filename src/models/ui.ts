import {EnvoyFleetItem} from './api';
import {ApiInfoTabs, EnvoyFleetInfoTabs, StaticRouteInfoTabs} from './dashboard';

interface UiState {
  apiInfoActiveTab: ApiInfoTabs;
  dashboardPaneConfiguration: DashboardPaneConfiguration;
  envoyFleetInfoActiveTab: EnvoyFleetInfoTabs;
  envoyFleetModal: {
    envoyFleet: EnvoyFleetItem | null;
  };
  kuskExtensionsActiveKeys: {
    [key: string]: string[];
  };
  staticRouteInfoActiveTab: StaticRouteInfoTabs;
  tableOfContentsHeight: {
    postProcessedApiSpec: number;
    rawApiSpec: number;
  };
}

interface DashboardPaneConfiguration {
  leftPaneWidth: number;
  rightPaneWidth: number;
}

export type {DashboardPaneConfiguration, UiState};
