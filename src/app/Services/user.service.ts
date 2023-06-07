import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/users`;
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<Array<User>>(this.url);
  }
}
