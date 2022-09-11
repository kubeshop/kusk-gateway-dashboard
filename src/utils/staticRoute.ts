import {StaticRouteItem} from '@redux/services/kuskApi';

export const getStaticRouteKey = (staticRoute: StaticRouteItem | null) =>
  staticRoute ? `${staticRoute.namespace}-${staticRoute.name}` : '';

export const checkDuplicateStaticRoute = (staticRoutes: StaticRouteItem[], routeKey: string) =>
  staticRoutes.find(staticRoute => `${staticRoute.namespace}-${staticRoute.name}` === routeKey);

export const formatApiName = (name: string) =>
  name
    ? name
        .trim()
        .replace(/[\W_]+/g, '-')
        .toLowerCase()
    : '';
