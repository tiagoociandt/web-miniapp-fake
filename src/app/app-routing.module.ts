import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ScannerCodeComponent } from './scanner-code/scanner-code.component';
import { MiniappComponent } from './miniapp/miniapp.component';
import { PaymentComponent } from './payment/payment.component';
import { LoadingComponent } from './loading/loading.component';
import { SetupComponent } from './setup/setup.component';
import { AuthenticationComponent } from './authentication/authentication.component';


const routes: Routes = [
  { path: 'miniapps', component: MiniappComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'scannerCode', component: ScannerCodeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
