import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ApiInfoTabs, EnvoyFleetInfoTabs, StaticRouteInfoTabs} from '@models/dashboard';
import {DashboardPaneConfiguration, StepType, UiState} from '@models/ui';

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

    setApiDefinitionTableOfContentsHeight: (state: Draft<UiState>, action: PayloadAction<number>) => {
      state.tableOfContentsHeight.apiDefinition = action.payload;
    },

    setApiInfoActiveTab: (state: Draft<UiState>, action: PayloadAction<ApiInfoTabs>) => {
      state.apiInfoActiveTab = action.payload;
    },

    setApiPublishModalActiveStep: (state: Draft<UiState>, action: PayloadAction<StepType>) => {
      state.apiPublishModal.activeStep = action.payload;
    },

    setApiPublishModalLastCompletedStep: (state: Draft<UiState>, action: PayloadAction<StepType>) => {
      state.apiPublishModal.lastCompletedStep = action.payload;
    },

    setDashboardPaneConfiguration: (state: Draft<UiState>, action: PayloadAction<DashboardPaneConfiguration>) => {
      state.dashboardPaneConfiguration = action.payload;
    },

    setEnvoyFleetInfoActiveTab: (state: Draft<UiState>, action: PayloadAction<EnvoyFleetInfoTabs>) => {
      state.envoyFleetInfoActiveTab = action.payload;
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

    setPublicApiDefinitionTableOfContentsHeight: (state: Draft<UiState>, action: PayloadAction<number>) => {
      state.tableOfContentsHeight.publicApiDefinition = action.payload;
    },

    setStaticRouteInfoActiveTab: (state: Draft<UiState>, action: PayloadAction<StaticRouteInfoTabs>) => {
      state.staticRouteInfoActiveTab = action.payload;
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
  setApiDefinitionTableOfContentsHeight,
  setApiInfoActiveTab,
  setApiPublishModalActiveStep,
  setApiPublishModalLastCompletedStep,
  setEnvoyFleetInfoActiveTab,
  openEnvoyFleetModalModal,
  closeEnvoyFleetModalModal,
  setKuskExtensionsActiveKeys,
  setDashboardPaneConfiguration,
  setPublicApiDefinitionTableOfContentsHeight,
  setStaticRouteInfoActiveTab,
} = uiSlice.actions;
export default uiSlice.reducer;
