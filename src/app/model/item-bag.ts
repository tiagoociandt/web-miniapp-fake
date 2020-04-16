import { Sku } from './product';
import { Option } from './product-variant';

export class ItemBag {
    product: ProductShop;
    quantity: number;

    get totalValue(): number {
        return this.product.sku.price * this.quantity;
    }
}

export interface ProductShop {
    name: string;
    sku: Sku;
  }
