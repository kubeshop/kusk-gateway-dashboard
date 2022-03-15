import {ApiInfoTabs} from './dashboard';

interface UiState {
  apiInfoActiveTab: ApiInfoTabs;
  envoyFleetModal: {
    envoyFleet: {
      name: string;
      namespace: string;
    } | null;
  };
  kuskExtensionsActiveKeys: {
    [key: string]: string[];
  };
}

export type {UiState};
