import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormGroup} from '@angular/forms'
import {elementsAnimations} from '../../animations/elements.animations'

@Component({
  selector: 'app-cv-add-list-simplified',
  templateUrl: './cv-add-list-simplified.component.html',
  styleUrls: ['./cv-add-list-simplified.component.scss'],
  animations: elementsAnimations
})
export class CvAddListSimplifiedComponent implements OnInit {

  @Input() title: string
  @Input() parentFormGroup: FormGroup
  @Input() leftControlName: string
  @Input() leftControlTitle: string
  @Input() rightControlName: string
  @Input() rightControlTitle: string
  @Output() outputList: EventEmitter<any> = new EventEmitter<any>()
  languageLevelsArray: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native']
  canShowInput: boolean = false
  itemList = []
  showValidatorErrors: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  saveToList() {
    if (!this.parentFormGroup.valid) {
      this.showValidatorErrors = true
      return
    }
    this.itemList.push({
      [this.leftControlName]: this.parentFormGroup.controls[this.leftControlName].value,
      [this.rightControlName]: this.parentFormGroup.controls[this.rightControlName].value
    })
    this.outputList.emit(this.itemList)
    this.canShowInput = false
    this.parentFormGroup.reset()
  }

  deleteListItem(idx) {
    this.itemList.splice(idx, 1)
    this.outputList.emit(this.itemList)
  }
}
