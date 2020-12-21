import {Component, Input, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../../shared/services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @Input() canAnimate

  errorMessages = {
    email: [
      {type: 'required', message: 'Email is required'},
      {type: 'email', message: 'Invalid email'}
    ],
    password: [
      {type: 'required', message: 'Password is required'},
      {type: 'minlength', message: 'Password cannot be shorter than 8 characters'}
    ]
  }

  form: FormGroup

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  onSubmit() {

    this.authService.login(this.form.value).subscribe(
      res => {
        this.router.navigate(['/'])
      },
      error => {
        console.log(error.error.message)
      }
      )
  }
}
