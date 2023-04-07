import { ColorType } from '../enums/color-type.enum';

export interface Notification {
  show: boolean;
  message: string;
  type: ColorType;
  delay?: number;
}
