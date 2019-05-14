import { Component, Injectable, EventEmitter, Output, OnChanges, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CartService } from '../../providers/cart.service';
import { IMenuItem } from '../../models/model';
import { AuthService } from '../../providers/auth.service';
import { MenuItemsService } from '../../providers/menu-items.service';

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
  loginMenu: IMenuItem[];
  nologinMenu: IMenuItem[];

  // private fields
  private storeApiPath: string = environment.storeApiPath; // 获取环境配置文件中的参数：后台API路径

  // public methods 界面语言切换
  changeLanguage(message: string) {
    this.langChange.emit(message);
  }

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private menuitemService: MenuItemsService) {

    this.isLoggedIn = this.authService.isLoggedIn();
    this.menuitemService.getMenuItems(this.isLoggedIn)
      .subscribe(
        (data) => {
          this.menuItems = data;
          // console.log(this.menuItems);
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
    this.authService.change.subscribe((value) => {
      this.menuitemService.getMenuItems(value)
      .subscribe(
        (data) => {
          this.menuItems = data;
          // console.log(this.menuItems);
        },
        err => {
          console.log(`error : ${err.message}`);
        },
        () => {
        }
      );
    });
  }

  ngOnInit() {

  }
  ngOnChanges() {
    // this.menuItems = this.menuLoginChange(this.menuItems, this.isLoggedIn);
  }

  // 判断用户是否登录，如果用户已登录则修改菜单名为“我的世界”，并删除用户登录子菜单
  // private menuLoginChange(menu: IMenuItem[], login: boolean) {
  //   const arr = menu[2];
  //   if (login) {
  //     arr.subItems.splice(arr.subItems.findIndex(item => item.subItemName === '用户登录'), 1);
  //     this.loginMenu = [...menu];
  //     return this.loginMenu;
  //   } else {
  //     arr.translateKey = "menu.item3.logoutname";
  //     arr.subItems.splice(0, 5, arr.subItems.find(item => item.subItemName === '用户登录'));
  //     this.nologinMenu = [...menu];
  //     return this.nologinMenu;
  //   }
  // }
}
