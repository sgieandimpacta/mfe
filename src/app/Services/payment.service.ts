import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment, PaymentRequest } from '../shared/models/Payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3333/payments';

  public getPayments(): Observable<Payment[]> {
    return this.http.get<Array<Payment>>(this.url);
  }

  public getPayment(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.url}/${id}`);
  }

  public addPayment(payment: PaymentRequest): Observable<any> {
    return this.http.post(this.url, payment);
  }

  public updatePayment(id: string, payment: PaymentRequest): Observable<any> {
    return this.http.put(`${this.url}/${id}`, payment);
  }

  public schedulePayment(id: String): Observable<any> {
    return this.http.put(`${this.url}/${id}`, { status: 1 });
  }

  public makePayment(id: String): Observable<any> {
    return this.http.put(`${this.url}/${id}`, { status: 2 });
  }

  public removePayment(id: String): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
