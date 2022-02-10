import {createSlice} from '@reduxjs/toolkit';

import initialReduxState from '../initialState';

export const mainSlice = createSlice({
  name: 'main',
  initialState: initialReduxState.main,
  reducers: {},
});
