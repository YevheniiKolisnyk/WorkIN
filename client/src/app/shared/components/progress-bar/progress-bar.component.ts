import {Component, Input, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() parentFormGroup: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

  progressBarPercent() {
    let percent = 0
    const controls = Object.keys(this.parentFormGroup.controls)
    controls.forEach(key => {
      if (this.parentFormGroup.get(key).valid) {
        percent++
      }


    })
    return Math.round((percent / controls.length) * 100)
  }
}
