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
  @Input() items: number = 0;
  // 获取环境配置文件中的参数：后台API路径
  private storeApiPath: string = environment.storeApiPath;

 constructor (private http: HttpClient, private cartService: CartService) {
    // console.log('AppComponent constructor');
   this.http.get<any>(this.storeApiPath + AppConst.STORE_API_PATHS.getMenuItems)
     .subscribe(
      (data) => {
         // console.log(`got : ${data['menuItems'][0].buttonName}`);
         this.menuItems = data;
         // console.log(`got : ${this.menuItems[0].buttonName}`);
      },
      err => {
        console.log(`error : ${err.message}`);
      },
      () => {
        // console.log(`success`);
      }
    );
  }

  ngOnInit() {
    
  }
  ngOnChanges() {
  }

  updateItems() {
    this.items = this.cartService.getTotalItems();
  }

  navClicked(item: IMenuItem) {
    this.notify.emit(`${item.buttonName}`);
  }

}
