import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CieloPay } from '../gateway/cielo-pay';
import { Subject } from 'rxjs';
import { PaymentFlowModel } from '../model/payment-flow-model';
import { AuthenticationModel } from '../model/authentication-model';
import { SetupModel } from '../model/setup-model';

@Component({
  selector: 'app-miniapp',
  templateUrl: './miniapp.component.html',
  styleUrls: ['./miniapp.component.css']
})
export class MiniappComponent implements OnInit {

  result = '';

  constructor(private cieloPay: CieloPay,
              private router: Router) { }

  ngOnInit(): void {
    this.startInit();
  }

  startInit() {
    this.cieloPay.gateway.willSetup = (result: string) => {
      if (result) {
        this.cieloPay.setup = JSON.parse(result);
      }
    };
    this.cieloPay.gateway.willStartAuth = (result: string) => {
      if (result) {
        this.cieloPay.currentAuthentication = JSON.parse(result);
      }
    };
    this.cieloPay.gateway.askMeSetup();
    this.cieloPay.gateway.askMeAuth();
  }

  goToSetup() {
    this.router.navigate(['/setup']);
  }

  goToAuthentication() {
    this.router.navigate(['/authentication']);
  }

  goToPaymentFlow() {
    this.router.navigate(['/payment']);
  }

  goToLoading() {

  }

  goToScannerCode() {

  }

  closeMiniApp() {
    this.cieloPay.gateway.closeMiniApp();
  }

  refundMiniApp() {
    this.router.navigate(['/refund']);
  }
}
