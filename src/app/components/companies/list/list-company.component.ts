import { Component } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { TipoContatoDescricao } from 'src/app/shared/enums/tipo-contato';
import { Company } from 'src/app/shared/models/Company';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss'],
})
export class ListCompanyComponent {
  companies: Company[] = [];
  constructor(private service: CompanyService) {}
  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.service
      .getCompanies()
      .pipe()
      .subscribe((companies) => {
        this.companies = companies;
      });
  }

  getmaskByPhoneType(tipoContato: string): string {
    return tipoContato === TipoContatoDescricao.CELULAR
      ? '(00) 00000-0000'
      : '(00) 0000-0000';
  }
}
