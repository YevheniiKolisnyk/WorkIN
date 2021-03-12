import {Component, Input, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../../shared/services/auth.service'

import countriesJSON from '../../shared/countries.min.json'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  @Input() canAnimate
  form: FormGroup
  error = ''
  errorMessages = {
    firsName: [
      {type: 'required', message: 'First name is required'}
    ],
    lastName: [
      {type: 'required', message: 'Last name is required'}
    ],
    email: [
      {type: 'required', message: 'Email is required'},
      {type: 'email', message: 'Invalid email'}
    ],
    country: [
      {type: 'required', message: 'Country is required'}
    ],
    city: [
      {type: 'required', message: 'City is required'}
    ],
    phone: [
      {type: 'required', message: 'Phone number is required'},
      {type: 'minlength', message: 'Phone number too short'},
      {type: 'maxlength', message: 'Phone number too long'}
    ],
    password: [
      {type: 'required', message: 'Password is required'},
      {type: 'minlength', message: 'Password cannot be shorter than 8 characters'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Password is required'},
      {type: 'mustMatch', message: 'Passwords must match'}
    ]
  }
  countries: string[] = Object.keys(countriesJSON)
  country: string
  cities: string[] = []
  city: string

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(8)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl(null, Validators.required),
    }, {
      validator: this.comparePasswords('password', 'confirmPassword')
    })
  }

  comparePasswords(controlName: string, matchingControlName: string) {
    return (form: FormGroup) => {
      const control = form.controls[controlName]
      const matchingControl = form.controls[matchingControlName]

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true})
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  onSubmit() {
    this.authService.register(this.form.value).subscribe(
      res => {
        this.form.reset()
      },
      error => {
        console.log(error.error.message)
      }
    )
  }

  getCities(event) {
    this.country = event
    this.cities = countriesJSON[event]
  }
}
