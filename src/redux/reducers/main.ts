import {Draft, PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import cleanDeep from 'clean-deep';
import _ from 'lodash';
import YAML from 'yaml';

import {KUSK_SETTINGS_TARGET_API} from '@constants/constants';

import {AlertEnum} from '@models/alert';
import {ApiContent, MainState} from '@models/main';

import initialState from '@redux/initialState';
import {enhancedApi} from '@redux/services/enhancedApi';
import {ApiItem, EnvoyFleetItem, StaticRouteItem} from '@redux/services/kuskApi';
import {RootState} from '@redux/store';

import {setAlert} from './alert';

export const updateApiSettings = createAsyncThunk<any, {editedOpenapi?: any}, {state: RootState}>(
  'main/updateApiSettings',
  async ({editedOpenapi}, {getState, dispatch}) => {
    const selectedApi = getState().main.selectedApi;
    const selectedApiOpenapiSpec = getState().main.selectedApiOpenapiSpec;
    const openapiObj = _.merge({}, selectedApiOpenapiSpec, editedOpenapi);

    const body = {
      name: editedOpenapi?.name || selectedApi?.name,
      namespace: editedOpenapi?.namespace || selectedApi?.namespace,
      envoyFleetName: editedOpenapi?.envoyFleetName || selectedApi?.fleet?.name,
      envoyFleetNamespace: editedOpenapi?.envoyFleetNamespace || selectedApi?.fleet?.namespace,
      openapi: YAML.stringify(cleanDeep(openapiObj)),
    };

    if (selectedApi) {
      const result: any = await dispatch(
        enhancedApi.endpoints.updateApi.initiate({name: selectedApi.name, namespace: selectedApi.namespace, body})
      ).unwrap();
      enhancedApi.util.invalidateTags(['API']);
      dispatch(selectApiOpenSpec(YAML.parse((result as any)?.spec?.spec || '')));
      dispatch(
        setAlert({
          title: 'API updated successfully',
          description: `${result.metadata.name} was deployed successfully in ${result.metadata.namespace} namespace!`,
          type: AlertEnum.Success,
        })
      );
      return result;
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
