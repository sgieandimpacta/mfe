import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/Services/payment.service';
import { Payment } from 'src/app/shared/models/Payment';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss'],
})
export class ListPaymentComponent implements OnInit {
  title = 'mfe';
  payments: Payment[] = [];
  constructor(private service: PaymentService) {}

  ngOnInit(): void {
    const payments = this.service.getPayments();
    payments.pipe().subscribe((payments) => {
      this.payments = payments;
    });
  }
}
