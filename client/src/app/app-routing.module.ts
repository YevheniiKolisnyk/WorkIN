import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {MainLayoutComponent} from './shared/main-layout/main-layout.component'
import {MainPageComponent} from './main-page/main-page.component'
import {AuthPageComponent} from './auth-page/auth-page.component'
import {VacancyPageComponent} from './vacancy-page/vacancy-page.component'
import {AuthGuard} from './shared/auth.guard'
import {UserPageComponent} from './user-page/user-page.component'
import {CreateVacancyPageComponent} from './create-vacancy-page/create-vacancy-page.component'
import {PageNotFoundComponent} from './page-not-found/page-not-found.component'

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', component: MainPageComponent},
      {path: 'vacancy/:id', component: VacancyPageComponent},
      {path: 'user/:id', component: UserPageComponent},
      {path: 'createVacancy', canActivate: [AuthGuard], component: CreateVacancyPageComponent}
    ]
  },
  {path: 'auth', component: AuthPageComponent},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
