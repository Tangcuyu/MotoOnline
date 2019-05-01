import { Component, Injectable, EventEmitter, Output, OnChanges, Input, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppConst } from '../../models/model';
import { environment } from '../../../environments/environment';
import { CartService } from '../../providers/cart.service';

interface ISubItem {
  subItemName: string;
  subItemString: string;
}
interface IMenuItem {
  buttonName: string;
  iconString: string;
  subItems: ISubItem[];
}

@Component({
    selector: 'app-navbar-component',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})


@Injectable()
export class NavbarComponent implements OnInit, OnChanges {
  @Output()
  notify: EventEmitter<string>
        = new EventEmitter<string>();
  menuItems: IMenuItem[];
  items = 0;
  // 获取环境配置文件中的参数：后台API路径
  private storeApiPath: string = environment.storeApiPath;

 constructor (private http: HttpClient, private cartService: CartService) {
  // 获取导航数据
  this.http.get<any>(this.storeApiPath + AppConst.STORE_API_PATHS.getMenuItems)
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
    // console.log(cart);
    if (cart !== null && cart !== undefined) {
      this.items = cart.totalItems;
    }
    // 响应购物车服务中条目变化
    this.cartService.change.subscribe((value) => {
    this.items = value;
   });
  }

  ngOnInit() {
  }
  ngOnChanges() {
  }

  updateItems() {
  }

  navClicked(item: IMenuItem) {
    this.notify.emit(`${item.buttonName}`);
  }

}
