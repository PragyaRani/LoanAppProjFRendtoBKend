import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';

import { PreLoginLayoutComponent } from './core/components/layout/pre-login/pre-login-layout.component';
import { PreLoginHeaderComponent } from './core/components/layout/pre-login/partials/pre-login-header.component';
import { PreLoginFooterComponent } from './core/components/layout/pre-login/partials/pre-login-footer.component';

import { PostLoginLayoutComponent } from './core/components/layout/post-login/post-login-layout.component';
import { PostLoginHeaderComponent } from './core/components/layout/post-login/partials/post-login-header.component';
import { PostLoginFooterComponent } from './core/components/layout/post-login/partials/post-login-footer.component';

import { LoginComponent } from './core/components/login/login.component';
import { LoaderService } from './core/services/loader.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './core/helpers/token-interceptor.service';

const coreComponents = [
  // pre-login
  PreLoginLayoutComponent,
  PreLoginHeaderComponent,
  PreLoginFooterComponent,
  // post-login
  PostLoginLayoutComponent,
  PostLoginHeaderComponent,
  PostLoginFooterComponent,

  LoginComponent
];

const coreServices = [LoaderService];

@NgModule({
  declarations: [
    AppComponent,
    ...coreComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [...coreServices,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
