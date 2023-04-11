import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/companies/company.component';
import { CreateCompanyComponent } from './components/companies/create/create-company.component';
import { ListCompanyComponent } from './components/companies/list/list-company.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreatePaymentComponent } from './components/payments/create/create-payment.component';
import { DetailPaymentComponent } from './components/payments/detail/detail-payment.component';
import { EditPaymentComponent } from './components/payments/edit/edit-payment.component';
import { ListPaymentComponent } from './components/payments/list/list-payment.component';
import { PaymentComponent } from './components/payments/payment.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'payments',
        component: PaymentComponent,
        children: [
          {
            path: '',
            component: ListPaymentComponent,
          },
          {
            path: 'create',
            component: CreatePaymentComponent,
          },
          {
            path: 'edit',
            component: EditPaymentComponent,
          },
          {
            path: 'show',
            component: DetailPaymentComponent,
          },
        ],
      },
      {
        path: 'companies',
        component: CompanyComponent,
        children: [
          {
            path: '',
            component: ListCompanyComponent,
          },
          {
            path: 'create',
            component: CreateCompanyComponent,
          },
          {
            path: 'edit',
            component: EditPaymentComponent,
          },
          {
            path: 'show',
            component: DetailPaymentComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
