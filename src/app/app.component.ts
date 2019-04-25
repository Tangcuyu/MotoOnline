import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Select an option:';
  login = true;

  constructor() {}

  ngOnInit() {
    
  }

  ngOnDestroy() {
    
  }

  onNotifyNavbar(buttonName: string) {
  }

  showHideSideClicked() {}
}
