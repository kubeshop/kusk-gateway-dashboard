import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {AlertState, AlertType} from '@models/alert';

import initialState from '@redux/initialState';

export const alertSlice = createSlice({
  name: 'alert',
  initialState: initialState.alert,
  reducers: {
    clearAlert: (state: Draft<AlertState>) => {
      state.alert = null;
    },
    setAlert: (state: Draft<AlertState>, action: PayloadAction<AlertType>) => {
      state.alert = action.payload;
    },
  },
});

export const {clearAlert, setAlert} = alertSlice.actions;
export default alertSlice.reducer;
