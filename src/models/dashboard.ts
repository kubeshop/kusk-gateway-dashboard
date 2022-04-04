export interface KuskExtensionsItem {
  id: string;
  kuskExtension: any[];
  path: string;
  method?: string;
  tag?: string;
}

export type ApiInfoTabs = 'raw-api-spec' | 'post-processed-api-spec' | 'kusk-extensions';
export type EnvoyFleetInfoTabs = 'crd' | 'apis' | 'static-routes';
export type StaticRouteInfoTabs = 'crd';
