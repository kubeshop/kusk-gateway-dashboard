import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {KUSK_SETTINGS_TARGET_API} from '@constants/constants';

import {ApiContent, MainState} from '@models/main';

import initialState from '@redux/initialState';
import {ApiItem, EnvoyFleetItem, StaticRouteItem} from '@redux/services/kuskApi';

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
        localStorage.setItem(KUSK_SETTINGS_TARGET_API, action.payload);
      } else {
        localStorage.removeItem(KUSK_SETTINGS_TARGET_API);
      }
    },
    setNewApiContent: (state: Draft<MainState>, action: PayloadAction<ApiContent | null>) => {
      state.newApiContent = action.payload;
    },
  },
});

export const {selectApi, selectEnvoyFleet, selectStaticRoute, setApiEndpoint, setNewApiContent} = mainSlice.actions;
export default mainSlice.reducer;
