import {Draft, PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {KUSK_SETTINGS_TARGET_API} from '@constants/constants';

import {ApiContent, MainState} from '@models/main';

import initialState from '@redux/initialState';
import {enhancedApi} from '@redux/services/enhancedApi';
import {ApiItem, EnvoyFleetItem, StaticRouteItem} from '@redux/services/kuskApi';
import {RootState} from '@redux/store';

const updateApiSettings = createAsyncThunk<any, void, {state: RootState}>(
  'main/updateApiSettings',
  async (_, {getState, dispatch}) => {
    const selectedApi = getState().main.selectedApi;
    const selectedApiOpenapiSpec = getState().main.selectedApiOpenapiSpec;
    const selectedApiNewSettings = getState().main.selectedApiNewSettings;
    const openapiObj = {...selectedApiOpenapiSpec, ...selectedApiNewSettings?.Kusk};

    const body = {
      name: selectedApiNewSettings?.name || selectedApi?.name,
      namespace: selectedApiNewSettings?.namespace || selectedApi?.namespace,
      envoyFleetName: selectedApiNewSettings?.envoyFleetName || selectedApi?.fleet?.name,
      envoyFleetNamespace: selectedApiNewSettings?.envoyFleetNamespace || selectedApi?.fleet?.namespace,
      openapi: YAML.stringify(cleanDeep(openapiObj)),
    };
    if (selectedApi) {
      await dispatch(
        enhancedApi.endpoints.deleteApi.initiate({name: selectedApi.name, namespace: selectedApi.namespace})
      ).unwrap();
      await dispatch(enhancedApi.endpoints.deployApi.initiate({body})).unwrap();
    }
  }
);

export const mainSlice = createSlice({
  name: 'main',
  initialState: initialState.main,
  reducers: {
    selectApi: (state: Draft<MainState>, action: PayloadAction<ApiItem | null>) => {
      state.selectedApi = action.payload;
    },
    selectApiOpenSpec: (state: Draft<MainState>, action: PayloadAction<ApiItem | null>) => {
      state.selectedApiOpenapiSpec = action.payload;
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
    setNewApiFormContent: (state: Draft<MainState>, action: PayloadAction<ApiContent | null>) => {
      state.newApiFormContent = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateApiSettings.fulfilled, () => {});
  },
});

export const {selectApi, selectApiOpenSpec, selectEnvoyFleet, selectStaticRoute, setApiEndpoint, setNewApiFormContent} =
  mainSlice.actions;
export default mainSlice.reducer;
