import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
  @Input() title: string
  @Input() dataArray: string[]
  @Input() ListHidden: boolean = true
  @Input() ShowError: boolean = false
  @Output() outputItem: EventEmitter<string> = new EventEmitter<string>()
  InputItem = ''
  FilteredList: string[] = []
  SelectedIndex: number = -1

  constructor() {
  }

  ngOnInit(): void {
  }

  getFilteredList() {
    this.ListHidden = false

    if (!this.ListHidden && this.InputItem !== undefined) {
      this.FilteredList = this.dataArray.filter((item) => {
        return item.toLowerCase().startsWith(this.InputItem.toLowerCase())
      })
    }

    if (this.InputItem !== undefined && !this.dataArray.find(item => {
      return item.toLowerCase().startsWith(this.InputItem.toLowerCase())
    })) {
      this.ShowError = true
    } else {
      this.ShowError = false
    }
  }

  selectItem(idx, click) {
    this.InputItem = this.FilteredList[idx]
    this.SelectedIndex = idx
    this.outputItem.emit(this.InputItem)
    if (click) {
      this.ListHidden = true
    }
  }

  toggleListDisplay(sender) {
    if (sender) {
      this.InputItem = ''
      this.FilteredList = this.dataArray
      this.getFilteredList()
      this.ListHidden = false

    } else {
      if (!this.dataArray.some(item => item === this.InputItem)) {
        this.InputItem = ''
        this.FilteredList = this.dataArray
        this.ListHidden = true

      }
      this.FilteredList = this.dataArray
      this.ListHidden = true

    }
  }


}
