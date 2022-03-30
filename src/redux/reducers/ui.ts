import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ApiInfoTabs, EnvoyFleetInfoTabs} from '@models/dashboard';
import {DashboardPaneConfiguration, UiState} from '@models/ui';

import initialState from '@redux/initialState';

import {selectApi} from './main';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState.ui,
  reducers: {
    setApiInfoActiveTab: (state: Draft<UiState>, action: PayloadAction<ApiInfoTabs>) => {
      state.apiInfoActiveTab = action.payload;
    },

    setEnvoyFleetInfoActiveTab: (state: Draft<UiState>, action: PayloadAction<EnvoyFleetInfoTabs>) => {
      state.envoyFleetInfoActiveTab = action.payload;
    },

    setKuskExtensionsActiveKeys: (state: Draft<UiState>, action: PayloadAction<{keys: string[]; level: string}>) => {
      const {keys, level} = action.payload;

      state.kuskExtensionsActiveKeys[level] = keys;
    },

    setDashboardPaneConfiguration: (state: Draft<UiState>, action: PayloadAction<DashboardPaneConfiguration>) => {
      state.dashboardPaneConfiguration = action.payload;
    },

    setPostProcessedTabledOfContentsHeight: (state: Draft<UiState>, action: PayloadAction<number>) => {
      state.tableOfContentsHeight.postProcessedApiSpec = action.payload;
    },

    setRawApiSpecTableOfContentsHeight: (state: Draft<UiState>, action: PayloadAction<number>) => {
      state.tableOfContentsHeight.rawApiSpec = action.payload;
    },

    toggleEnvoyFleetInfoModal: (
      state: Draft<UiState>,
      action: PayloadAction<{name: string; namespace: string} | null>
    ) => {
      state.envoyFleetModal.envoyFleet = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(selectApi.type, state => {
      state.kuskExtensionsActiveKeys = {
        top: [],
        path: [],
        operation: [],
      };
    });
  },
});

export const {
  setApiInfoActiveTab,
  setEnvoyFleetInfoActiveTab,
  setKuskExtensionsActiveKeys,
  setDashboardPaneConfiguration,
  setPostProcessedTabledOfContentsHeight,
  setRawApiSpecTableOfContentsHeight,
  toggleEnvoyFleetInfoModal,
} = uiSlice.actions;
export default uiSlice.reducer;
