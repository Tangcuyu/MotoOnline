import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authservice: AuthService) {
  }

  ngOnInit() {
    this.authservice.change.emit('logout');
    this.authservice.logout();
  }

}
