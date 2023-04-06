import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import {
  TipoContato,
  TipoContatoDescricao,
} from 'src/app/shared/enums/tipo-contato';
import { CompanyRequest } from 'src/app/shared/models/Company';
import { stringByOnlyNumbers } from 'src/app/shared/utils/format-helper';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss'],
})
export class CreateCompanyComponent {
  maskByPhoneType = '(00)00000-0000';
  companyForm!: FormGroup;
  disableLoading = true;

  constructor(
    private fb: FormBuilder,
    private service: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.chanveMaskInputContact();
  }

  private createForm(): void {
    this.companyForm = this.fb.group({
      documento: ['', [Validators.required]],
      descricao: ['', Validators.required],
      categoria: ['medicamentos', Validators.required],
      descricaoResumida: ['', Validators.required],
      tipoContato: ['celular', Validators.required],
      contato: ['', Validators.required],
      representante: ['', Validators.required],
    });
  }

  registerCompany(): void {
    if (this.companyForm.valid) {
      this.disableLoading = false;
      const company = this.castCompany();
      this.service
        .addCompany(company)
        .pipe()
        .subscribe(() => {
          this.disableLoading = true;
          this.router.navigate(['/companies']);
        });
    }
  }

  chanveMaskInputContact(): void {
    this.companyForm
      .get('tipoContato')
      ?.valueChanges.subscribe((selectedValue) => {
        this.maskByPhoneType =
          selectedValue === TipoContatoDescricao.CELULAR
            ? '(00)00000-0000'
            : '(00)0000-0000';
      });
  }

  private castCompany(): CompanyRequest {
    return {
      documento: stringByOnlyNumbers(this.companyForm.value.documento),
      descricao: this.companyForm.value.descricao,
      descricao_resumida: this.companyForm.value.descricaoResumida,
      categoria: this.companyForm.value.categoria,
      tipo_contato: TipoContato[this.companyForm.value.tipoContato],
      contato: this.companyForm.value.contato,
      representante: this.companyForm.value.representante,
    };
  }
}
