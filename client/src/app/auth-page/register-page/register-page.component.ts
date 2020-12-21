import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {CountriesService} from '../../shared/services/countries.service'
import {City, Country, Region, State} from '../../shared/iterfaces'
import {AuthService} from '../../shared/services/auth.service'

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
    state: [
      {type: 'required', message: 'State is required'}
    ],
    region: [
      {type: 'required', message: 'Region is required'}
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

  countries: Country[] = []
  countriesInputItem = ''
  countriesListHidden: boolean = true
  countriesShowError = false
  countriesSelectedIndex: number = -1
  countriesFilteredList: Country[] = []

  states: State[] = []
  statesInputItem = ''
  statesListHidden: boolean = true
  statesShowError = false
  statesSelectedIndex: number = -1
  statesFilteredList: State[] = []

  regions: Region[] = []
  regionsInputItem = ''
  regionsListHidden: boolean = true
  regionsShowError = false
  regionsSelectedIndex: number = -1
  regionsFilteredList: Region[] = []

  cities: City[] = []
  citiesInputItem = ''
  citiesListHidden: boolean = true
  citiesShowError = false
  citiesSelectedIndex: number = -1
  citiesFilteredList: City[] = []

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
      state: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
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

    this.countriesService.getCountries().subscribe(res => {
      this.countries = res.geonames.map(item => {
        return {geonameName: item.countryName, geonameId: item.geonameId}
      })
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
    switch (type) {
      case 'countries':
        this.countriesListHidden = false
        this.ref.detectChanges()
        if (!this.countriesListHidden && this.countriesInputItem !== undefined) {
          this.countriesFilteredList = this.countries.filter((item) => {
            return item.geonameName.toLowerCase().startsWith(this.countriesInputItem.toLowerCase())
          })
        }

        if (this.countriesInputItem !== undefined && !this.countries.find(item => {
          return item.geonameName.toLowerCase().startsWith(this.countriesInputItem.toLowerCase())
        })) {
          this.countriesShowError = true
        } else {
          this.countriesShowError = false
        }
        break

      case 'states':
        this.statesListHidden = false
        this.ref.detectChanges()
        if (!this.statesListHidden && this.statesInputItem !== undefined) {
          this.statesFilteredList = this.states.filter((item) => {
            return item.geonameName.toLowerCase().startsWith(this.statesInputItem.toLowerCase())
          })
        }

        if (this.statesInputItem !== undefined && !this.states.find(item => {
          return item.geonameName.toLowerCase().startsWith(this.statesInputItem.toLowerCase())
        })) {
          this.statesShowError = true
        } else {
          this.statesShowError = false
        }
        break

      case 'regions':
        this.regionsListHidden = false
        this.ref.detectChanges()
        if (!this.regionsListHidden && this.regionsInputItem !== undefined) {
          this.regionsFilteredList = this.regions.filter((item) => {
            return item.geonameName.toLowerCase().startsWith(this.regionsInputItem.toLowerCase())
          })
        }

        if (this.regionsInputItem !== undefined && !this.regions.find(item => {
          return item.geonameName.toLowerCase().startsWith(this.regionsInputItem.toLowerCase())
        })) {
          this.regionsShowError = true
        } else {
          this.regionsShowError = false
        }
        break

      case 'cities':
        this.citiesListHidden = false
        this.ref.detectChanges()
        if (!this.citiesListHidden && this.citiesInputItem !== undefined) {
          this.citiesFilteredList = this.cities.filter((item) => {
            return item.geonameName.toLowerCase().startsWith(this.citiesInputItem.toLowerCase())
          })
        }

        if (this.citiesInputItem !== undefined && !this.cities.find(item => {
          return item.geonameName.toLowerCase().startsWith(this.citiesInputItem.toLowerCase())
        })) {
          this.citiesShowError = true
        } else {
          this.citiesShowError = false
        }
        break
    }
  }


  selectItem(idx, click, type) {
    switch (type) {
      case 'countries':
        this.countriesInputItem = this.countriesFilteredList[idx].geonameName
        this.countriesSelectedIndex = idx
        this.ref.detectChanges()
        if (click) {
          this.countriesListHidden = true
          this.ref.detectChanges()
        }
        break

      case 'states':
        this.statesInputItem = this.statesFilteredList[idx].geonameName
        this.statesSelectedIndex = idx
        this.ref.detectChanges()
        if (click) {
          this.statesListHidden = true
          this.ref.detectChanges()
        }
        break

      case 'regions':
        this.regionsInputItem = this.regionsFilteredList[idx].geonameName
        this.regionsSelectedIndex = idx
        this.ref.detectChanges()
        if (click) {
          this.regionsListHidden = true
          this.ref.detectChanges()
        }
        break

      case 'cities':
        this.citiesInputItem = this.citiesFilteredList[idx].geonameName
        this.citiesSelectedIndex = idx
        this.ref.detectChanges()
        if (click) {
          this.citiesListHidden = true
          this.ref.detectChanges()
        }
        break
    }
  }


  toggleListDisplay(sender, type) {
    switch (type) {
      case 'countries':
        if (sender) {
          this.countriesInputItem = ''
          this.countriesFilteredList = this.countries
          this.statesInputItem = ''
          this.statesFilteredList = this.states
          this.regionsInputItem = ''
          this.regionsFilteredList = this.regions
          this.citiesInputItem = ''
          this.citiesFilteredList = this.cities
          this.getFilteredList('countries')
          this.countriesListHidden = false
          this.ref.detectChanges()
        } else {
          if (!this.countries.some(item => item.geonameName === this.countriesInputItem)) {
            this.countriesInputItem = ''
            this.countriesFilteredList = this.countries
            this.countriesListHidden = true
            this.ref.detectChanges()
          } else if (this.countriesInputItem) {
            this.countriesService.getStates(this.countriesFilteredList[this.countriesSelectedIndex]).subscribe(res => {
              this.states = res.geonames.map(item => {
                return {geonameName: item.name, geonameId: item.geonameId}
              })
            })
          }
          this.countriesFilteredList = this.countries
          this.countriesListHidden = true
          this.ref.detectChanges()
        }
        break

      case 'states':
        if (sender) {
          this.statesInputItem = ''
          this.statesFilteredList = this.states
          this.regionsInputItem = ''
          this.regionsFilteredList = this.regions
          this.citiesInputItem = ''
          this.citiesFilteredList = this.cities
          this.getFilteredList('states')
          this.statesListHidden = false
          this.ref.detectChanges()
        } else {
          if (!this.states.some(item => item.geonameName === this.statesInputItem)) {
            this.statesInputItem = ''
            this.statesFilteredList = this.states
            this.statesListHidden = true
            this.ref.detectChanges()
          } else if (this.statesInputItem) {
            this.countriesService.getRegions(this.statesFilteredList[this.statesSelectedIndex]).subscribe(res => {
              this.regions = res.geonames.map(item => {
                return {geonameName: item.name, geonameId: item.geonameId}
              })
            })
          }
          this.statesFilteredList = this.states
          this.statesListHidden = true
          this.ref.detectChanges()
        }
        break

      case 'regions':
        if (sender) {
          this.regionsInputItem = ''
          this.regionsFilteredList = this.regions
          this.citiesInputItem = ''
          this.citiesFilteredList = this.cities
          this.getFilteredList('regions')
          this.regionsListHidden = false
          this.ref.detectChanges()
        } else {
          if (!this.regions.some(item => item.geonameName === this.regionsInputItem)) {
            this.regionsInputItem = ''
            this.regionsFilteredList = this.regions
            this.regionsListHidden = true
            this.ref.detectChanges()
          } else if (this.regionsInputItem) {
            this.countriesService.getCities(this.regionsFilteredList[this.regionsSelectedIndex]).subscribe(res => {
              if (!res.geonames.length) {
                this.cities = this.regions
              } else {
                this.cities = res.geonames.map(item => {
                  return {geonameName: item.name, geonameId: item.geonameId}
                })
              }
            })
          }
          this.regionsFilteredList = this.regions
          this.regionsListHidden = true
          this.ref.detectChanges()
        }
        break

      case 'cities':
        if (sender) {
          this.citiesInputItem = ''
          this.citiesFilteredList = this.cities
          this.getFilteredList('cities')
          this.citiesListHidden = false
          this.ref.detectChanges()
        } else {
          if (!this.cities.some(item => item.geonameName === this.citiesInputItem)) {
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
        break
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


