import { Component, EventEmitter, Injectable, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../providers/auth.service';
import { CartService } from '../../providers/cart.service';
import { IMenuItem } from '../../models/model';
import { MenuItemsService } from '../../providers/menu-items.service';

<<<<<<< HEAD
=======
// 测试翻译模块功能
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { Subscription } from 'rxjs';


>>>>>>> 04fb3afa012edc7463fdb6274f4e106485f78caa
@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


@Injectable()
export class NavbarComponent implements OnDestroy {
  // Public properites
  items = 0;
  @Output() langChange: EventEmitter<string> = new EventEmitter<string>();
  menuItems: IMenuItem[];
  isLoggedIn: string;
  loginMenu: IMenuItem[];
  nologinMenu: IMenuItem[];
  sub: Subscription;

  // public methods 界面语言切换
  changeLanguage(message: string) {
    this.langChange.emit(message);
  }

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private menuitemService: MenuItemsService) {
    this.isLoggedIn = this.authService.isLoggedIn() ? 'login' : 'logout';
    this.sub = this.menuitemService.getMenuItems(this.isLoggedIn)
      .subscribe(
        (data) => {
          this.menuItems = data;
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

    // 响应登录和退出登录事件
    this.sub = this.authService.change.subscribe((value) => {
      this.menuitemService.getMenuItems(value)
        .subscribe(
          (data) => {
            this.menuItems = [...data];
          },
          err => {
            console.log(`error : ${err.message}`);
          },
          () => {
          }
        );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
