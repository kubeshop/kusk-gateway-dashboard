export interface ApisTableDataSourceItem {
  key: string;
  name: string;
  services: 'available' | 'unavailable';
}

export type ApiInfoTabs = 'raw-api-spec' | 'post-processed-api-spec' | 'kusk-extensions';
