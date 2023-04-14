import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Session } from '../shared/models/Session';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.apiUrl;
  }

  login(user: User) {
    return this.http
      .post<Session>(`${this.url}/login`, {
        email: user.email,
        password: user.password,
      })
      .pipe(take(1))
      .subscribe({
        next: (res: Session) => this.authenticate(res),
        error: (e) => console.info(e),
        complete: () => console.info('complete'),
      });
  }

  logout() {
    sessionStorage.removeItem('session');
  }

  isAuthenticated(): boolean {
    const session: Session = this.getSession();
    return !!session.token && new Date() < new Date(session.expires_at);
  }

  getSession(): Session {
    const sessionString: string = sessionStorage.getItem('session') || '{}';
    return JSON.parse(sessionString);
  }

  private authenticate(session: Session) {
    sessionStorage.setItem('session', JSON.stringify(session));
    this.router.navigateByUrl('/');
  }
}
