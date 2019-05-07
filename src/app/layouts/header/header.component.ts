import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private imgUrl: string;
  public headerStyle = {};

  // 从激活路由中获取背景的图片路径数据
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(
      (data) => {
        this.imgUrl = `url(${data['backimg']})`;
        this.headerStyle = {
          'background-image': this.imgUrl,
          'transform': 'translate3d(0px, 0px, 0px)'
        };
      }
    );
  }

  ngOnInit() {
  }

}
