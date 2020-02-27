import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ScannerCodeComponent } from './scanner-code/scanner-code.component';
import { MiniappComponent } from './miniapp/miniapp.component';


const routes: Routes = [
  { path: 'miniapps', component: MiniappComponent },
  { path: 'scannerCode', component: ScannerCodeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
