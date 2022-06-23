import {ApiInfoTabs, EnvoyFleetInfoTabs, StaticRouteInfoTabs} from './dashboard';

type StepType =
  | 'openApiSpec'
  | 'apiInfo'
  | 'fleetInfo'
  | 'target'
  | 'validation'
  | 'hosts'
  | 'qos'
  | 'path'
  | 'cors'
  | 'websocket'
  | 'cache'
  | 'rateLimiting';

type StaticRouteStepType = 'routeInfo' | 'fleetInfo' | 'hosts' | 'paths';

type PathModalStepType = 'path' | 'target' | 'qos' | 'cors' | 'websocket';

interface UiState {
  apiPublishModal: {
    activeStep: StepType;
    isOpen: boolean;
    lastCompletedStep: StepType;
  };
  apiInfoActiveTab: ApiInfoTabs;
  dashboardPaneConfiguration: DashboardPaneConfiguration;
  envoyFleetInfoActiveTab: EnvoyFleetInfoTabs;
  envoyFleetModal: {
    isOpen: boolean;
  };
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

export type {DashboardPaneConfiguration, StepType, UiState, StaticRouteStepType, PathModalStepType};
