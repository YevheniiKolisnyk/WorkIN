import {Component, OnInit} from '@angular/core'
import {User, Vacancy} from '../shared/iterfaces'
import {VacanciesService} from '../shared/services/vacancies.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-vacancy-page',
  templateUrl: './vacancy-page.component.html',
  styleUrls: ['./vacancy-page.component.scss']
})
export class VacancyPageComponent implements OnInit {

  vacancy: Vacancy
  user: User
  showLoader: boolean = true

  constructor(
    private vacanciesService: VacanciesService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
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
    this.vacanciesService.toFavorite(this.vacancy._id).subscribe(() => {

      if (this.user.favorite.some(item => item._id === this.vacancy._id)) {
        this.vacancy.subscribers = this.vacancy.subscribers.filter(item => item._id !== this.user._id)
        this.user.favorite = this.user.favorite.filter(item => item._id !== this.vacancy._id)
        localStorage.setItem('user', JSON.stringify(this.user))

      } else {
        this.user.favorite.push({_id: this.vacancy._id})
        this.vacancy.subscribers.push({_id: this.user._id})
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    })
  }

  apply() {
    this.vacanciesService.applyVacancy(this.vacancy._id).subscribe(res => {
      this.vacancy.applicants = res.applicants
    })
  }
}
