import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import {
  PaymentStatus,
  StatusRow,
} from 'src/app/shared/enums/status-payments.enum';
import { Payment } from 'src/app/shared/models/Payment';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss'],
})
export class ListPaymentComponent implements OnInit {
  title = 'mfe';
  payments: Payment[] = [];
  status = PaymentStatus;

  constructor(private service: PaymentService) {}

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.service
      .getPayments()
      .pipe()
      .subscribe((payments) => {
        this.payments = payments;
      });
  }

  schedulePayment(payment: Payment): void {
    if (payment.status === 0)
      this.service.schedulePayment(payment.id).subscribe({
        next: () => this.getPayments(),
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  makePayment(payment: Payment): void {
    if (payment.status === 1)
      this.service.makePayment(payment.id).subscribe({
        next: () => this.getPayments(),
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  deletePayment(payment: Payment): void {
    if (payment.status !== 2)
      this.service.removePayment(payment.id).subscribe({
        next: () => this.getPayments(),
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  setColorRow(status: number): string {
    return StatusRow[status];
  }
}
