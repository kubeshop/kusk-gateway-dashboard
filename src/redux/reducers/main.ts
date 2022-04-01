import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {MainState} from 'src/models/main';

import {ApiItem, EnvoyFleetItem} from '@models/api';

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
  },
});

export const {selectApi, selectEnvoyFleet} = mainSlice.actions;
export default mainSlice.reducer;
