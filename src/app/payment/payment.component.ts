import { Component, OnInit } from '@angular/core';
import { CieloPay } from '../gateway/cielo-pay';
import { ShopBagService } from '../services/shop-bag.service';
import { ItemBag } from '../model/item-bag';
import { Router } from '@angular/router';
import { PaymentFlowModel } from '../model/payment-flow-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RandomUtils } from '../utils/random-utils';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  isLoading = false;
  items: ItemBag[] = [];
  displayedColumns: string[] = ['productName', 'quantity', 'totalValue'];
  totalCart = 0;
  installments = 1;
  customEC = false;
  private possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

  constructor(private bagShopService: ShopBagService,
              private cieloPay: CieloPay,
              private snack: MatSnackBar,
              private router: Router,
              private randomUtils: RandomUtils) {
    this.cieloPay.gateway.onPaymentsFlowSuccess = (result: string) => this.paymentFlowSuccess(result);
    this.cieloPay.gateway.onPaymentsFlowError = (result: string) => this.paymentFlowError(result);
    this.cieloPay.gateway.onPaymentsFlowCanceled = (result: string) => this.paymentFlowCancel(result);
  }

  ngOnInit(): void {
    this.loadBag();
  }

  loadBag() {
    this.items = this.bagShopService.ShopBag;
    this.totalCart = this.bagShopService.sumBag();
  }

  goBack() {
    this.router.navigate(['/miniapps']);
  }

  paymentFlowSuccess(result: string) {
    console.log(result);
    this.snack.open(`👍 success: ${result}`, '', {
      duration: 2000
    });
  }
  paymentFlowError(result: string) {
    console.log(result);
    this.snack.open(`👎 error: ${result}`, '', {
      duration: 2000
    });
  }
  paymentFlowCancel(result: string) {
    console.log(result);
    this.snack.open(`👎 canceled: ${result}`, '', {
      duration: 2000
    });
  }

  processPayment() {
    const paymentFlow: PaymentFlowModel = {
      value: this.totalCart,
      installments: 1
    };
    if (this.customEC) {
      paymentFlow.merchantNumber = this.randomUtils.makeRandom(11, this.possible);
    }
    this.cieloPay.gateway.startPaymentsFlow(paymentFlow);
  }
}
