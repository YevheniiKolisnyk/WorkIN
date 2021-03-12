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
import {TokenInterceptor} from './shared/token.interceptor';
import { VacancyPageComponent } from './vacancy-page/vacancy-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CreateVacancyPageComponent } from './create-vacancy-page/create-vacancy-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {YKDropDownFilterModule} from 'drop-down-filter';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { FormErrorComponent } from './shared/components/form-error/form-error.component';
import { AddListComponent } from './shared/components/add-list/add-list.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { FilterComponent } from './main-page/filter/filter.component';
import { CreateCvPageComponent } from './create-cv-page/create-cv-page.component';
import { UploadPhotoComponent } from './shared/components/upload-photo/upload-photo.component';
import { CvAddListComponent } from './shared/components/cv-add-list/cv-add-list.component';
import { ChipsComponent } from './shared/components/chips/chips.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { VacancyComponent } from './main-page/vacancy/vacancy.component';
import { ValidationErrorComponent } from './shared/components/validation-error/validation-error.component';
import { CvAddListSimplifiedComponent } from './shared/components/cv-add-list-simplified/cv-add-list-simplified.component';
import { DownloadPdfComponent } from './create-cv-page/download-pdf/download-pdf.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { FavoriteComponent } from './shared/components/favorite/favorite.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AuthPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MainLayoutComponent,
    MainPageComponent,
    VacancyPageComponent,
    UserPageComponent,
    CreateVacancyPageComponent,
    PageNotFoundComponent,
    CalendarComponent,
    FormErrorComponent,
    AddListComponent,
    ToastComponent,
    FilterComponent,
    CreateCvPageComponent,
    UploadPhotoComponent,
    CvAddListComponent,
    ChipsComponent,
    ProgressBarComponent,
    VacancyComponent,
    ValidationErrorComponent,
    CvAddListSimplifiedComponent,
    DownloadPdfComponent,
    LoaderComponent,
    FavoriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule,
    YKDropDownFilterModule
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
