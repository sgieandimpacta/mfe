import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { PaymentService } from 'src/app/Services/payment.service';
import { Payment } from 'src/app/shared/models/Payment';
import { toISOStringTimezoneOffset } from 'src/app/shared/utils/date-helper';
@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss'],
})
export class CreatePaymentComponent implements OnInit {
  paymentForm!: FormGroup;

  OPTIONS = [
    'FUNCIONÁRIOS',
    'ULTRAMEGA',
    'CONTABILIDADE',
    'INOVAFARMA',
    'META',
    'NOVA DISTRI',
    'STERICYCLE',
    'CIMED',
    'SANTA CRUZ',
    'ORGAFARMA',
    'PANPHARMA',
    'PROFARMA',
  ];

  constructor(
    private fb: FormBuilder,
    private bsLocaleService: BsLocaleService,
    private service: PaymentService,
    private router: Router
  ) {
    defineLocale('pt-br', ptBrLocale);
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      empresa: new FormControl('', [Validators.required]),
      categoria: ['', Validators.required],
      tipoPagamento: ['', Validators.required],
      codigoBoleto: '',
      codigoBarras: '',
      chavePIX: '',
      dataPagamento: ['', Validators.required],
      recorrencia: ['', Validators.required],
      valor: new FormControl('', [Validators.required]),
    });
  }

  get valor() {
    return this.paymentForm.get('valor')!;
  }

  get empresa() {
    return this.paymentForm.get('empresa')!;
  }

  cadastrarPagamento(): void {
    if (this.paymentForm.valid) {
      const pagamento = this.castPayment();
      this.service
        .addPayment(pagamento)
        .pipe()
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

  castPayment(): Payment {
    return {
      data_pagamento: toISOStringTimezoneOffset(
        this.paymentForm.value.dataPagamento
      ),
      empresa: this.paymentForm.value.empresa,
      tipo: this.paymentForm.value.tipoPagamento,
      categoria: this.paymentForm.value.categoria,
      recorrencia: this.paymentForm.value.recorrencia,
      valor: Number(this.paymentForm.value.valor),
      codigo_boleto: this.paymentForm.value.codigoBoleto,
      codigo_barras: this.paymentForm.value.codigoBarras,
    };
  }
}
