import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ApiItem, EnvoyFleetItem, StaticRouteItem} from '@models/api';
import {ApiContent, MainState, ServicesData} from '@models/main';

import initialState from '@redux/initialState';

export const mainSlice = createSlice({
  name: 'main',
  initialState: initialState.main,
  reducers: {
    selectApi: (state: Draft<MainState>, action: PayloadAction<ApiItem | null>) => {
      state.selectedApi = action.payload;
    },
    selectEnvoyFleet: (state: Draft<MainState>, action: PayloadAction<EnvoyFleetItem | null>) => {
      state.selectedEnvoyFleet = action.payload;
    },
    selectStaticRoute: (state: Draft<MainState>, action: PayloadAction<StaticRouteItem | null>) => {
      state.selectedStaticRoute = action.payload;
    },
    setApiEndpoint: (state: Draft<MainState>, action: PayloadAction<string>) => {
      state.apiEndpoint = action.payload;

      if (action.payload) {
        localStorage.setItem('apiEndpoint', action.payload);
      } else {
        localStorage.removeItem('apiEndpoint');
      }
    },
    setApis: (state: Draft<MainState>, action: PayloadAction<ApiItem[]>) => {
      state.apis = action.payload;
    },
    setNewApiContent: (state: Draft<MainState>, action: PayloadAction<ApiContent | null>) => {
      state.newApiContent = action.payload;
    },
    setServices: (state: Draft<MainState>, action: PayloadAction<ServicesData>) => {
      state.services = action.payload;
    },
    setStaticRoutes: (state: Draft<MainState>, action: PayloadAction<StaticRouteItem[]>) => {
      state.staticRoutes = action.payload;
    },
  },
});

export const {
  selectApi,
  selectEnvoyFleet,
  selectStaticRoute,
  setApiEndpoint,
  setApis,
  setNewApiContent,
  setServices,
  setStaticRoutes,
} = mainSlice.actions;
export default mainSlice.reducer;
