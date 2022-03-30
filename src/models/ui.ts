import {EnvoyFleetItem} from './api';
import {ApiInfoTabs, EnvoyFleetInfoTabs} from './dashboard';

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
