import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ApiInfoTabs} from '@models/dashboard';
import {UiState} from '@models/ui';

import initialState from '@redux/initialState';

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

    toggleEnvoyFleetInfoModal: (
      state: Draft<UiState>,
      action: PayloadAction<{name: string; namespace: string} | null>
    ) => {
      state.envoyFleetModal.envoyFleet = action.payload;
    },
  },
});

export const {setApiInfoActiveTab, setKuskExtensionsActiveKeys, toggleEnvoyFleetInfoModal} = uiSlice.actions;
export default uiSlice.reducer;
