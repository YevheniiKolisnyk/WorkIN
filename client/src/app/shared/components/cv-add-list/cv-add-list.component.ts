import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormGroup} from '@angular/forms'
import countriesJSON from '../../countries.min.json'
import {elementsAnimations} from '../../animations/elements.animations'

export interface ItemList {
  title: string
  org: string
  startDate: Date
  endDate: Date
  country: string
  city: string
}

@Component({
  selector: 'app-cv-add-list',
  templateUrl: './cv-add-list.component.html',
  styleUrls: ['./cv-add-list.component.scss'],
  animations: elementsAnimations
})
export class CvAddListComponent implements OnInit {


  degrees: string[] = [
    'Associate Degrees',
    'Bachelor’s Degrees',
    'Master’s Degrees',
    'Doctoral Degrees'
  ]

  @Input() parentFormGroup: FormGroup
  @Input() title: string
  @Input() titleControlName: string
  @Input() orgControlName: string
  @Input() startDateControlName: string
  @Input() endDateControlName: string
  @Input() countryControlName: string
  @Input() cityControlName: string
  @Input() labelTitle: string
  @Input() showOrgDropdown: boolean
  @Input() validationErrors
  @Output() outputList: EventEmitter<ItemList[]> = new EventEmitter<ItemList[]>()
  canShowInput: boolean = false
  countries: string[] = Object.keys(countriesJSON)
  country: string
  cities: string[] = []
  city: string
  startDate: Date
  endDate: any
  itemList: ItemList[] = []
  showValidatorErrors: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  setCountry(country) {
    this.country = country
    this.cities = countriesJSON[country]
  }

  setStartDate(date) {
    this.startDate = date
  }

  setEndDate(date) {
    this.endDate = date
  }

  compareDate() {
    if ((this.endDate.getTime() - this.startDate.getTime()) >= 1 || this.endDate === 'Present') {
      return
    } else {
    }
  }

  isControlValid(controlName) {
    if (!this.parentFormGroup.controls[controlName].valid && this.showValidatorErrors) {
      return Object.keys(this.parentFormGroup.controls[controlName].errors).join("")
    } else {
      return null
    }
  }

  saveUniversity() {
    if (!this.parentFormGroup.valid) {
      this.showValidatorErrors = true
      return
    }
    const item: ItemList = {
      title: this.parentFormGroup.controls[this.titleControlName].value,
      org: this.parentFormGroup.controls[this.orgControlName].value,
      startDate: this.parentFormGroup.controls[this.startDateControlName].value,
      endDate: this.parentFormGroup.controls[this.endDateControlName].value,
      country: this.parentFormGroup.controls[this.countryControlName].value,
      city: this.parentFormGroup.controls[this.cityControlName].value,
    }
    this.itemList.push(item)
    this.parentFormGroup.reset()
    this.canShowInput = false
    this.outputList.emit(this.itemList)
    this.showValidatorErrors = false
    this.parentFormGroup.reset()
  }

  deleteListItem(idx) {
    this.itemList.splice(idx, 1)
    this.outputList.emit(this.itemList)
  }
}
