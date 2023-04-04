import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { PaymentService } from 'src/app/services/payment.service';
import { conditionalValidator } from 'src/app/shared/directives/conditional-validators.directive';
import { PaymentForm } from 'src/app/shared/enums/form-payments.enum';
import { Company } from 'src/app/shared/models/Company';
import { PaymentRequest } from 'src/app/shared/models/Payment';
import { getDateFormatByObject } from 'src/app/shared/utils/date-helper';
@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss'],
})
export class CreatePaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  disableLoading = true;

  companies: Company[] = [];

  constructor(
    private fb: FormBuilder,
    private service: PaymentService,
    private serviceCompany: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceCompany
      .getCompanies()
      .pipe()
      .subscribe((companies) => {
        this.companies = companies;
        this.createForm();
        this.defineConditionalFieldsRequiredByPaymentForm();
      });
  }

  private createForm() {
    this.paymentForm = this.fb.group({
      empresa: ['', [Validators.required]],
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
      valor: ['', [Validators.required]],
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
    this.paymentForm.get('tipoPagamento')?.valueChanges.subscribe(() => {
      this.paymentForm.get('chavePIX')?.updateValueAndValidity();
      this.paymentForm.get('codigoBoleto')?.updateValueAndValidity();
      this.paymentForm.get('codigoBarras')?.updateValueAndValidity();
    });
  }
}
