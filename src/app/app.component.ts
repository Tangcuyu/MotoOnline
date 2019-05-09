import { Component, OnInit, OnDestroy, OnChanges, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartService } from './providers/cart.service';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, OnChanges {
  language: string;
  cartItemNuber: number;
  @ViewChild('nav') private nav: NavbarComponent;

  constructor(private cartService: CartService, private translateService: TranslateService) {
    // --- set i18n begin --- 翻译组件
    this.translateService.addLangs(['zh', 'en']);
    this.translateService.setDefaultLang('zh');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
    // --- set i18n end ---
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.cartItemNuber = this.cartService.getTotalItems();
  }

  onAdditem() {
    this.nav.updateItems();
  }
  ngOnDestroy() {
  }

  onLangChange($event) {
    this.language = this.translateService.currentLang;
    if (this.language === 'zh') {
      this.translateService.use('en');
    } else {
      this.translateService.use('zh');
    }
  }

  showHideSideClicked() {}
}
