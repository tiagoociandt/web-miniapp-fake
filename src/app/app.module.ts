import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerCodeComponent } from './scanner-code/scanner-code.component';
import { FormsModule } from '@angular/forms';
import { MiniappComponent } from './miniapp/miniapp.component';
import { PaymentComponent } from './payment/payment.component';
import { LoadingComponent } from './loading/loading.component';
import { SetupComponent } from './setup/setup.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CieloPay } from './gateway/cielo-pay';

@NgModule({
  declarations: [
    AppComponent,
    ScannerCodeComponent,
    MiniappComponent,
    PaymentComponent,
    LoadingComponent,
    SetupComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
