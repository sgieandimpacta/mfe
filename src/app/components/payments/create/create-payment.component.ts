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
import { PaymentService } from 'src/app/services/payment.service';
import { conditionalValidator } from 'src/app/shared/directives/conditional-validators.directive';
import { PaymentForm } from 'src/app/shared/enums/form-payments.enum';
import { PaymentRequest } from 'src/app/shared/models/Payment';
import { getDateTimeFormat } from 'src/app/shared/utils/date-helper';
@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss'],
})
export class CreatePaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  disableLoading = true;

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
      codigoBoleto: [
        '',
        [this.fieldConditionallyRequiredValidator(PaymentForm.BOLETO)],
      ],
      codigoBarras: [
        '',
        [this.fieldConditionallyRequiredValidator(PaymentForm.BOLETO)],
      ],
      chavePIX: [
        '',
        [this.fieldConditionallyRequiredValidator(PaymentForm.PIX)],
      ],
      dataVencimento: ['', Validators.required],
      recorrencia: ['', Validators.required],
      valor: new FormControl('', [Validators.required]),
    });

    this.defineConditionalFieldsRequiredByPaymentForm();
  }

  get valor() {
    return this.paymentForm.get('valor')!;
  }

  get empresa() {
    return this.paymentForm.get('empresa')!;
  }

  cadastrarPagamento(): void {
    if (this.paymentForm.valid) {
      this.disableLoading = false;
      const pagamento = this.castPayment();
      this.service
        .addPayment(pagamento)
        .pipe()
        .subscribe(() => {
          this.disableLoading = true;
          this.router.navigate(['/']);
        });
    }
  }

  private castPayment(): PaymentRequest {
    return {
      data_vencimento: getDateTimeFormat(this.paymentForm.value.dataVencimento),
      empresa: this.paymentForm.value.empresa,
      tipo: this.paymentForm.value.tipoPagamento,
      categoria: this.paymentForm.value.categoria,
      recorrencia: this.paymentForm.value.recorrencia,
      valor: Number(this.paymentForm.value.valor),
      codigo_boleto: this.paymentForm.value.codigoBoleto,
      codigo_barras: this.paymentForm.value.codigoBarras,
    };
  }

  private fieldConditionallyRequiredValidator(valueExpected: string) {
    return conditionalValidator(
      () => this.validaTipoPagamentoSelecionado(valueExpected),
      Validators.required,
      'requiredConditionalError'
    );
  }

  private validaTipoPagamentoSelecionado(expectedValue: string): boolean {
    return this.paymentForm.get('tipoPagamento')?.value === expectedValue;
  }

  private defineConditionalFieldsRequiredByPaymentForm(): void {
    this.paymentForm.get('tipoPagamento')?.valueChanges.subscribe((value) => {
      this.paymentForm.get('chavePIX')?.updateValueAndValidity();
      this.paymentForm.get('codigoBoleto')?.updateValueAndValidity();
      this.paymentForm.get('codigoBarras')?.updateValueAndValidity();
    });
  }
}
