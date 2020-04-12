import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Product } from '../model/product';
import { Subject } from 'rxjs';
import { ProductVariant } from '../model/product-variant';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private common: CommonService) { }

  public getProductCollection(): Subject<Product[]> {
    const subject = new Subject<Product[]>();
    this.common
    .get<Product[]>(StoreRoute.product)
    .subscribe((data) => {
      subject.next(data);
    });
    return subject;
  }

  public getProductVariant(): Subject<ProductVariant[]> {
    const subject = new Subject<ProductVariant[]>();
    this.common
    .get<ProductVariant[]>(StoreRoute.variant)
    .subscribe((data) => {
      subject.next(data);
    });
    return subject;
  }
}

enum StoreRoute {
  product = '/store/product',
  variant = '/store/product/variant'
}
