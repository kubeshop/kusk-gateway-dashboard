import {createListenerMiddleware} from '@reduxjs/toolkit';

import YAML from 'yaml';

import {selectApiOpenSpec, setApiEndpoint} from '@redux/reducers/main';
import {enhancedApi} from '@redux/services/enhancedApi';

export const ApiListenerMiddleware = createListenerMiddleware();

ApiListenerMiddleware.startListening({
  matcher: enhancedApi.endpoints.getApi.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    const selectedApi = action.payload;
    if (!selectedApi) {
      return;
    }

    const apiCRD = await listenerApi
      .dispatch(enhancedApi.endpoints.getApiCrd.initiate({name: selectedApi.name, namespace: selectedApi.namespace}))
      .unwrap();

    listenerApi.dispatch(selectApiOpenSpec(YAML.parse((apiCRD as any)?.spec?.spec || '')));
  },
});

ApiListenerMiddleware.startListening({
  actionCreator: setApiEndpoint,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    listenerApi.dispatch(enhancedApi.util.resetApiState());
  },
});
