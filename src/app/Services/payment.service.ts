import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Payment,
  PaymentRequest,
  PaymentResponse,
} from '../shared/models/Payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/payments`;
  }
  public getPayments(page: number): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(this.url, {
      params: {
        page,
      },
    });
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

  public deletePayment(id: String): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
