import {MainState} from '@models/main';
import {UiState} from '@models/ui';

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
  apiDeployModal: {
    isOpen: false,
  },
  apiInfoActiveTab: 'raw-api-spec',
  dashboardPaneConfiguration: {
    leftPaneWidth: 0.5,
    rightPaneWidth: 0.5,
  },
  envoyFleetInfoActiveTab: 'crd',
  envoyFleetModal: {
    envoyFleet: null,
  },
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
  main: initialMainState,
  ui: initialUiState,
};
