import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';

import {mainSlice} from './reducers/main';
import {uiSlice} from './reducers/ui';

export const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
