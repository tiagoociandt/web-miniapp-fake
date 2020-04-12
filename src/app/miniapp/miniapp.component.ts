import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CieloPay } from '../gateway/cielo-pay';
import { StoreService } from '../services/store.service';
import { Product, Sku } from '../model/product';
import { ProductVariant } from '../model/product-variant';
import { ShopBagService } from '../services/shop-bag.service';
import { ItemBag } from '../model/item-bag';

@Component({
  selector: 'app-miniapp',
  templateUrl: './miniapp.component.html',
  styleUrls: ['./miniapp.component.css']
})
export class MiniappComponent implements OnInit {

  isLoading = false;
  products: Product[] = [];
  variantOptions: ProductVariant[] = [];

  constructor(private cieloPay: CieloPay,
              private router: Router,
              private storeService: StoreService,
              private shopBag: ShopBagService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.storeService.getProductVariant()
    .subscribe((variantOptionsData) => {
      this.variantOptions = variantOptionsData;
      this.storeService.getProductCollection()
      .subscribe((productData) => {
        this.products = productData;
        this.isLoading = false;
      });
    });
  }

  getVariantOption(id: string): ProductVariant {
    return this.variantOptions.find(search => search.options.find(option => option.variantOptionsID === id) !== undefined);
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
  addToCart(sku: Sku) {
    const newItemBag = new ItemBag();
    newItemBag.item = sku;
    newItemBag.quantity = 1;
    this.shopBag.addToBag(newItemBag);
  }
  checkItemOnBag(skuID: string): boolean {
    return this.shopBag.isItemBag(skuID);
  }
  removeFromCart(sku: Sku) {
    this.shopBag.removeFromBag(sku.skuID);
  }
}
