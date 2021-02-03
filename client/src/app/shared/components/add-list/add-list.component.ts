import {Component, EventEmitter, Input, Output,} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent {

  @Input() title: string
  @Input() parentFormGroup: FormGroup
  @Input() controlName: string
  @Output() outputItem: EventEmitter<string[]> = new EventEmitter<string[]>()
  canShowInput: boolean = false
  itemList: string[] = []

  constructor() {
  }


  addListItem() {
    if (!this.parentFormGroup.value[this.controlName]) {
      return
    }
    this.itemList.push(this.parentFormGroup.value[this.controlName])
    this.outputItem.emit(this.itemList)
    this.parentFormGroup.controls[this.controlName].setValue('')
    this.canShowInput = false
  }

  deleteListItem(idx) {
    this.itemList.splice(idx, 1)
    this.parentFormGroup.controls[this.controlName].markAsUntouched()
  }

}
