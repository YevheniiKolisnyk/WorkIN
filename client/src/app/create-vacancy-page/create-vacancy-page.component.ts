import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {VacanciesService} from '../shared/services/vacancies.service'
import countriesJSON from '../shared/countries.min.json'


@Component({
  selector: 'app-create-vacancy-page',
  templateUrl: './create-vacancy-page.component.html',
  styleUrls: ['./create-vacancy-page.component.scss']
})
export class CreateVacancyPageComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef

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

  image: File
  form: FormGroup
  imagePreview: string | ArrayBuffer = ''

  constructor(
    private formBuilder: FormBuilder,
    private vacancyService: VacanciesService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        title: new FormControl('', Validators.required),
        companyName: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        expiryTime: new FormControl('', Validators.required),
        contractType: new FormControl('', Validators.required),
        workTime: new FormControl('', Validators.required),
        experience: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        expectations: new FormControl('', Validators.required),
        responsibilities: new FormControl('', Validators.required),
        benefits: new FormControl('', Validators.required),
        salary: new FormControl('', Validators.required),
        tags: new FormControl('', Validators.required)
      }
    )
  }

  getFilteredList(type) {
    if (type === 'countries') {
      this.countriesListHidden = false

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

      if (!this.citiesListHidden && this.citiesInputItem !== undefined) {
        console.log(this.cities)
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

      if (click) {
        this.countriesListHidden = true

      }
    } else {
      this.citiesInputItem = this.citiesFilteredList[idx]
      this.citiesSelectedIndex = idx

      if (click) {
        this.citiesListHidden = true

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

      } else {
        if (!this.countries.some(item => item === this.countriesInputItem)) {
          this.countriesInputItem = ''
          this.countriesFilteredList = this.countries
          this.countriesListHidden = true

        } else if (this.countriesInputItem) {
          this.cities = countriesJSON[this.countriesInputItem]
        }
        this.countriesFilteredList = this.countries
        this.countriesListHidden = true

      }
    } else {
      if (sender) {
        this.citiesInputItem = ''
        this.citiesFilteredList = this.cities
        this.getFilteredList('cities')
        this.citiesListHidden = false

      } else {
        if (!this.cities.some(item => item === this.citiesInputItem)) {
          this.citiesInputItem = ''
          this.citiesFilteredList = this.cities
          this.citiesListHidden = true

        } else if (this.citiesInputItem) {
          this.citiesFilteredList = this.cities
          this.citiesListHidden = true

        }
      }
    }
  }


  onSubmit() {
    const data = this.form.value
    data.location = `${this.form.value.country}, ${this.form.value.city}`
    this.vacancyService.createVacancy(data, this.image).subscribe(res => {
      console.log(res)
    })
  }

  onFileUpload(event) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }
}
