// import 语句排序按字母顺序 third party imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


// application imports
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home.component';
import { HomefooterComponent } from './homefooter/homefooter.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { NewmodelComponent } from './newmodel/newmodel.component';
import { NewsfashionComponent } from './newsfashion/newsfashion.component';
import { ProductModule } from '../product/product.module';

const components = [
  ArticleComponent,
  HomeComponent,
  HomefooterComponent,
  NewmodelComponent,
  NewsfashionComponent,
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    LayoutsModule,
    ProductModule,
    RouterModule,
    SharedModule,
    TranslateModule
  ],
  exports: [
    components
  ]
})
export class HomeModule { }
