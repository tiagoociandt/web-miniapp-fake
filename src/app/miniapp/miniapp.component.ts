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

  constructor(private router: Router,
              private cieloPay: CieloPay) { }

  ngOnInit(): void {
    this.startInit();
  }

  startInit() {
    this.cieloPay.setupSubscriber.subscribe((result) => {
      AuthenticationModel.setup = result;
      this.cieloPay.setupSubscriber.unsubscribe();
    });
    this.cieloPay.gateway.willStartAuth = (result: string) => {
      const auth: AuthenticationModel = JSON.parse(result);
      if (auth) {
        AuthenticationModel.current = auth;
      }
    };
    this.cieloPay.gateway.askMeSetup();
    this.cieloPay.gateway.askMeAuth();
  }

  goToSetup() {
    this.startInit();
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
