import {AlertState} from '@models/alert';
import {MainState} from '@models/main';
import {UiState} from '@models/ui';

const initialAlertState: AlertState = {
  alert: null,
};

const initialMainState: MainState = {
  apiEndpoint: '/api/',
  devPortalEndpoint: null,
  newApiFormContent: null,
  selectedApi: null,
  selectedApiOpenapiSpec: null,
  selectedEnvoyFleet: null,
  selectedStaticRoute: null,
  selectedStaticRouteSpec: null,
  selectedApiNewSettings: null,
};

const initialUiState: UiState = {
  apiPublishModal: {
    isOpen: false,
    isCanvasApiModalOpen: false,
    isFileApiModalOpen: false,
    apiCanvasType: 'blank',
  },
  envoyFleetModal: {
    isOpen: false,
  },
  kuskExtensionsActiveKeys: {
    top: [],
    path: [],
    operation: [],
  },
  staticRouteModal: {
    isOpen: false,
  },
  staticRoutePathModal: {
    isOpen: false,
  },
};

export default {
  alert: initialAlertState,
  main: initialMainState,
  ui: initialUiState,
};
