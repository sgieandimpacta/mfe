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

  public addPayment(payment: PaymentRequest): Observable<any> {
    return this.http.post(this.url, payment);
  }

  public removePayment(id: String): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  public makePayment(id: String): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, { id_status: 2 });
  }

  public schedulePayment(id: String): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, { id_status: 1 });
  }
}
