import { IPagination } from "../../../../shared/pagination";

export interface INotification {
  id: string;
  title: string;
  body: string;
  type: TypeNotification;
  is_read: boolean;
  created_at: Date;
}

export enum TypeNotification {
  REQUEST_SENT = "REQUEST_SENT",
  REQUEST_ACCEPTED = "REQUEST_ACCEPTED",
  REQUEST_REFUSED = "REQUEST_REFUSED",
}

export interface INotificationsResponse {
  data: INotification[];
  pagination: IPagination;
}
