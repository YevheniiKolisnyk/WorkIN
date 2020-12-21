import {BrowserModule} from '@angular/platform-browser'
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {NavBarComponent} from './nav-bar/nav-bar.component'
import {AuthPageComponent} from './auth-page/auth-page.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {LoginPageComponent} from './auth-page/login-page/login-page.component'
import {RegisterPageComponent} from './auth-page/register-page/register-page.component'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {InternationalPhoneNumberModule} from 'ngx-international-phone-number';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component'
import {TokenInterceptor} from './shared/token.interceptor'



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AuthPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MainLayoutComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
