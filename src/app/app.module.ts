import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './components/companies/company.component';
import { CreateCompanyComponent } from './components/companies/create/create-company.component';
import { ListCompanyComponent } from './components/companies/list/list-company.component';
import { CreatePaymentComponent } from './components/payments/create/create-payment.component';
import { DetailPaymentComponent } from './components/payments/detail/detail-payment.component';
import { EditPaymentComponent } from './components/payments/edit/edit-payment.component';
import { ListPaymentComponent } from './components/payments/list/list-payment.component';
import { PaymentComponent } from './components/payments/payment.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
registerLocaleData(ptBr);

const components = [
  PaymentComponent,
  CreatePaymentComponent,
  ListPaymentComponent,
  EditPaymentComponent,
  DetailPaymentComponent,
  CompanyComponent,
  CreateCompanyComponent,
  ListCompanyComponent,
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
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
