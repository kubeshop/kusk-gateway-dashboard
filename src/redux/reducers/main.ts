import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {MainState} from 'src/models/main';

import {ApiItem, EnvoyFleetItem, StaticRouteItem} from '@models/api';

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
  },
});

export const {selectApi, selectEnvoyFleet, selectStaticRoute} = mainSlice.actions;
export default mainSlice.reducer;
