import { Component, Injectable, EventEmitter, Output, OnChanges, Input, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppConst, ISubItem } from '../../models/model';
import { environment } from '../../../environments/environment';
import { CartService } from '../../providers/cart.service';
import { IMenuItem } from '../../models/model';
import { AuthService } from '../../providers/auth.service';

// 测试翻译模块功能
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';


@Component({
    selector: 'app-navbar-component',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})


@Injectable()
export class NavbarComponent implements OnInit, OnChanges {
  // Public properites
  items = 0;
  @Output() langChange: EventEmitter<string> = new EventEmitter<string>();
  menuItems: IMenuItem[];
  isLoggedIn: boolean;

  // private fields
  private storeApiPath: string = environment.storeApiPath; // 获取环境配置文件中的参数：后台API路径
  private logoutItemStr = '用户登录';
  private loginItemStr = '我的世界';

  // public methods
  changeLanguage(message: string) {
    this.langChange.emit(message);
  }

 constructor (private http: HttpClient, private cartService: CartService, private authservice: AuthService) {
   this.isLoggedIn = this.authservice.isLoggedIn();
   // 获取导航数据,在返回的导航数据中增加translateKey
   this.http.get<any>(this.storeApiPath + AppConst.STORE_API_PATHS.getMenuItems)
     .subscribe(
       (data) => {
         this.menuItems = data;
         this.translateKey(this.menuItems);
         this.menuLoginChange(this.menuItems);
         console.log(this.menuItems);
       },
       err => {
         console.log(`error : ${err.message}`);
       },
       () => {
       }
     );
   // 从本地存储获取购物车条目数量初始值
   const cart = JSON.parse(window.localStorage.getItem('cart'));
   if (cart !== null && cart !== undefined) {
     this.items = cart.totalItems;
   }
   // 响应购物车服务中条目变化
   this.cartService.change.subscribe((value) => {
     this.items = value;
   });

   // 响应登录事件
   this.authservice.change.subscribe((value) => {
      switch (value) {
        case 'loginok':
          this.menuItems[3].buttonName = this.loginItemStr;
          break;
        case 'logoutok':
          this.menuItems[3].buttonName = this.logoutItemStr;
          break;
        default:
          break;
      }
   });
  }

  ngOnInit() {
  }
  ngOnChanges() {
  }

  // private methods
  /* 添加key到数组中，用于翻译模块根据key查找翻译字符串 */
  private translateKey(arr: IMenuItem[]) {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      element.translateKey = 'menu.item' + i + '.name';
      for (let subi = 0; subi < element.subItems.length; subi++) {
        const subelement = element.subItems[subi];
        subelement.translateKey = 'menu.item' + i + '.submenu.sub' + (subi + 1) + '.name';
      }
    }
    return arr;
  }

  // 判断用户是否登录，如果用户已登录则修改菜单名为“我的世界”，并删除用户登录子菜单
  private menuLoginChange(menu: IMenuItem[]) {
    const arr = menu[3];
    if (this.isLoggedIn) {
      arr.translateKey = 'menu.item3.named';
      arr.subItems.splice(arr.subItems.findIndex(item => item.subItemName === '用户登录'), 1);
      menu[3] = arr;
      return menu;
    } else {
      arr.translateKey = 'menu.item3.name';
      arr.subItems.splice(0, 5, arr.subItems.find(item => item.subItemName === '用户登录'));
      menu[3] = arr;
      return menu;
    }
  }
}
