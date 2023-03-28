import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentComponent } from './components/payments/payment.component';
import { HttpClientModule } from '@angular/common/http';
import { CreatePaymentComponent } from './components/payments/create/create-payment.component';

@NgModule({
  declarations: [AppComponent, PaymentComponent, CreatePaymentComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
