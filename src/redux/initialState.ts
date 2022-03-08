import {MainState} from '@models/main';
import {UiState} from '@models/ui';

const initialMainState: MainState = {
  selectedApi: '',
};

const initialUiState: UiState = {
  envoyFleetModal: {
    envoyFleet: null,
  },
};

export default {
  main: initialMainState,
  ui: initialUiState,
};
