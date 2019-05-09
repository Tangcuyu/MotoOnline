import { Injectable } from '@angular/core';
import { INotifyConifg } from '../models/model';

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  showNotification(notifyconfig: INotifyConifg) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    // const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: 'notifications',
      title: notifyconfig.title,
      message: notifyconfig.message
    },
      {
        type: type[notifyconfig.color],
        timer: notifyconfig.timer,
        showProgressbar: false,
        placement: {
          from: notifyconfig.from,
          align: notifyconfig.align
        },
        delay: notifyconfig.delay,
        offset: {
          x: 20,
          y: 20
        },
        template: `<div data-notify="container"
          class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">
          <button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">
            <i class="material-icons">close</i></button>
          <div><i class="fa fa-bell" data-notify="icon"></i>&nbsp;
          <span data-notify="title" [translate]="'notify.title'">{1}</span>
          <span data-notify="message" [translate]="'notify.message'">{2}</span></div>
          <div class="progress" data-notify="progressbar">
          <div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0"
          aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
          </div>
          <a href="{3}" target="{4}" data-notify="url"></a>
          </div>`
      });
  }

}
