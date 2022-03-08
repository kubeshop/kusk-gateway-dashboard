import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {UiState} from '@models/ui';

import initialState from '@redux/initialState';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState.ui,
  reducers: {
    toggleEnvoyFleetInfoModal: (
      state: Draft<UiState>,
      action: PayloadAction<{name: string; namespace: string} | null>
    ) => {
      state.envoyFleetModal.envoyFleet = action.payload;
    },
  },
});

export const {toggleEnvoyFleetInfoModal} = uiSlice.actions;
export default uiSlice.reducer;
