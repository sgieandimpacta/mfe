import { NotificationType } from '../enums/color-type.enum';

export interface Notification {
  show: boolean;
  message: string;
  type: NotificationType;
  delay?: number;
}
