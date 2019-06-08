import { Component, OnInit } from '@angular/core';

import { ItemsListItem } from '../../models/items-list-item';
import { ProductItemsService } from '../../providers/product-items.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private productList: Array<ItemsListItem>;
  private isLoading = false;
  private isError = false;

  constructor(private productlist: ProductItemsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.productlist.getProductList()
      .subscribe(productList => {
        this.productList = productList;
        console.log(this.productList);
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        this.isError = true;
      });
  }

}
