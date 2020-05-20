import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Sku } from '../model/product';
import { ProductVariant, Option } from '../model/product-variant';
import { ShopBagService } from '../services/shop-bag.service';
import { ItemBag, ProductShop } from '../model/item-bag';
import { CieloPay } from '../gateway/cielo-pay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miniapp',
  templateUrl: './miniapp.component.html',
  styleUrls: ['./miniapp.component.css']
})
export class MiniappComponent implements OnInit {
  isLoading = false;
  products: ProductShop[] = [];
  variantOptions: ProductVariant[] = [];

  constructor(private cieloPay: CieloPay,
              private router: Router,
              private storeService: StoreService,
              private shopBag: ShopBagService) {
    this.cieloPay.gateway.hideLoadingModal();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  goToLoading() {

  }

  goToScannerCode() {

  }

  refundMiniApp() {
    this.router.navigate(['/refund']);
  }

  loadProducts() {
    this.isLoading = true;
    this.storeService.getProductVariant()
    .subscribe((variantOptionsData) => {
      this.variantOptions = variantOptionsData;
      this.storeService.getProductCollection()
      .subscribe((productData) => {
        productData.forEach(product => {
          product.sku.forEach(sku => {
            const item: ProductShop = {
              name: product.name,
              sku
            };
            this.products.push(item);
          });
        });
        this.isLoading = false;
      });
    });
  }

  getVariantName(variantOptionsID: string): VariantKeyValue {
    const value: VariantKeyValue = {
      name: '',
      value: ''
    };
    if (!variantOptionsID) {
      return value;
    }
    const variantFound = this.variantOptions.find(variant => {
      const optionFound = variant.options.find(options => {
        return options.variantOptionsID === variantOptionsID;
      });
      if (optionFound) {
        value.value = optionFound.value;
        return true;
      }
      return false;
    });
    if (variantFound) {
      value.name = variantFound.name;
    }
    return value;
  }

  addToCart(product: ProductShop) {
    const newItemBag = new ItemBag();
    newItemBag.product = product;
    newItemBag.quantity = 1;
    this.shopBag.addToBag(newItemBag);
  }
  checkItemOnBag(skuID: string): boolean {
    return this.shopBag.isItemBag(skuID);
  }
  removeFromCart(sku: Sku) {
    this.shopBag.removeFromBag(sku.skuID);
  }
  goToDialogs() {
    this.router.navigate(['/dialogs']);
  }
  goToLocation() {
    this.router.navigate(['/location']);
  }
}

export interface VariantKeyValue {
  name: string;
  value: string;
}