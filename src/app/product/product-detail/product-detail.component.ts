import { Component, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ProductItemsService } from '../../providers/product-items.service';
import { CartService } from '../../providers/cart.service';
import { ItemDescription } from '../../models/ItemDescription';
import { AppConst } from '../../models/model';

// 一定要声明 $ 符，不然编译会报错，
// 如果 import * as $ from 'jquery'; 则与angular.json中 script 数组中配置的jquery分别产生两个对象。会导致错误。
declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnChanges {
  @Output()
  additem: EventEmitter<number>
        = new EventEmitter<number>();
  public currencySymbol = AppConst.DEFAULT_CURRENCY_SYMBOL;
  public loading = false;
  public isError = false;
  public item: ItemDescription;
  public itemId: string;


  constructor(
    private route: ActivatedRoute,
    private itemService: ProductItemsService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    ) {
      this.initFlexisel();
    }

  ngOnInit() {
    this.initFlexisel();
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.itemService.getItem(this.itemId).subscribe((returnitem: ItemDescription) => {
      this.item = returnitem[0];
      this.item.id = returnitem[0]._id;
      this.loading = false;
    }, () => {
      this.loading = false;
      this.isError = true;
    });
  }

  ngOnChanges() {
    // this.initFlexisel();
  }
  // 产品图片轮播初始化
  initFlexisel() {
    $(document).ready(function() {
        $('#flexiselDemo1').flexisel();
    });
  }

  handleAddtoCartClick(item: ItemDescription) {
    let i = this.cartService.getTotalItems();
    this.cartService.addItemToCart(item);
    this.cartService.change.emit(++i);
    this.snackBar.open('商品添加成功', '关闭', {
      duration: 2000
    });
  }

  getItemsAvailable(): number {
    const count = this.cartService.getTotalAvailableItems(this.item.id);
    if (count !== undefined && count !== null) {
      return count;
    } else {
      return this.item.total_on_hand;
    }
  }
}
