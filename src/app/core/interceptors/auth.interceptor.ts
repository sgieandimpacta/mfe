import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Session } from 'src/app/shared/models/Session';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const session: Session = this.authService.getSession();
    if (this.authService.isAuthenticated()) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${session.token}`),
      });
      return next.handle(cloned);
    } else {
      this.router.navigateByUrl('/login');
      return next.handle(req);
    }
  }
}
