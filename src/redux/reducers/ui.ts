import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ApiInfoTabs} from '@models/dashboard';
import {UiState} from '@models/ui';

import initialState from '@redux/initialState';

import {selectApi} from './main';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState.ui,
  reducers: {
    setApiInfoActiveTab: (state: Draft<UiState>, action: PayloadAction<ApiInfoTabs>) => {
      state.apiInfoActiveTab = action.payload;
    },

    setKuskExtensionsActiveKeys: (state: Draft<UiState>, action: PayloadAction<{keys: string[]; level: string}>) => {
      const {keys, level} = action.payload;

      state.kuskExtensionsActiveKeys[level] = keys;
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
  setKuskExtensionsActiveKeys,
  setPostProcessedTabledOfContentsHeight,
  setRawApiSpecTableOfContentsHeight,
  toggleEnvoyFleetInfoModal,
} = uiSlice.actions;
export default uiSlice.reducer;
