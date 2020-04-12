import { Injectable } from '@angular/core';
import { Sku } from '../model/product';
import { Subscriber, Observable, Subscription, Subject } from 'rxjs';
import { ItemBag } from '../model/item-bag';

@Injectable({
  providedIn: 'root'
})
export class ShopBagService {
  private shopBagLocalStorageKeyName = 'shopBagKey';
  private bag: ItemBag[] = [];
  public totalItemBagSubscribe: Subject<number>;

  constructor() {
    this.totalItemBagSubscribe = new Subject<number>();
  }

  public addToBag(newItem: ItemBag) {
    this.bag.push(newItem);
    this.totalItemBagSubscribe.next(this.bag.length);
  }

  public removeFromBag(id: string) {
    const found = this.bag.find(f => f.item.skuID === id);
    if (found === undefined) {
      return;
    }
    const index = this.bag.indexOf(found);
    this.bag.splice(index, 1);
    this.totalItemBagSubscribe.next(this.bag.length);
  }

  public sumBag(): number {
    let total = 0.0;
    this.bag.forEach(itemBag => {
      total += (itemBag.item.price * itemBag.quantity);
    });
    return total;
  }

  public isItemBag(id: string): boolean {
    const found = this.bag.find(f => f.item.skuID === id);
    return found !== undefined;
  }

  private saveBag() {
    const json = JSON.stringify(this.bag);
    window.localStorage.setItem(this.shopBagLocalStorageKeyName, json);
  }
  private getBag() {
    try {
      const json = window.localStorage.getItem(this.shopBagLocalStorageKeyName);
      const savedBag: ItemBag[] = JSON.parse(json);
      this.bag = savedBag;
    } catch {
      this.bag = [];
    }
  }
}
