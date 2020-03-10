import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CieloPay } from '../gateway/cielo-pay';
import { Subject } from 'rxjs';
import { PaymentFlowModel } from '../model/payment-flow-model';

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
    this.cieloPay.willSetup.subscribe(
    value => {
      if (value) {
        this.result = `ok: ${JSON.stringify(value)}`;
      } else {
        this.result = 'null';
      }
    },
    error => this.result = 'error'
    );
    this.cieloPay.willStartAuth.subscribe((value) => {
      const json = JSON.stringify(value);
      this.result = `ok: ${json}`;
    });
    this.cieloPay.onPaymentFlowSuccess.subscribe(value => {
      this.result = value;
    });
  }

  async goToSetup() {
    await this.cieloPay.askMeSetup();
    // this.cieloPay.willSetup.unsubscribe();
    // this.router.navigate(['/setup']);
  }

  goToAuthentication() {
    this.cieloPay.askMeAuth();
    // this.router.navigate(['/authentication']);
  }

  goToPaymentFlow() {
    const payment = new PaymentFlowModel();
    payment.amount = 2.2;
    this.cieloPay.startPaymentsFlow(payment);
  }

  goToLoading() {

  }

  goToScannerCode() {

  }

  closeMiniApp() {
    this.cieloPay.closeMiniApp();
  }
}
