import {StaticRouteItem} from '@models/api';

export const getStaticRouteKey = (staticRoute: StaticRouteItem | null) =>
  staticRoute ? `${staticRoute.namespace}-${staticRoute.name}` : '';
