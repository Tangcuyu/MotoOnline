import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiProvider } from './api.service';
import { ItemDescription } from '../models/ItemDescription';
import { VoucherCodeResponse } from '../models/voucher-code-response';
import { BuyParams } from '../models/buy-params';
import { AppConst } from '../models/model';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any = {
    totalPrice: 0,   // 购物车总价
    totalItems: 0,  // 购物车中订单项总数
  };
  private cartItems: any = {};
  private priceAfterDiscount = 0;
  private totalPrice = 0; // 单个订单项价格
  private totalItems = 0; // 单个订单项数量
  private storeApiPath: string = environment.storeApiPath;
  private voucherApplied = false;
  private currentVoucher = '';

  public change: EventEmitter<number>;

  /* 返回购物车中订单项的引用 */
  private getCartItemsReference(): Array<number> {
    const refs = [];
    Object.keys(this.cartItems).map((key) => {
      let i = 1;
      while (i <= this.cartItems[key].count) {
        refs.push(Number(key));
        i = i + 1;
      }
    });
    return refs;
  }

  private sendBuyRequestToServer(buyParam: BuyParams): Observable<any> {
    const url: string = this.storeApiPath + AppConst.STORE_API_PATHS.buyItems;
    return this.apiProvider.httpPost(url, buyParam);
  }

  /* 更新使用优惠劵优惠后的价格 */
  private updateDiscountedPrice(): VoucherCodeResponse {
    const voucherCodeResponse = new VoucherCodeResponse;

    voucherCodeResponse.success = false;
    this.priceAfterDiscount = this.totalPrice;

    if (this.totalItems && this.totalPrice > 5 && this.voucherApplied && this.currentVoucher) {
      switch (this.currentVoucher.toUpperCase()) {
        case AppConst.VOUCHER_CODES.OFF5:
          this.priceAfterDiscount = this.totalPrice - 5;
          voucherCodeResponse.description = 'Voucher succesfully applied.';
          break;
        case AppConst.VOUCHER_CODES.OFF10:
          if (this.totalPrice > 50) {
            this.priceAfterDiscount = this.totalPrice - 10;
            voucherCodeResponse.description = 'Voucher succesfully applied.';
          } else {
            this.voucherApplied = false;
            this.currentVoucher = '';
            voucherCodeResponse.success = false;
            voucherCodeResponse.description = 'This voucher can be applied only when the cart value is above 50';
          }
          break;
        case AppConst.VOUCHER_CODES.OFF15:
          if (this.totalPrice > 75 ) {
            this.priceAfterDiscount = this.totalPrice - 15;
            voucherCodeResponse.description = 'Voucher succesfully applied';
          } else {
            this.voucherApplied = false;
            this.currentVoucher = '';
            voucherCodeResponse.success = false;
            voucherCodeResponse.description =
              'This voucher can be applied only when the cart value is boave 75';
          }
          break;
        default:
          this.voucherApplied = false;
          this.currentVoucher = '';
          voucherCodeResponse.success = false;
          voucherCodeResponse.description = 'Invalid voucher code. Please check.';
          break;
      }
    } else {
      this.currentVoucher = '';
      this.voucherApplied = false;
      voucherCodeResponse.description = 'Voucher cannot be applied to the current cart';
    }
    return voucherCodeResponse;
  }



  private verifyVoucherCodeFromServer(voucher: string): Observable<any> {
    const url: string = this.storeApiPath + AppConst.STORE_API_PATHS.verfiyVoucher;
    // Ideally we should use post method
    // Body should contain the cart and the voucher code
    return this.apiProvider.httpGet(url);
  }

  constructor(private apiProvider: ApiProvider) {
    this.change = new EventEmitter();
  }

  /**
   * saveCartToLocalStorage
   */
  public saveCartToLocalStorage(cart: Cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  public addItemToCart(item: ItemDescription) {
    const id: string = item.id;
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.cartItems = this.cart.cartItems;
    }
    if (this.cartItems[id]) {
      if (this.cartItems[id].total_on_hand > 0) {
        this.cartItems[id].total_on_hand = this.cartItems[id].total_on_hand - 1;
        this.cartItems[id].count = this.cartItems[id].count + 1;
        this.totalPrice = this.cart.totalPrice + item.selling_price;
        this.updateDiscountedPrice();
        this.cart.totalItems += 1;
      }
    } else {
      if (item.total_on_hand > 0) {
        this.cartItems[id] = Object.assign({}, item);
        this.cartItems[id].max_items = this.cartItems[id].total_on_hand;
        this.cartItems[id].total_on_hand = this.cartItems[id].total_on_hand - 1;
        this.cartItems[id].count = 1;
        this.totalPrice = this.cart.totalPrice + item.selling_price;
        this.updateDiscountedPrice();
        this.cart.totalItems += 1;
      }
    }
    this.cart.totalPrice = this.totalPrice;
    this.cart.cartItems = this.cartItems;
    this.saveCartToLocalStorage(this.cart);
    // localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public getCartItems(): any {
    if (localStorage.getItem('cart')) {
      const cartStorage = JSON.parse(localStorage.getItem('cart'));
      if ('cartItems' in cartStorage && cartStorage.cartItems !== undefined && cartStorage.cartItems !== null) {
        this.cartItems = JSON.parse(localStorage.getItem('cart')).cartItems;
        return this.cartItems;
      }
    } else {
      return this.cartItems;
    }
  }

  public getTotalAvailableItems(ref: string): number {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      if ('cartItems' in this.cart && this.cart.cartItems[ref] !== undefined && this.cart.cartItems[ref] !== null) {
        return this.cart.cartItems[ref].total_on_hand;
      }
    } else {
      if (this.cartItems[ref]) {
        return this.cartItems[ref];
      }
    }
  }

  public getTotalPrice(): number {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      if (this.cart.totalPrice !== undefined && this.cart.totalPrice !== null) {
        // console.log(this.cart.totalPrice)
        return Number(this.cart.totalPrice.toFixed(2));
      }
    }
  }

  public getTotalItems(): number {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      if (this.cart.totalItems !== undefined && this.cart.totalItems !== null) {
        this.totalItems = this.cart.totalItems;
        return Number(this.cart.totalItems);
      }
    } else {
      return this.cart.totalItems = 0;
    }
  }

  public getPriceAfterDiscount(): number {
    return Number(this.priceAfterDiscount.toFixed(2));
  }

  public removeItem(ref: string) {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.cartItems = this.cart.cartItems;
    }
    if (this.cartItems[ref]) {
      const tempObj = this.cartItems[ref];
      this.cart.totalPrice = this.cart.totalPrice - (tempObj.count * tempObj.selling_price);
      this.updateDiscountedPrice();
      this.cart.totalItems = this.cart.totalItems - (tempObj.count);
      this.cartItems[ref] = null;
      delete this.cartItems[ref];
    }
    this.saveCartToLocalStorage(this.cart);
    // localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public updateQuantityOfItem(ref: string, totalQuantity: number) {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.cartItems = this.cart.cartItems;
      this.totalItems = this.cart.totalItems;
      this.totalPrice = this.cart.totalPrice;
    }
    if (this.cartItems[ref]) {
      const max_available = this.cartItems[ref].max_items;
      if (totalQuantity <= max_available) {
        const currentPriceForThisItem = (this.cartItems[ref].count * this.cartItems[ref].selling_price);
        const curretnCountForThisItem = this.cartItems[ref].count;
        this.cartItems[ref].count = totalQuantity;
        this.cartItems[ref].total_on_hand = max_available - totalQuantity;
        this.totalPrice = this.totalPrice - currentPriceForThisItem;
        this.totalPrice = this.totalPrice + (this.cartItems[ref].count * this.cartItems[ref].selling_price);
        this.updateDiscountedPrice();
        this.totalItems = this.totalItems - curretnCountForThisItem;
        this.totalItems = this.totalItems + this.cartItems[ref].count;
      }
    }
    this.cart.cartItems = this.cartItems;
    this.cart.totalItems = this.totalItems;
    this.cart.totalPrice = this.totalPrice;
    this.saveCartToLocalStorage(this.cart);
    // localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public removeAllItemsFromCart() {
    this.cartItems = {};
    this.cart.totalPrice = 0;
    this.totalPrice = 0;
    this.priceAfterDiscount = 0;
    this.cart.totalItems = 0;
    this.voucherApplied = false;
    this.currentVoucher = '';
    localStorage.removeItem('cart');
  }

  public verifyVoucherCode(voucher: string): Observable<VoucherCodeResponse> {
    let voucherCodeResponse = new VoucherCodeResponse();
    voucherCodeResponse.success = false;

    const observable: Observable<VoucherCodeResponse> = new Observable((observer) => {
      if (this.totalItems && voucher && !this.voucherApplied && this.totalPrice > 5) {
        this.verifyVoucherCodeFromServer(voucher).subscribe((res) => {
          this.currentVoucher = voucher;
          this.voucherApplied = true;
          voucherCodeResponse.success = true;
          voucherCodeResponse = this.updateDiscountedPrice();
          observer.next(voucherCodeResponse);
          observer.complete();
        });
      } else {
        voucherCodeResponse.description = 'Voucher cannot be applied to the current cart';
        observer.next(voucherCodeResponse);
        observer.complete();
      }
    });

    return observable;
  }
}
