import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { PaymentForm } from 'src/app/shared/enums/form-payments.enum';
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
  paymentForm = PaymentForm;

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

  copyToClipboard(payment: Payment) {
    const key =
      payment.tipo === PaymentForm.BOLETO
        ? payment.codigo_barras
        : payment.chave_pix;
    navigator.clipboard
      .writeText(key)
      .then()
      .catch((e) => console.log(e));
  }

  setColorRow(status: number): string {
    return StatusRow[status];
  }
}
