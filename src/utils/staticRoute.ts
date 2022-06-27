import {StaticRouteItem} from '@redux/services/kuskApi';

export const getStaticRouteKey = (staticRoute: StaticRouteItem | null) =>
  staticRoute ? `${staticRoute.namespace}-${staticRoute.name}` : '';

export function cleanEmptyFields(object: any) {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === 'object') {
      cleanEmptyFields(v);
    }
    if ((v && typeof v === 'object' && !Object.keys(v).length) || v === null || v === undefined) {
      if (Array.isArray(object)) {
        object.splice(Number(k), 1);
      } else {
        delete object[k];
      }
    }
  });
  return object;
}
