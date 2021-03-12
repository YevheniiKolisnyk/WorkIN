import {Component, Input} from '@angular/core'
import {Vacancy} from '../../shared/iterfaces'
import {elementsAnimations} from '../../shared/animations/elements.animations'

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss'],
  animations: elementsAnimations
})
export class VacancyComponent {
  @Input() vacancy: Vacancy
}
