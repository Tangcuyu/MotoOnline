import { Component, OnInit, OnDestroy, OnChanges, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartService } from './providers/cart.service';
import { NavbarComponent } from './layouts/navbar/navbar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, OnChanges {
  title = 'Select an option:';
  login = true;
  cartItemNuber: number;
  @ViewChild('nav') private nav: NavbarComponent

  constructor(private cartService: CartService) {}

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.cartItemNuber = this.cartService.getTotalItems();
  }

  onAdditem(){
    this.nav.updateItems();
  }
  ngOnDestroy() {
    
  }

  onNotifyNavbar(buttonName: string) {
  }

  showHideSideClicked() {}
}
