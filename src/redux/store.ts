import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';

import {alertSlice} from './reducers/alert';
import {mainSlice} from './reducers/main';
import {uiSlice} from './reducers/ui';
import {enhancedApi} from './services/enhancedApi';

export const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    main: mainSlice.reducer,
    ui: uiSlice.reducer,
    [enhancedApi.reducerPath]: enhancedApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(enhancedApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
