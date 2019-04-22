import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiProvider } from './api.service';
import { ItemDescription } from '../models/item-description';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any = {};
  private priceAfterDiscount: number = 0;
  private totalPrice: number = 0;
  private totalItems: number = 0;
  private storeApiPath: string = environment.storeApiPath;
  private voucherApplied: boolean = false;
  private currentVoucher: string = '';

  /* 更新优惠后的价格 */
  private updateDiscountedPrice() {}

  constructor(private apiProvider: ApiProvider) { }

  public addItemToCart(item: ItemDescription) {
    const productId: string = item.id;

    if (this.cartItems[productId]) {
      if (item.is_orderable) {
        this.cartItems[productId].sku = this.cartItems[productId].sku - 1;
        this.cartItems[productId].count = this.cartItems[productId].count + 1;
        this.totalPrice = this.totalPrice + item.price;
        this.updateDiscountedPrice();
        this.totalItems += 1;
      }
    } else {
      if (item.is_orderable) {
        this.cartItems[productId] = Object.assign({}, item);
        this.cartItems[productId].max_items = this.cartItems[productId].sku;
        this.cartItems[productId].sku = this.cartItems[productId].sku - 1;
        this.cartItems[productId].count = 1;
        this.totalPrice = this.totalPrice + item.price;
        this.updateDiscountedPrice();
        this.totalItems += 1;
      }
      
    }
  }

  public getCartItems(): any {
    return this.cartItems;
  }

  public getTotalPrice(): number {
    return Number(this.totalPrice.toFixed(2));
  }

  public getPriceAfterDiscount(): number {
    return Number(this.priceAfterDiscount.toFixed(2));
  }

  
}
