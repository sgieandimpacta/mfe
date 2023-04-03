import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePaymentComponent } from './components/payments/create/create-payment.component';
import { EditPaymentComponent } from './components/payments/edit/edit-payment.component';
import { ListPaymentComponent } from './components/payments/list/list-payment.component';
import { PaymentComponent } from './components/payments/payment.component';
import { DetailPaymentComponent } from './components/payments/detail/detail-payment.component';
registerLocaleData(ptBr);

const components = [
  PaymentComponent,
  CreatePaymentComponent,
  ListPaymentComponent,
  EditPaymentComponent,
  DetailPaymentComponent,
];

@NgModule({
  declarations: [AppComponent, components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
