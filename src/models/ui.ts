import {ApiInfoTabs, EnvoyFleetInfoTabs, StaticRouteInfoTabs} from './dashboard';

type StepType = 'openApiSpec' | 'apiInfo' | 'fleetInfo'| 'target' | 'validation' | 'hosts' | 'qos' | 'path' | 'cors' | 'websocket';

type StaticRouteStepType = 'routeInfo'| 'fleetInfo'| 'hosts'| 'paths';

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
  staticRouteModal: {
    isOpen: boolean;
    activeStep: StaticRouteStepType;
    lastCompletedStep: StaticRouteStepType;
  };
  tableOfContentsHeight: {
    apiDefinition: number;
    publicApiDefinition: number;
  };
}

interface DashboardPaneConfiguration {
  leftPaneWidth: number;
  rightPaneWidth: number;
}

export type {DashboardPaneConfiguration, StepType, UiState, StaticRouteStepType};
