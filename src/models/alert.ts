export enum AlertEnum {
  Success,
  Info,
  Warning,
  Error,
}

export type AlertState = {
  alert: AlertType | null;
};

export type AlertType = {
  title: string;
  type: AlertEnum;
  createdAt?: number;
  duration?: number | null;
  description?: string;
  placement?: string;
};
