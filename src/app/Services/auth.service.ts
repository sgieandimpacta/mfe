import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${this.url}/login`, { email, password }).pipe(
      tap((res) => this.authenticate(res)),
      shareReplay()
    );
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  private authenticate(authResult: any) {
    sessionStorage.setItem('token', authResult.token);
  }
}
