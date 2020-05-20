import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScannerCodeComponent } from './scanner-code/scanner-code.component';
import { MiniappComponent } from './miniapp/miniapp.component';
import { PaymentComponent } from './payment/payment.component';
import { LoadingComponent } from './loading/loading.component';
import { RefundComponent } from './refund/refund.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { LocationComponent } from './location/location.component';


const routes: Routes = [
  { path: 'miniapps', component: MiniappComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'scannerCode', component: ScannerCodeComponent },
  { path: 'refund', component: RefundComponent },
  { path: 'dialogs', component: DialogsComponent },
  { path: 'location', component: LocationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
