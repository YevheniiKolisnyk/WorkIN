import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {CountriesService} from '../../shared/services/countries.service'
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
  countriesInputItem = ''
  countriesListHidden: boolean = true
  countriesShowError = false
  countriesSelectedIndex: number = -1
  countriesFilteredList: string[] = []

  cities: string[] = []
  citiesInputItem = ''
  citiesListHidden: boolean = true
  citiesShowError = false
  citiesSelectedIndex: number = -1
  citiesFilteredList: string[] = []

  constructor(
    private countriesService: CountriesService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef
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


  getFilteredList(type) {
    if (type === 'countries') {
      this.countriesListHidden = false
      this.ref.detectChanges()
      if (!this.countriesListHidden && this.countriesInputItem !== undefined) {
        this.countriesFilteredList = this.countries.filter((item) => {
          return item.toLowerCase().startsWith(this.countriesInputItem.toLowerCase())
        })
      }

      if (this.countriesInputItem !== undefined && !this.countries.find(item => {
        return item.toLowerCase().startsWith(this.countriesInputItem.toLowerCase())
      })) {
        this.countriesShowError = true
      } else {
        this.countriesShowError = false
      }
    } else {
      this.citiesListHidden = false
      this.ref.detectChanges()
      if (!this.citiesListHidden && this.citiesInputItem !== undefined) {
        this.citiesFilteredList = this.cities.filter((item) => {
          return item.toLowerCase().startsWith(this.citiesInputItem.toLowerCase())
        })
      }

      if (this.citiesInputItem !== undefined && !this.cities.find(item => {
        return item.toLowerCase().startsWith(this.citiesInputItem.toLowerCase())
      })) {
        this.citiesShowError = true
      } else {
        this.citiesShowError = false
      }
    }
  }

  selectItem(idx, click, type) {
    if (type === 'countries') {
      this.countriesInputItem = this.countriesFilteredList[idx]
      this.countriesSelectedIndex = idx
      this.ref.detectChanges()
      if (click) {
        this.countriesListHidden = true
        this.ref.detectChanges()
      }
    } else {
      this.citiesInputItem = this.citiesFilteredList[idx]
      this.citiesSelectedIndex = idx
      this.ref.detectChanges()
      if (click) {
        this.citiesListHidden = true
        this.ref.detectChanges()
      }
    }
  }


  toggleListDisplay(sender, type) {
    if (type === 'countries') {
      if (sender) {
        this.countriesInputItem = ''
        this.countriesFilteredList = this.countries
        this.citiesInputItem = ''
        this.citiesFilteredList = this.cities
        this.getFilteredList('countries')
        this.countriesListHidden = false
        this.ref.detectChanges()
      } else {
        if (!this.countries.some(item => item === this.countriesInputItem)) {
          this.countriesInputItem = ''
          this.countriesFilteredList = this.countries
          this.countriesListHidden = true
          this.ref.detectChanges()
        } else if (this.countriesInputItem) {
          this.cities = countriesJSON[this.countriesInputItem]
        }
        this.countriesFilteredList = this.countries
        this.countriesListHidden = true
        this.ref.detectChanges()
      }
    } else {
      if (sender) {
        this.citiesInputItem = ''
        this.citiesFilteredList = this.cities
        this.getFilteredList('cities')
        this.citiesListHidden = false
        this.ref.detectChanges()
      } else {
        if (!this.cities.some(item => item === this.citiesInputItem)) {
          this.citiesInputItem = ''
          this.citiesFilteredList = this.cities
          this.citiesListHidden = true
          this.ref.detectChanges()
        } else if (this.citiesInputItem) {
          this.citiesFilteredList = this.cities
          this.citiesListHidden = true
          this.ref.detectChanges()
        }
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
}


