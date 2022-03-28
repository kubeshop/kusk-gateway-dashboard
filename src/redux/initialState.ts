import {MainState} from '@models/main';
import {UiState} from '@models/ui';

const initialMainState: MainState = {
  selectedApi: null,
};

const initialUiState: UiState = {
  apiInfoActiveTab: 'raw-api-spec',
  envoyFleetModal: {
    envoyFleet: null,
  },
  kuskExtensionsActiveKeys: {
    top: [],
    path: [],
    operation: [],
  },
  tableOfContentsHeight: {
    postProcessedApiSpec: 500,
    rawApiSpec: 500,
  },
};

export default {
  main: initialMainState,
  ui: initialUiState,
};
