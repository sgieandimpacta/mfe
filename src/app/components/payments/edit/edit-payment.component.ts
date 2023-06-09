import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap, take } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PaymentService } from 'src/app/services/payment.service';
import { conditionalValidator } from 'src/app/shared/directives/conditional-validators.directive';
import { PaymentForm } from 'src/app/shared/enums/form-payments.enum';
import { NotificationType } from 'src/app/shared/enums/notification-type.enum';
import { Company } from 'src/app/shared/models/Company';
import { Payment, PaymentRequest } from 'src/app/shared/models/Payment';
import {
  defineObjectDateToDatePicker,
  getDateFormatByObject,
} from 'src/app/shared/utils/date-helper';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss'],
})
export class EditPaymentComponent {
  paymentForm!: FormGroup;
  payment?: Payment;
  disableLoading = true;
  readonly FIELDS: string[] = ['chavePIX', 'codigoBoleto', 'codigoBarras'];

  companies: Company[] = [];

  constructor(
    private fb: FormBuilder,
    private service: PaymentService,
    private serviceCompany: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          return forkJoin({
            payment: this.service.getPayment(params['id']),
            companies: this.serviceCompany.getCompanies(),
          });
        })
      )
      .subscribe({
        next: (result) => {
          this.payment = result.payment;
          this.companies = result.companies;
          this.createForm(result.payment);
          this.defineConditionalFieldsRequiredByPaymentForm();
        },
        error: (e) => {
          this.notificationService.notify(
            'Erro ao carregar o pagamento',
            NotificationType.ERROR
          );
          console.info(e);
        },
        complete: () => console.info('complete'),
      });
  }

  private createForm(payment: Payment) {
    this.paymentForm = this.fb.group({
      empresa: [payment.empresa, [Validators.required]],
      categoria: [payment.categoria, Validators.required],
      tipoPagamento: [payment.tipo, Validators.required],
      codigoBoleto: [
        payment.codigo_boleto,
        [this.fieldConditionallyRequiredValidator(PaymentForm.BOLETO)],
      ],
      codigoBarras: [
        payment.codigo_barras,
        [this.fieldConditionallyRequiredValidator(PaymentForm.BOLETO)],
      ],
      chavePIX: [
        payment.chave_pix,
        [this.fieldConditionallyRequiredValidator(PaymentForm.PIX)],
      ],
      dataVencimento: [
        defineObjectDateToDatePicker(payment.data_vencimento),
        Validators.required,
      ],
      recorrencia: [payment.recorrencia, Validators.required],
      valor: [payment.valor, [Validators.required]],
    });
  }

  get valor() {
    return this.paymentForm.get('valor')!;
  }

  get empresa() {
    return this.paymentForm.get('empresa')!;
  }

  updatePayment(id: string): void {
    if (this.paymentForm.valid) {
      this.disableLoading = false;
      const payment = this.castPayment();
      this.service
        .updatePayment(id, payment)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.disableLoading = true;
            this.notificationService.notify(
              'Pagamento atualizado com sucesso',
              NotificationType.SUCCESS
            );
            this.router.navigateByUrl('/payments');
          },
          error: (e) => {
            this.notificationService.notify(
              'Erro ao atualizar o pagamento',
              NotificationType.ERROR
            );
            console.info(e);
          },
          complete: () => console.info('complete'),
        });
    }
  }

  private castPayment(): PaymentRequest {
    return {
      data_vencimento: getDateFormatByObject(
        this.paymentForm.value.dataVencimento
      ),
      empresa: this.paymentForm.value.empresa,
      tipo: this.paymentForm.value.tipoPagamento,
      categoria: this.paymentForm.value.categoria,
      recorrencia: this.paymentForm.value.recorrencia,
      valor: Number(this.paymentForm.value.valor),
      codigo_boleto: this.paymentForm.value.codigoBoleto,
      codigo_barras: this.paymentForm.value.codigoBarras,
      chave_pix: this.paymentForm.value.chavePIX,
    };
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
