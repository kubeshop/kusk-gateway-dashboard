import {EnvoyFleetItem} from './api';
import {ApiInfoTabs, EnvoyFleetInfoTabs, StaticRouteInfoTabs} from './dashboard';

type StepType =
  | 'openApiSpec'
  | 'apiInfo'
  | 'validation'
  | 'upstreamOrRedirect'
  | 'hosts'
  | 'qos'
  | 'path'
  | 'cors'
  | 'websocket';
interface UiState {
  apiPublishModal: {
    activeStep: StepType;
    isOpen: boolean;
  };
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

export type {DashboardPaneConfiguration, StepType, UiState};
