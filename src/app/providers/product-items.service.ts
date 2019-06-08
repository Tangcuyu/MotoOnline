import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


import { ApiProvider } from './api.service';
import { AppConst } from '../models/model';
import { ItemsListItem } from '../models/items-list-item';
import { ItemDescription } from '../models/item-description';

@Injectable({
  providedIn: 'root'
})
export class ProductItemsService {

  // 获取环境配置文件中的参数：后台API路径
  private storeApiPath: string = environment.storeApiPath;

  // apiProvider实现http的各种请求服务
  constructor(private apiProvider: ApiProvider) { }

  // 使用apiProvider的实例获取最新产品列表数据
  getItemsList(): Observable<Array<ItemsListItem>> {
    const itemsListUrl: string = this.storeApiPath + AppConst.STORE_API_PATHS.getItems;
    return this.apiProvider.httpGet(itemsListUrl)
      .pipe(
        map((res: any) => {
          if (res) {
            return res;
          }
        }));
  }

  // 获取产品详细信息
  getItem(id: string): Observable<ItemDescription> {
    const itemDecUrl: string =  this.storeApiPath +  AppConst.STORE_API_PATHS.itemDescription.replace('{{id}}', id);
    return this.apiProvider.httpGet<ItemDescription>(itemDecUrl);
  }

  // 获取所有产品列表
  getProductList(): Observable<Array<ItemsListItem>> {
    const productsListUrl: string = this.storeApiPath + AppConst.STORE_API_PATHS.getProducts;
    return this.apiProvider.httpGet(productsListUrl)
      .pipe(
        map((res: any) => {
          if (res) {
            return res;
          }
        }));
  }
}
