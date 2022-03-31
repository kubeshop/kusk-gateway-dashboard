import {EnvoyFleetItem} from '@models/api';

export const getEnvoyFleetKey = (envoyFleet: EnvoyFleetItem | null) =>
  envoyFleet ? `${envoyFleet.namespace}-${envoyFleet.name}` : '';
