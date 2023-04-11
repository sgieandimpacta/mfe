import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CanActivate } from 'src/app/shared/models/CanActivate';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate() {
    return this.authService.isAuthenticated();
  }
}
