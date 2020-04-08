import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CieloPay } from '../gateway/cielo-pay';
import { Subject } from 'rxjs';
import { PaymentFlowModel } from '../model/payment-flow-model';
import { AuthenticationModel } from '../model/authentication-model';

@Component({
  selector: 'app-miniapp',
  templateUrl: './miniapp.component.html',
  styleUrls: ['./miniapp.component.css']
})
export class MiniappComponent implements OnInit {
  result = '';

  constructor(private router: Router,
              private gateway: CieloPay) { }

  ngOnInit(): void {
    this.gateway.willSetup = (result: string) => {
      const setup = JSON.parse(result);
    };
    this.gateway.willStartAuth = (result: string) => {
      const auth: AuthenticationModel = JSON.parse(result);
      if (auth) {
        AuthenticationModel.current = auth;
      }
    };
    this.gateway.askMeSetup();
    this.gateway.askMeAuth();
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
    this.gateway.closeMiniApp();
  }

  refundMiniApp() {
    this.router.navigate(['/refund']);
  }
}
