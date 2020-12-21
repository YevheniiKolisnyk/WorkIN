import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './shared/main-layout/main-layout.component'
import {MainPageComponent} from './main-page/main-page.component'
import {AuthPageComponent} from './auth-page/auth-page.component'

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', component: MainPageComponent}
    ]},
  {path: 'auth', component: AuthPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
