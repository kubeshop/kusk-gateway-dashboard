import {ApiInfoTabs, EnvoyFleetInfoTabs, StaticRouteInfoTabs} from './dashboard';

type StepType =
  | 'openApiSpec'
  | 'apiSettings'
  | 'fleetInfo'
  | 'target'
  | 'hosts'
  | 'qos'
  | 'cors'
  | 'caching'
  | 'rateLimiting'
  | 'authentication';

type StaticRouteStepType = 'routeInfo' | 'fleetInfo' | 'hosts' | 'paths';

type PathModalStepType = 'path' | 'target' | 'qos' | 'cors' | 'websocket';

type APIDetailsSections = 'dashboard' | 'openapiBrowser' | 'routes' | 'deployments' | 'logs' | 'settings';

type ApiCanvasType = 'template' | 'blank';
interface UiState {
  apiPublishModal: {
    activeStep: StepType;
    isOpen: boolean;
    lastCompletedStep: StepType;
    isCanvasApiModalOpen: boolean;
    isFileApiModalOpen: boolean;
    apiCanvasType: ApiCanvasType;
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

export type {
  DashboardPaneConfiguration,
  StepType,
  UiState,
  StaticRouteStepType,
  PathModalStepType,
  APIDetailsSections,
  ApiCanvasType,
};
