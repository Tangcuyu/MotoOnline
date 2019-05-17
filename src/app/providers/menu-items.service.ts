import { Injectable } from '@angular/core';
import { IMenuItem, AppConst } from '../models/model';
import { environment } from '../../environments/environment';
import { TranslateKeyService } from './translate-key.service';
import { ApiProvider } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/';
import 'rxjs/add/observable/of';
import { HttpParams } from '@angular/common/http';






@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  // 获取环境配置文件中的参数：后台API路径
  private storeApiPath: string = environment.storeApiPath;
  private options: HttpParams;
  public menuItems: IMenuItem[];


  constructor(
    private apiProvider: ApiProvider,
    private translateKey: TranslateKeyService,
  ) { }

  // 根据登录状态，返回对应的菜单数据
  getMenuItems(loginStatus: string): Observable<IMenuItem[]> {
    const menuListUrl: string = this.storeApiPath + AppConst.STORE_API_PATHS.getMenuItems;
    const options = loginStatus ? { params: new HttpParams().set('login', loginStatus) } : {};
    const menu$ = this.apiProvider.httpGet<IMenuItem[]>(menuListUrl, options)
      .pipe(
        map((value) => {
          this.changeMenuByLoginStatus(value, loginStatus);
          return value;
        })
      );
    return menu$;
  }

  // 根据是否登录的状态，为返回的菜单数据添加translateKEY
  public changeMenuByLoginStatus(menu: IMenuItem[], login: string) {
    if (login === 'login') {
      this.translateKey.translateKeyMenu(menu, 'menu');
      return menu;
    } else if (login === 'logout') {
      this.translateKey.translateKeyMenu(menu, 'menulogout');
      return menu;
    }
  }
}
