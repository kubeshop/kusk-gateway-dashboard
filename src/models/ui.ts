import {ApiInfoTabs, EnvoyFleetInfoTabs, StaticRouteInfoTabs} from './dashboard';

type StepType = 'openApiSpec' | 'apiInfo' | 'target' | 'validation' | 'hosts' | 'qos' | 'path' | 'cors' | 'websocket';
interface UiState {
  apiPublishModal: {
    activeStep: StepType;
    isOpen: boolean;
    lastCompletedStep: StepType;
  };
  apiInfoActiveTab: ApiInfoTabs;
  dashboardPaneConfiguration: DashboardPaneConfiguration;
  envoyFleetInfoActiveTab: EnvoyFleetInfoTabs;
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
