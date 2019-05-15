// Third party imports
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ModalModule } from 'ngx-modialog';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SharedModule } from './shared/shared.module';

// Application imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ProductModule } from './product/product.module';
import { PagenotfoundComponent } from './layouts/pagenotfound/pagenotfound.component';
import { SalesModule } from './sales/sales.module';
import { TokenInterceptorService } from './providers/token-interceptor.service';
import { TranslateCompiler, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    PagenotfoundComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    ProductModule,
    SalesModule,
    RouterModule,
    HomeModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      // compiler configuration
        compiler: {
          provide: TranslateCompiler,
          useClass: TranslateMessageFormatCompiler
        }
    }),
    LoginModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
