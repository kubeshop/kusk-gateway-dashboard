import {ApiItem} from './api';

export interface ApisTableDataSourceItem {
  key: string;
  name: string;
  apiItem: ApiItem;
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
