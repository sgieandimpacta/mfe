import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { PaymentStatus } from 'src/app/shared/enums/status-payments.enum';
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
    const payments = this.service.getPayments();
    payments.pipe().subscribe((payments) => {
      this.payments = payments;
    });
  }
}
