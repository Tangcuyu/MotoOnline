import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProductItemsService } from '../../providers/product-items.service';
import { Observable } from 'rxjs';
import { ItemDescription } from '../../models/item-description';
import { AppConst } from '../../models/model';

// 一定要声明 $ 符，不然编译会报错，
// 如果 import * as $ from 'jquery'; 则与angular.json中 script 数组中配置的jquery分别产生两个对象。会导致错误。
declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public currencySymbol = AppConst.DEFAULT_CURRENCY_SYMBOL;
  public loading = false;
  public isError = false;
  public item: ItemDescription;
  public itemId: string;


  constructor(private route: ActivatedRoute, private itemService: ProductItemsService) {}

  ngOnInit() {
    this.initFlexisel();
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.itemService.getItem(this.itemId).subscribe((returnitem: ItemDescription) => {

      this.item = returnitem[0];
      this.loading = false;
      // console.log(this.item);
    }, () => {
      this.loading = false;
      this.isError = true;
    });
  }

  // 产品图片轮播初始化
  initFlexisel() {
    $(document).ready(function() {
        $("#flexiselDemo1").flexisel({
            visibleItems: 4,
            itemsToScroll: 1,
            animationSpeed: 400,
            enableResponsiveBreakpoints: true,
            responsiveBreakpoints: {
                portrait: {
                    changePoint: 480,
                    visibleItems: 3
                },
                landscape: {
                    changePoint: 640,
                    visibleItems: 3
                },
                tablet: {
                    changePoint: 768,
                    visibleItems: 3
                }
            }
        });
    });
  }
}
