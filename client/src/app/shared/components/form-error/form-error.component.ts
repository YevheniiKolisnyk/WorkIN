import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {

  @Input() errorsMessages: { type: string, message: string }[]
  @Input() displayError: string

}
