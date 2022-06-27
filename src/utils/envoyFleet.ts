import {EnvoyFleetItem} from '@redux/services/kuskApi';

export const getEnvoyFleetKey = (envoyFleet: EnvoyFleetItem | null) =>
  envoyFleet ? `${envoyFleet.namespace}-${envoyFleet.name}` : '';
