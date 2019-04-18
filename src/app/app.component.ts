import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { BoardState } from './core/board.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Select an option:';
  boardState$: Observable<BoardState>;
  private boardStateSubsrciption: Subscription;
  boardState: BoardState;
  login = true;

  constructor(private store: Store<BoardState>) {
    this.boardState$ = store.select('boardState');
  }

  ngOnInit() {
    this.boardStateSubsrciption = this.boardState$.subscribe((state) => {
      this.boardState = state;
    });
  }

  ngOnDestroy() {
    this.boardStateSubsrciption.unsubscribe();
  }

  onNotifyNavbar(buttonName: string) {
  }

  showHideSideClicked() {}
}
