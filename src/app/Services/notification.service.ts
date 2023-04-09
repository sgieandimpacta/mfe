import { Injectable } from '@angular/core';
import { Notification } from '../shared/models/Notification';
import { NotificationType } from '../shared/enums/color-type.enum';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications: Notification[] = [];

  notify(message: string, type: NotificationType) {
    this.show({
      message: message,
      show: true,
      type: type,
    });
  }

  show(notification: Notification) {
    this.notifications.push(notification);
  }

  remove(toast: Notification) {
    this.notifications = this.notifications.filter((t) => t != toast);
  }
}
