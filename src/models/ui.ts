import {EnvoyFleetItem} from './api';
import {ApiInfoTabs} from './dashboard';

interface UiState {
  apiInfoActiveTab: ApiInfoTabs;
  envoyFleetModal: {
    envoyFleet: EnvoyFleetItem | null;
  };
  kuskExtensionsActiveKeys: {
    [key: string]: string[];
  };
  tableOfContentsHeight: {
    postProcessedApiSpec: number;
    rawApiSpec: number;
  };
}

export type {UiState};
