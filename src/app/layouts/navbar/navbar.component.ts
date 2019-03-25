import { Component, Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppConst } from '../../models/model';
import { environment } from '../../../environments/environment';

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
export class NavbarComponent {
  @Output()
  notify: EventEmitter<string>
        = new EventEmitter<string>();
  menuItems: IMenuItem[];
  // 获取环境配置文件中的参数：后台API路径
  private storeApiPath: string = environment.storeApiPath;

 constructor (private http: HttpClient) {
    // console.log('AppComponent constructor');
   this.http.get<any>(this.storeApiPath + AppConst.STORE_API_PATHS.getMenuItems)
     .subscribe(
      (data) => {
         // console.log(`got : ${data['menuItems'][0].buttonName}`);
         this.menuItems = data['menuItems'];
         // console.log(`got : ${this.menuItems[0].buttonName}`);
      },
      err => {
        console.log(`error : ${err}`);
      },
      () => {
        console.log(`success`);
      }
    );
  }

  navClicked(item: IMenuItem) {
    this.notify.emit(`${item.buttonName}`);
  }

}
