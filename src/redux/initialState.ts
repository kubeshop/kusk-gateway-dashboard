import {AlertState} from '@models/alert';
import {MainState} from '@models/main';
import {UiState} from '@models/ui';

const initialAlertState: AlertState = {
  alert: null,
};

const initialMainState: MainState = {
  apis: [],
  newApiContent: null,
  selectedApi: null,
  selectedEnvoyFleet: null,
  selectedStaticRoute: null,
  services: {
    isLoading: true,
    items: [],
  },
};

const initialUiState: UiState = {
  apiPublishModal: {
    activeStep: 'openApiSpec',
    isOpen: false,
  },
  apiInfoActiveTab: 'api-definition',
  dashboardPaneConfiguration: {
    leftPaneWidth: 0.5,
    rightPaneWidth: 0.5,
  },
  envoyFleetInfoActiveTab: 'crd',
  kuskExtensionsActiveKeys: {
    top: [],
    path: [],
    operation: [],
  },
  staticRouteInfoActiveTab: 'crd',
  tableOfContentsHeight: {
    postProcessedApiSpec: 500,
    rawApiSpec: 500,
  },
};

export default {
  alert: initialAlertState,
  main: initialMainState,
  ui: initialUiState,
};
