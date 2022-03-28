import {EnvoyFleetItem} from './api';
import {ApiInfoTabs} from './dashboard';

interface UiState {
  apiInfoActiveTab: ApiInfoTabs;
  dashboardPaneConfiguration: DashboardPaneConfiguration;
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
