import {Component, Input, OnInit} from '@angular/core'
import {VacanciesService} from '../../services/vacancies.service'
import {AuthService} from '../../services/auth.service'
import {elementsAnimations} from '../../animations/elements.animations'

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  animations: elementsAnimations
})
export class FavoriteComponent implements OnInit {

  @Input() id: string

  constructor(
    private vacanciesService: VacanciesService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  favorite() {
    this.vacanciesService.toFavorite(this.id).subscribe(res => {
      this.authService.updateUser(res.user)
    })
  }

  includeInFavorite() {
    return this.authService.currentUserValue.favorite.some(item => item._id === this.id)
  }
}
