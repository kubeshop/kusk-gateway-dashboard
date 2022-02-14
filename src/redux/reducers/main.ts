import {Draft, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MainState} from 'src/models/main';

import initialReduxState from '../initialState';

export const mainSlice = createSlice({
  name: 'main',
  initialState: initialReduxState.main,
  reducers: {
    selectApi: (state: Draft<MainState>, action: PayloadAction<string>) => {
      state.selectedApi = action.payload;
    },
  },
});

export const {selectApi} = mainSlice.actions;
export default mainSlice.reducer;
