// import 语句排序按字母顺序 third party imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

// application imports
import { ArticleComponent } from './article/article.component';
import { FilterComponent } from './filter/filter.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { HomeComponent } from './home.component';
import { HomefooterComponent } from './homefooter/homefooter.component';
import { LoadingSpinnerComponent } from '../layouts/loading-spinner/loading-spinner.component';
import { NewmodelComponent } from './newmodel/newmodel.component';
import { NewsfashionComponent } from './newsfashion/newsfashion.component';
import { NetworkErrorComponent } from '../layouts/network-error/network-error.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SubscribeComponent } from '../layouts/subscribe/subscribe.component';
import { TranslateModule } from '@ngx-translate/core';

const components = [
  ArticleComponent,
  HeaderComponent,
  HomeComponent,
  HomefooterComponent,
  LoadingSpinnerComponent,
  NetworkErrorComponent,
  NewmodelComponent,
  NewsfashionComponent,
  ProductListComponent,
  SubscribeComponent
];

@NgModule({
  declarations: [
    components,
    FilterComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    TranslateModule
  ],
  exports: [
    components
  ]
})
export class HomeModule { }
