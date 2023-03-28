import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './components/payments/payment.component';
import { CreatePaymentComponent } from './components/payments/create/create-payment.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    children: [
      {
        path: 'payments',
        component: PaymentComponent,
        children: [
          {
            path: 'create',
            component: CreatePaymentComponent,
          },
          // {
          //   path: '',
          //   component: ListPaymentComponent,
          // },
          // {
          //   path: 'edit-payment',
          //   component: EditPaymentComponent,
          // },
          // {
          //   path: 'show-payment',
          //   component: ShowPaymentComponent,
          // },
        ],
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
