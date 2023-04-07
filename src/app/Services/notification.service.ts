import { Injectable } from '@angular/core';
import { Notification } from '../shared/models/Notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications: Notification[] = [];

  show(notification: Notification) {
    this.notifications.push(notification);
  }

  remove(toast: Notification) {
    this.notifications = this.notifications.filter((t) => t != toast);
  }
}
