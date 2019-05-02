import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../models/model';
import { CartService } from '../../providers/cart.service';
import { MatSnackBar } from '@angular/material';
import { VoucherCodeResponse } from '../../models/voucher-code-response';
import { ItemDescription } from '../../models/item-description';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';



@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit {

  public cartItems: Array<ItemDescription> = [];
  public totalPrice = 0;
  public totalItems = 0;
  public priceAfterDiscount = 0;
  public itemsListPath = '/home';
  public loading = false;
  public isError = false;
  public optionSelected: any = {};
  public currencySymbol = AppConst.DEFAULT_CURRENCY_SYMBOL;
  public verifyingVoucher = false;

  private updateCartItemsFromProvider() {
    const cartObj = this.cartService.getCartItems();
    this.cartItems = [];
    if (cartObj) {
      Object.keys(cartObj).map((itemRef) => {
        this.cartItems.push(cartObj[itemRef]);
      });
    }
  }

  private updatePriceFromProvider() {
    this.totalPrice = this.cartService.getTotalPrice();
    this.priceAfterDiscount = this.cartService.getPriceAfterDiscount();
  }



  constructor(private cartService: CartService, private snackBar: MatSnackBar, public modal: Modal) {

   }

  ngOnInit() {
    this.updateCartItemsFromProvider();
    this.updatePriceFromProvider();
  }

  emptyConfirm() {
    const dialogRef = this.modal.confirm()
      .size('sm')
      .showClose(false)
      .okBtn('是')
      .okBtnClass('btn btn-xs btn-secondary')
      .cancelBtn('否')
      .cancelBtnClass('btn btn-xs btn-secondary')
      .body(`
            <span>真的要清空购物车吗？</span>
            `)
      .open();

    dialogRef.result
      .then(
        result => {
          if (result) {
            this.handleEmptyCart();
          }
        },
        () => {
          console.log('canceled');
          return;
        });
  }

  delConfirm(id: string) {
    const dialogRef = this.modal.confirm()
      .size('sm')
      .showClose(false)
      .okBtn('是')
      .okBtnClass('btn btn-xs btn-secondary')
      .cancelBtn('否')
      .cancelBtnClass('btn btn-xs btn-secondary')
      .body(`
            <span>真的要删除此商品吗？</span>
            `)
      .open();

    dialogRef.result
      .then(
        result => {
          if (result) {
            this.handleRemoveItem(id);
          }
        },
        () => {
          console.log('canceled');
          return;
        });
  }


  handleBuyNow() {
    console.log('buy items');
  }

  handleRemoveItem(ref: string) {
    this.cartService.removeItem(ref);
    this.totalItems = this.cartService.getTotalItems();
    this.cartService.change.emit(this.totalItems);
    this.updateCartItemsFromProvider();
    this.updatePriceFromProvider();
  }

  /* getQuantity(ref: string): number {
    const item = this.cartItems.find((cartItem) => cartItem.id.toString() === ref.toString());
    if (item) {
      return item.sku;
    }
    return 0;
  } */

  handleQuantityChange($event, ref: string) {
    console.log($event, ref);
    this.cartService.updateQuantityOfItem(ref, Number($event.target.value));
    this.updatePriceFromProvider();

  }

  getQuantityList(ref: string): Array<number> {
    const itemsCount = [];
    const item = this.cartItems.find((cartItem) => cartItem.id.toString() === ref.toString());

    if (item && item.sku) {
      const maxAvailable = item.sku;
      for (let i = 0; i < maxAvailable; i++) {
        itemsCount.push(i + 1);
      }
    }
    return itemsCount;

  }

  handleEmptyCart() {
    this.cartService.removeAllItemsFromCart();
    // Since we manage the cart items in provider in a different structure (to optimise the space)
    // we have to check and update the items and price for the cart
    this.cartService.change.emit(0);
    this.updateCartItemsFromProvider();
    this.updatePriceFromProvider();
  }
  handleVoucherAdded(voucher: string) {
    this.verifyingVoucher = true;

    this.cartService.verifyVoucherCode(voucher).subscribe((res: VoucherCodeResponse) => {
      this.updatePriceFromProvider();
      this.snackBar.open(res.description, 'Dismiss', {
        duration: 2000,
      });
      this.verifyingVoucher = false;
    },
    (err) => {
      this.verifyingVoucher = false;
      this.snackBar.open('Error while applying voucher. Please try later.', 'Dismiss', {
        duration: 2000,
      });
    });
    console.log('voucher is ', voucher);
  }
}
