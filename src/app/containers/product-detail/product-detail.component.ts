import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProductItemsService } from '../../providers/product-items.service';
import { Observable } from 'rxjs';
import { ItemDescription } from '../../models/item-description';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  item$: Observable<ItemDescription>;

  constructor(private route: ActivatedRoute, private itemService: ProductItemsService) {}

  ngOnInit() {
    this.item$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
        this.itemService.getItem(params.get('id'))
      )
    );
  }
}
