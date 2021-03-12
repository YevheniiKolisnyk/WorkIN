import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {VacanciesService} from '../../shared/services/vacancies.service'
import {Vacancy} from '../../shared/iterfaces'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() tags
  @Output() response: EventEmitter<Vacancy[] | boolean> = new EventEmitter<Vacancy[] | boolean>()
  @Output() isPending: EventEmitter<boolean> = new EventEmitter<boolean>()
  checkboxValues: string[] = []

  constructor(
    private vacanciesService: VacanciesService
  ) { }

  ngOnInit(): void {
  }

  selectFilter(event, tag) {
    this.isPending.emit(true)
    if (event.target.checked) {
      this.checkboxValues.push(tag)
      this.vacanciesService.searchByTags(this.checkboxValues).subscribe(res => {
        this.response.emit(res)
        this.isPending.emit(false)
      })
    } else {
      this.checkboxValues = this.checkboxValues.filter(el => el != tag)
      if (!this.checkboxValues.length) {
        this.response.emit(false)
      } else {
        this.vacanciesService.searchByTags(this.checkboxValues).subscribe(res => {
          this.response.emit(res)
          this.isPending.emit(false)
        })
      }
    }


  }
}
