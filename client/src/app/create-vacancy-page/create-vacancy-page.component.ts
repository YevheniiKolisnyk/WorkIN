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

  @ViewChild('fileInput') fileInputRef: ElementRef

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
  showExperienceList:boolean = false

  contractTypes: string[] = [
    'Employment contract',
    'Commission contract',
    'Specific-task contract',
    'Commission contract with an economic entity',
    'Student and postgraduate internship contract'
  ]

  workTimes: {title: string, description: string}[] = [
    {title: 'Full-Time', description: 'Full-time work schedules often require a commitment of 37 to 40 hours per week. Employees can expect to receive benefits if they work this type of schedule because of the long hours they put in. These benefits can include being able to take a vacation and taking sick days. Other benefits include health insurance and varying retirement plan options. While full-time schedules will vary depending on which company you work for, most of the time, employees are expected to work the same shift every week. The most commonly discussed full-time work schedule would be the variant of 9:00 AM to 5:00 PM, Monday through Friday. These hours amount to 40 hours per week.'},
    {title: 'Part-Time', description: 'Employees will be able to immediately tell the difference between working full-time and part-time because of the number of hours. A part-time schedule is any schedule that has fewer hours than full-time employment. One key benefit of working part-time is that the employee is allowed to have greater flexibility to maintain other responsibilities outside of work. However, one key drawback to working a part-time schedule is that employees will not be given the same kind of benefits that are given to full-time employees. Hours can be erratic and inconsistent on a weekly basis. An example of a part-time schedule is Monday through Wednesday from 7:00 to 11:00 AM and the weekends from 11:00 AM to 7:00 PM.'},
    {title: 'Fixed', description: 'A fixed work schedule is made up of the same number of hours and days worked per week. When the employer and the employee both agree on the number of hours and days that will be worked, fixed work schedules tend to stay consistent. Fixed work schedules are similar to the standard full-time work schedule, but the key difference is that they can apply to alternative work times such as Tuesday through Saturday from 10:00 AM to 6:00 PM. For employers, fixed schedules allow for long-term planning, making it easier to calculate labor costs. With this schedule, you don’t have to change your regular template every time you make a new work schedule.'},
    {title: 'Flextime', description: 'Also known as a flexible work schedule, this variant is less rigid than a fixed work schedule. An employee who works a flexible work schedule is someone that is required to work core hours with the rest of their hours to be worked according to the employee’s preferences. Employees work together with their employers to determine the times the employee will work. Depending on the policy of the employer, employees may be expected to work a minimum number of hours or be at work at a certain daily block of time. However, shifts can often be switched with other employees to satisfy the needs of both the employer and the busy life of the employee.'},
  ]

  experience: string[] = [
    'Trainee',
    'Junior',
    'Middle',
    'Senior'
  ]

  showContracts: boolean = false

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
        companyPic: new FormControl(null),
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
    if (file) {
      this.image = file

      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result
      }

      reader.readAsDataURL(file)
    } else {
      return
    }
  }

  deleteImg() {
    this.imagePreview = ''
    this.image = undefined
    this.form.controls['companyPic'].reset()
  }

  setExperienceItem(item) {
    this.form.controls['experience'].setValue(item)
    this.showExperienceList = false
  }

  changeUserPic() {
    this.fileInputRef.nativeElement.click()
  }

  getCities(event) {
    this.countriesInputItem = event
    this.cities = countriesJSON[event]
  }
}
