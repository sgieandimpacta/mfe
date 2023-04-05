import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { TipoContato } from 'src/app/shared/enums/tipo-contato';
import { CompanyRequest } from 'src/app/shared/models/Company';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss'],
})
export class CreateCompanyComponent {
  companyForm!: FormGroup;
  disableLoading = true;

  constructor(
    private fb: FormBuilder,
    private service: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.companyForm = this.fb.group({
      documento: ['', [Validators.required]],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      descricaoResumida: ['', Validators.required],
      tipoContato: ['', Validators.required],
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

  private castCompany(): CompanyRequest {
    return {
      documento: this.companyForm.value.documento,
      descricao: this.companyForm.value.descricao,
      descricao_resumida: this.companyForm.value.descricaoResumida,
      categoria: this.companyForm.value.categoria,
      tipo_contato: TipoContato[this.companyForm.value.tipoContato],
      contato: this.companyForm.value.contato,
      representante: this.companyForm.value.representante,
    };
  }
}
