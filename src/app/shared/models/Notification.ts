import { NotificationType } from '../enums/notification-type.enum';

export interface Notification {
  show: boolean;
  message: string;
  type: NotificationType;
  delay?: number;
}
