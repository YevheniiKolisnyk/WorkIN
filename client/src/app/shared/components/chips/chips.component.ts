import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormGroup} from '@angular/forms'
import {elementsAnimations} from '../../animations/elements.animations'

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  animations: elementsAnimations
})
export class ChipsComponent implements OnInit {

  @Input() parentFormGroup: FormGroup
  @Input() controlName: string
  @Input() title: string
  @Input() placeholder: string
  @Output() outputArray: EventEmitter<string[]> = new EventEmitter<string[]>()
  itemList: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

  addItem() {
    if (!this.parentFormGroup.value[this.controlName].trim()) {
      return
    }
    this.itemList.push(this.parentFormGroup.value[this.controlName])
    this.outputArray.emit(this.itemList)
    this.parentFormGroup.controls[this.controlName].setValue('')
  }

  deleteItem(idx) {
    this.itemList.splice(idx, 1)
  }
}
