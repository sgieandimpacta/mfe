import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/shared/enums/color-type.enum';
import { TipoContato } from 'src/app/shared/enums/tipo-contato';
import { Company } from 'src/app/shared/models/Company';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss'],
})
export class ListCompanyComponent {
  companies: Company[] = [];

  constructor(
    private service: CompanyService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  private getCompanies(): void {
    this.service
      .getCompanies()
      .pipe()
      .subscribe((companies) => {
        this.companies = companies;
      });
  }

  getmaskByPhoneType(tipoContato: number): string {
    return tipoContato === TipoContato['celular']
      ? '(00) 00000-0000'
      : '(00) 0000-0000';
  }

  deleteCompany(company: Company): void {
    this.service.removeCompany(company.id).subscribe({
      next: () => {
        this.getCompanies();
        this.notificationService.notify(
          'Empresa removida com sucesso',
          NotificationType.SUCCESS
        );
      },
      error: (e) => {
        this.notificationService.notify(
          'Erro ao cadastrar empresa',
          NotificationType.ERROR
        );
      },
      complete: () => console.info('complete'),
    });
  }
}
