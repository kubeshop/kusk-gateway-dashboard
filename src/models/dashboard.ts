export interface DashboardAPIsTableDataSourceItem {
  key: string;
  name: string;
  status: 'published' | 'unpublished';
  services: 'available' | 'unavailable';
}
