type APIDetailsSections = 'dashboard' | 'openapiBrowser' | 'paths' | 'deployments' | 'logs' | 'settings';

type ApiCanvasType = 'template' | 'blank';
type TargetType = 'redirect' | 'service' | 'host' | 'mocked';

interface KuskExtensionsItem {
  id: string;
  kuskExtension: any[];
  path: string;
  method?: string;
  tag?: string;
}

interface UiState {
  apiPublishModal: {
    isOpen: boolean;
    isCanvasApiModalOpen: boolean;
    isFileApiModalOpen: boolean;
    apiCanvasType: ApiCanvasType;
  };
  envoyFleetModal: {
    isOpen: boolean;
  };
  kuskExtensionsActiveKeys: {
    [key: string]: string[];
  };
  staticRouteModal: {
    isOpen: boolean;
  };
  staticRoutePathModal: {
    isOpen: boolean;
  };
}

export type {UiState, APIDetailsSections, ApiCanvasType, TargetType, KuskExtensionsItem};
