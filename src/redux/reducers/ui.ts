import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ApiCanvasType, UiState} from '@models/ui';

import initialState from '@redux/initialState';

import {selectApi} from './main';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState.ui,
  reducers: {
    closeApiPublishModal: (state: Draft<UiState>) => {
      state.apiPublishModal.isOpen = false;
    },

    openApiPublishModal: (state: Draft<UiState>) => {
      state.apiPublishModal.isOpen = true;
    },

    openCanvasApiModal: (state: Draft<UiState>) => {
      state.apiPublishModal.isCanvasApiModalOpen = true;
    },

    closeCanvasApiModal: (state: Draft<UiState>) => {
      state.apiPublishModal.isCanvasApiModalOpen = false;
      state.apiPublishModal.apiCanvasType = 'blank';
    },
    openFileApiModal: (state: Draft<UiState>) => {
      state.apiPublishModal.isFileApiModalOpen = true;
    },
    closeFileApiModal: (state: Draft<UiState>) => {
      state.apiPublishModal.isFileApiModalOpen = false;
    },
    setApiCanvasType: (state: Draft<UiState>, action: PayloadAction<ApiCanvasType>) => {
      state.apiPublishModal.apiCanvasType = action.payload;
    },

    closeEnvoyFleetModalModal: (state: Draft<UiState>) => {
      state.envoyFleetModal.isOpen = false;
    },

    openEnvoyFleetModalModal: (state: Draft<UiState>) => {
      state.envoyFleetModal.isOpen = true;
    },

    setKuskExtensionsActiveKeys: (state: Draft<UiState>, action: PayloadAction<{keys: string[]; level: string}>) => {
      const {keys, level} = action.payload;

      state.kuskExtensionsActiveKeys[level] = keys;
    },

    closeStaticRouteModal: (state: Draft<UiState>) => {
      state.staticRouteModal.isOpen = false;
    },

    openStaticRouteModal: (state: Draft<UiState>) => {
      state.staticRouteModal.isOpen = true;
    },
    openStaticRoutePathModal: (state: Draft<UiState>) => {
      state.staticRoutePathModal.isOpen = true;
    },
    closeStaticRoutePathModal: (state: Draft<UiState>) => {
      state.staticRoutePathModal.isOpen = false;
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
  closeApiPublishModal,
  openApiPublishModal,
  openCanvasApiModal,
  closeCanvasApiModal,
  openFileApiModal,
  closeFileApiModal,
  setApiCanvasType,
  openEnvoyFleetModalModal,
  closeEnvoyFleetModalModal,
  setKuskExtensionsActiveKeys,
  openStaticRouteModal,
  closeStaticRouteModal,
  openStaticRoutePathModal,
  closeStaticRoutePathModal,
} = uiSlice.actions;
export default uiSlice.reducer;
