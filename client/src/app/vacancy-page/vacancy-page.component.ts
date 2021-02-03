import {Component, OnInit} from '@angular/core'
import {User, Vacancy} from '../shared/iterfaces'
import {VacanciesService} from '../shared/services/vacancies.service'
import {ActivatedRoute} from '@angular/router'
import {AuthService} from '../shared/services/auth.service'

@Component({
  selector: 'app-vacancy-page',
  templateUrl: './vacancy-page.component.html',
  styleUrls: ['./vacancy-page.component.scss']
})
export class VacancyPageComponent implements OnInit {

  vacancy: Vacancy
  user: User = JSON.parse(localStorage.getItem('user'))
  showLoader: boolean = true

  constructor(
    private authService: AuthService,
    private vacanciesService: VacanciesService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.vacanciesService.getById(param.id).subscribe(res => {
        this.vacancy = res
        this.showLoader = false
      })
    })
  }

  includeInFavorite() {
    return this.vacancy.subscribers.some(item => item._id === this.user._id)
  }

  isApplied() {
    return this.vacancy.applicants.some(item => item._id === this.user._id)
  }

  addToFavorite() {
    this.vacanciesService.toFavorite(this.vacancy._id).subscribe((res) => {
      this.vacancy.subscribers = res.vacancy.subscribers
      this.user.favorite = res.user.favorite
      this.authService.updateUser(res.user)
    })
  }

  apply() {
    this.vacanciesService.applyVacancy(this.vacancy._id).subscribe(res => {
      this.vacancy.applicants = res.applicants
    })
  }
}
