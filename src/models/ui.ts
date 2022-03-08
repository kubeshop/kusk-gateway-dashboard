interface UiState {
  envoyFleetModal: {
    envoyFleet: {
      name: string;
      namespace: string;
    } | null;
  };
}

export type {UiState};
