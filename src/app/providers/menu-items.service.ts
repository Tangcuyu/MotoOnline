import { Injectable } from '@angular/core';
import { IMenuItem, AppConst } from '../models/model';
import { environment } from '../../environments/environment';
import { TranslateKeyService } from './translate-key.service';
import { ApiProvider } from './api.service';
import { map, switchMap, concatMap, mergeMap } from 'rxjs/operators';
import { Observable }  from 'rxjs/';
import 'rxjs/add/observable/of';
import { AuthService } from './auth.service';






@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  // 获取环境配置文件中的参数：后台API路径
  private storeApiPath: string = environment.storeApiPath;
  public menuItems: IMenuItem[]; 

  constructor(
    private apiProvider: ApiProvider,
    private authService: AuthService,
    private translateKey: TranslateKeyService,
  ) { }

  // 获取导航数据,在返回的导航数据中增加翻译界面语言的translateKey
  getMenuItems(loginStatus: boolean): Observable<IMenuItem[]> {
    const menuListUrl: string = this.storeApiPath + AppConst.STORE_API_PATHS.getMenuItems;
    const menu$ = this.apiProvider.httpGet<IMenuItem[]>(menuListUrl)
      .pipe(
        map((value) => {
          this.changeMenuByLoginStatus(value, loginStatus)
          return value;
        })
      );
    return menu$;
  }

  // 根据登录状态，改变菜单项的内容：登录后显示我的世界及其子菜单；退出登录后，显示用户登录菜单
  // TODO: 使用了菜单对象中子菜单数组的索引位置实现，这种方式固定了要删除的子菜单位置，因此很不灵活，需要改进
  public changeMenuByLoginStatus(menu: IMenuItem[], login: boolean) {
    const arr = [...menu];
    if (login) {
      arr[3].subItems.splice(arr[3].subItems.findIndex(item => item.subItemUrl === 'login'),1);
      this.translateKey.translateKeyMenu(arr, 'menu');
      return arr;
    } else {
      const [,,,i,] = menu[3].subItems;
      menu[3].subItems = [i];
      this.translateKey.translateKeyMenu(menu, 'menulogout')
      return menu;
    }
  }
}
