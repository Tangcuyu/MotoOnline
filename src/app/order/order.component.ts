import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public loading = false;
  public isError = false;

  constructor() { }

  ngOnInit() {
  }

  public pay() { }

}
