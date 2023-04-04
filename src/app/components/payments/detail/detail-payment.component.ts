import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Company } from 'src/app/shared/models/Company';
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
  companies: Company[] = [];

  constructor(
    private fb: FormBuilder,
    private service: PaymentService,
    private activatedRoute: ActivatedRoute,
    private serviceCompany: CompanyService
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
      .subscribe((result) => {
        this.payment = result.payment;
        this.createForm(result.payment);
        this.companies = result.companies;
      });
  }

  private createForm(payment: Payment) {
    this.paymentForm = this.fb.group({
      empresa: [
        {
          value: payment.empresa,
          disabled: true,
        },
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
      codigoBoleto: [{ value: payment.codigo_boleto, disabled: true }],
      codigoBarras: [{ value: payment.codigo_barras, disabled: true }],
      chavePIX: [{ value: payment.chave_pix, disabled: true }],
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

  copyToClipboard(value: string) {
    navigator.clipboard
      .writeText(value)
      .then()
      .catch((e) => console.log(e));
  }
}
