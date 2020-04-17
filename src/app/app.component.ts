import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationModel } from './model/authentication-model';
import { SetupModel } from './model/setup-model';
import { CieloPay } from './gateway/cielo-pay';
import { ShopBagService } from './services/shop-bag.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Web Mini app Fake';
  guest: AuthenticationModel = null;
  setup: SetupModel = null;
  productCount = 0;
  productPriceTotal = 0;

  constructor(private ngZone: NgZone,
              private router: Router,
              private cieloPay: CieloPay,
              private shopBag: ShopBagService) {
    this.startInit();
    this.guest = cieloPay.currentAuthentication;
    this.setup = cieloPay.setup;
    this.shopBag.totalItemBagSubscribe.subscribe(
      (value) => this.updateCart(value),
      (error) => { console.log(error); },
      () => { console.log('completion'); });
  }

  async updateCart(value: any) {
    this.ngZone.run(() => {
      this.productCount = value;
      this.productPriceTotal = this.shopBag.sumBag();
    });
  }

  ngOnInit(): void {
    this.router.navigate(['/miniapps']);
  }

  startInit() {
    this.cieloPay.gateway.willSetup = (result: string) => {
      if (result) {
        console.log(result);
        this.cieloPay.setup = JSON.parse(result);
      }
    };
    this.cieloPay.gateway.willStartAuth = (result: string) => {
      if (result) {
        console.log(result);
        this.cieloPay.currentAuthentication = JSON.parse(result);
      }
    };
    this.cieloPay.gateway.askMeSetup();
    this.cieloPay.gateway.askMeAuth();
  }

  close() {
    this.shopBag.totalItemBagSubscribe.unsubscribe();
    this.cieloPay.gateway.closeMiniApp();
  }

  goToCheckout() {
    this.router.navigate(['/payment']);
  }
}
