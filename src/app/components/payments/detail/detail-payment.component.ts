import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { conditionalValidator } from 'src/app/shared/directives/conditional-validators.directive';
import { PaymentForm } from 'src/app/shared/enums/form-payments.enum';
import { Payment } from 'src/app/shared/models/Payment';
import { defineObjectDateToDatePicker } from 'src/app/shared/utils/date-helper';

@Component({
  selector: 'app-detail-payment',
  templateUrl: './detail-payment.component.html',
  styleUrls: ['./detail-payment.component.scss'],
})
export class DetailPaymentComponent {
  paymentForm!: FormGroup;
  payment?: Payment;
  disableLoading = true;
  readonly FIELDS: string[] = ['chavePIX', 'codigoBoleto', 'codigoBarras'];
  readonly OPTIONS: string[] = [
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
    private service: PaymentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.service.getPayment(params['id']).subscribe((payment) => {
        this.payment = payment;
        this.createForm(payment);
        this.defineConditionalFieldsRequiredByPaymentForm();
      });
    });
  }

  private createForm(payment: Payment) {
    this.paymentForm = this.fb.group({
      empresa: [
        { value: payment.empresa, disabled: true },
        [Validators.required],
      ],
      categoria: [
        { value: payment.categoria, disabled: true },
        Validators.required,
      ],
      tipoPagamento: [
        { value: payment.tipo, disabled: true },
        Validators.required,
      ],
      codigoBoleto: [
        { value: payment.codigo_boleto, disabled: true },
        [this.fieldConditionallyRequiredValidator(PaymentForm.BOLETO)],
      ],
      codigoBarras: [
        { value: payment.codigo_barras, disabled: true },
        [this.fieldConditionallyRequiredValidator(PaymentForm.BOLETO)],
      ],
      chavePIX: [
        { value: payment.chave_pix, disabled: true },
        [this.fieldConditionallyRequiredValidator(PaymentForm.PIX)],
      ],
      dataVencimento: [
        {
          value: defineObjectDateToDatePicker(payment.data_vencimento),
          disabled: true,
        },
        Validators.required,
      ],
      recorrencia: [
        { value: payment.recorrencia, disabled: true },
        Validators.required,
      ],
      valor: [{ value: payment.valor, disabled: true }, [Validators.required]],
    });
  }

  get valor() {
    return this.paymentForm.get('valor')!;
  }

  get empresa() {
    return this.paymentForm.get('empresa')!;
  }

  private fieldConditionallyRequiredValidator(expectedValue: string) {
    return conditionalValidator(
      () => this.validatePaymentTypeSelected(expectedValue),
      Validators.required,
      'requiredConditionalError'
    );
  }

  private validatePaymentTypeSelected(expectedValue: string): boolean {
    return this.paymentForm.get('tipoPagamento')?.value === expectedValue;
  }

  private defineConditionalFieldsRequiredByPaymentForm(): void {
    this.paymentForm.get('tipoPagamento')?.valueChanges.subscribe(() => {
      this.FIELDS.forEach((field) =>
        this.paymentForm.get(field)?.updateValueAndValidity()
      );
    });
  }
}
