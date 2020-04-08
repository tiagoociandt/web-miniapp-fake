import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerCodeComponent } from './scanner-code/scanner-code.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MiniappComponent } from './miniapp/miniapp.component';
import { PaymentComponent } from './payment/payment.component';
import { LoadingComponent } from './loading/loading.component';
import { SetupComponent } from './setup/setup.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RefundComponent } from './refund/refund.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    ScannerCodeComponent,
    MiniappComponent,
    PaymentComponent,
    LoadingComponent,
    SetupComponent,
    AuthenticationComponent,
    RefundComponent
  ],
  exports: [
    MatFormFieldModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
