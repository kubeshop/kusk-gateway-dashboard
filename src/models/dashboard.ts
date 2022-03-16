export interface ApisTableDataSourceItem {
  key: string;
  name: string;
  services: 'available' | 'unavailable';
}

export interface KuskExtensionsItem {
  id: string;
  kuskExtension: any[];
  path: string;
  method?: string;
  tag?: string;
}

export type ApiInfoTabs = 'raw-api-spec' | 'post-processed-api-spec' | 'kusk-extensions';
