import {ApiItem} from './api';

interface MainState {
  /** the ID of the currently selected API */
  selectedApi: ApiItem | null;
}

export type {MainState};
