export interface KuskExtensionsItem {
  id: string;
  kuskExtension: any[];
  path: string;
  method?: string;
  tag?: string;
}

export type ApiInfoTabs = 'crd' | 'api-definition' | 'public-api-definition' | 'kusk-extensions';
export type EnvoyFleetInfoTabs = 'crd' | 'apis' | 'static-routes';
export type StaticRouteInfoTabs = 'crd';
