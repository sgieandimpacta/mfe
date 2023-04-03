import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './components/payments/payment.component';
import { CreatePaymentComponent } from './components/payments/create/create-payment.component';
import { ListPaymentComponent } from './components/payments/list/list-payment.component';
import { EditPaymentComponent } from './components/payments/edit/edit-payment.component';

const routes: Routes = [
  {
    path: '',
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
        component: ListPaymentComponent,
        // component: ShowPaymentComponent,
      },
    ],
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
