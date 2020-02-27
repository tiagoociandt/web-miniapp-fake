import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerCodeComponent } from './scanner-code/scanner-code.component';
import { FormsModule } from '@angular/forms';
import { MiniappComponent } from './miniapp/miniapp.component';

@NgModule({
  declarations: [
    AppComponent,
    ScannerCodeComponent,
    MiniappComponent
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
