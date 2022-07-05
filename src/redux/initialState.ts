import {AlertState} from '@models/alert';
import {MainState} from '@models/main';
import {UiState} from '@models/ui';

const initialAlertState: AlertState = {
  alert: null,
};

const initialMainState: MainState = {
  apiEndpoint: '/api/',
  newApiFormContent: null,
  selectedApi: null,
  selectedEnvoyFleet: null,
  selectedStaticRoute: null,
};

const initialUiState: UiState = {
  apiPublishModal: {
    activeStep: 'openApiSpec',
    isOpen: false,
    lastCompletedStep: 'openApiSpec',
  },
  apiInfoActiveTab: 'crd',
  dashboardPaneConfiguration: {
    leftPaneWidth: 0.5,
    rightPaneWidth: 0.5,
  },
  envoyFleetInfoActiveTab: 'crd',
  envoyFleetModal: {
    isOpen: false,
  },
  kuskExtensionsActiveKeys: {
    top: [],
    path: [],
    operation: [],
  },
  staticRouteInfoActiveTab: 'crd',
  staticRouteModal: {
    isOpen: false,
    activeStep: 'routeInfo',
    lastCompletedStep: 'routeInfo',
  },
  tableOfContentsHeight: {
    apiDefinition: 500,
    publicApiDefinition: 500,
  },
};

export default {
  alert: initialAlertState,
  main: initialMainState,
  ui: initialUiState,
};
