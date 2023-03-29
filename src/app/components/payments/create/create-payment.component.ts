import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
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
    private bsLocaleService: BsLocaleService
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
    console.log(this.paymentForm.value);
  }
}
