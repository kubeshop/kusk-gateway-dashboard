import {ApiInfoTabs} from './dashboard';

interface UiState {
  apiInfoActiveTab: ApiInfoTabs;
  envoyFleetModal: {
    envoyFleet: {
      name: string;
      namespace: string;
    } | null;
  };
}

export type {UiState};
