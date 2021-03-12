import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import countriesJSON from '../shared/countries.min.json'
import {CvService} from '../shared/services/cv.service'
import {ItemList} from '../shared/components/cv-add-list/cv-add-list.component'
import {ToastService} from '../shared/services/toast.service'

interface Links {
  linkLabel: string
  link: string
}

interface Language {
  languageName: string
  languageLevel: string
}

@Component({
  selector: 'app-create-cv-page',
  templateUrl: './create-cv-page.component.html',
  styleUrls: ['./create-cv-page.component.scss']
})


export class CreateCvPageComponent implements OnInit {


  image: File
  form: FormGroup
  days: number[] = Array.from(Array(31), (_, x) => x + 1)
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  years: string[]
  countries: string[] = Object.keys(countriesJSON)
  country: string
  cities: string[] = []
  city: string
  employmentHistory: ItemList[] = []
  educationHistory: ItemList[] = []
  skills: string[] = []
  links: Links[] = []
  languages: Language[] = []
  showLoader: boolean = false
  pdfUrl: string
  submitted: boolean = false
  showPdf: boolean = false

  showValidatorErrors: boolean = false
  errorsArray = {
    userPic: [
      {type: 'required', message: 'User picture required.'},
    ],
    position: [
      {type: 'required', message: 'Position field required.'},
    ],
    firstName: [
      {type: 'required', message: 'First name required.'},
    ],
    lastName: [
      {type: 'required', message: 'Last name required.'},
    ],
    dateOfBirth: [
      {type: 'required', message: 'Invalid date.'},
    ],
    country: [
      {type: 'required', message: 'Country required.'},
    ],
    city: [
      {type: 'required', message: 'City required.'},
    ],
    phone: [
      {type: 'pattern', message: 'Invalid phone number.'},
    ],
    email: [
      {type: 'required', message: 'Email required.'},
      {type: 'email', message: 'Invalid email.'},
    ],
    aboutYourself: [
      {type: 'required', message: 'About yourself field required.'},
      {type: 'minlength', message: 'This field cannot be shorter than 10 characters.'},
      {type: 'maxlength', message: 'This field cannot be longer than 100 characters.'}
    ],
    education: {
      university: [
        {type: 'required', message: 'University name required.'}
      ],
      degree: [
        {type: 'required', message: 'Degree field required.'}
      ],
      educationStart: [
        {type: 'required', message: 'Start date required.'}
      ],
      educationEnd: [
        {type: 'required', message: 'End date required.'},
        {type: 'invalidDate', message: 'Invalid date.'}
      ],
      educationCountry: [
        {type: 'required', message: 'Country field required.'}
      ],
      educationCity: [
        {type: 'required', message: 'City field required.'}
      ]
    },
    employmentHistory: {
      jobTitle: [
        {type: 'required', message: 'Job title required.'}
      ],
      employer: [
        {type: 'required', message: 'Employer field required.'}
      ],
      workStart: [
        {type: 'required', message: 'Start date required.'}
      ],
      workEnd: [
        {type: 'required', message: 'End date required.'},
        {type: 'invalidDate', message: 'Invalid date.'}
      ],
      workCountry: [
        {type: 'required', message: 'Country field required.'}
      ],
      workCity: [
        {type: 'required', message: 'City field required.'}
      ]
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private cvService: CvService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.years = this.getYears()
    this.form = this.formBuilder.group({
      userPic: new FormControl(null, Validators.required),
      position: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      nationality: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.pattern("[- +()0-9]{6,}")),
      aboutYourself: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(250)
      ]),
      skills: new FormControl(''),
      linksGroup: this.formBuilder.group({
        linkLabel: new FormControl('', Validators.required),
        link: new FormControl('', Validators.required),
      }),
      educationGroup: this.formBuilder.group({
        university: new FormControl('', Validators.required),
        degree: new FormControl('', Validators.required),
        educationStart: new FormControl('', Validators.required),
        educationEnd: new FormControl('', [
          Validators.required,
          this.compareDates('educationStart')
        ]),
        educationCountry: new FormControl('', [Validators.required]),
        educationCity: new FormControl('', Validators.required),
      }),
      employmentHistoryGroup: this.formBuilder.group({
        jobTitle: new FormControl('', Validators.required),
        employer: new FormControl('', Validators.required),
        workStart: new FormControl('', Validators.required),
        workEnd: new FormControl('', Validators.required),
        workCountry: new FormControl('', Validators.required),
        workCity: new FormControl('', Validators.required),
      }),
      languagesGroup: this.formBuilder.group({
        languageName: new FormControl(''),
        languageLevel: new FormControl('')
      })
    })
  }

  compareDates(controlNameToCompare: string) {
    return (control: FormControl) => {
      const parent = control.parent
      if (!parent) {
        return null
      }
      if (control.value === 'Present') {
        return null
      } else if (new Date(control.value).getTime() - new Date(parent.controls[controlNameToCompare].value).getTime() <= 1) {
        return {invalidDate: true}
      }
      return null

    }
  }

  getYears() {
    const years = []
    const currentYear = new Date().getFullYear() - 16
    let lastAvailableYear = currentYear - 105

    while (currentYear > lastAvailableYear) {
      years.push(lastAvailableYear++)
    }
    return years.reverse()
  }

  onImageUpload(image) {
    this.image = image
  }

  setDay(day) {
    this.form.controls.day.setValue(day)
  }

  setMonth(month) {
    this.form.controls.month.setValue(month)
  }

  setYear(year) {
    this.form.controls.year.setValue(year)
  }

  setCountry(country) {
    this.country = country
    this.cities = countriesJSON[country]
  }

  setCity(city) {
    this.city = city
  }


  isControlValid(controlName) {
    if (controlName === 'dateOfBirth') {
      if (this.showValidatorErrors && (
        !this.form.controls.day.valid ||
        !this.form.controls.month.valid ||
        !this.form.controls.year.valid
      )) {
        return 'required'
      } else {
        return null
      }
    }

    if (!this.form.controls[controlName].valid && this.showValidatorErrors) {
      return Object.keys(this.form.controls[controlName].errors).join("")
    } else {
      return null
    }
  }

  onSubmit(element) {
    this.form.get('linksGroup').disable()
    this.form.get('employmentHistoryGroup').disable()
    this.form.get('educationGroup').disable()
    this.form.get('languagesGroup').disable()
    if (!this.form.valid) {
      element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      this.showValidatorErrors = true
      this.form.get('linksGroup').enable()
      this.form.get('employmentHistoryGroup').enable()
      this.form.get('educationGroup').enable()
      this.form.get('languagesGroup').enable()
      return
    }
    this.submitted = true
    this.showLoader = true
    const data = this.form.value
    data.skills = JSON.stringify(this.skills)
    data.month = this.months.indexOf(this.form.controls.month.value) + 1
    data.links = JSON.stringify(this.links)
    data.languages = JSON.stringify(this.languages)
    data.employmentHistory = JSON.stringify(this.employmentHistory)
    data.educationHistory = JSON.stringify(this.educationHistory)
    this.cvService.createCv(data, this.image).subscribe(res => {
      const blob = new Blob([res], {type: 'application/pdf'})
      this.pdfUrl = URL.createObjectURL(blob)
      this.showLoader = false
      this.showPdf = true
    })
    this.form.get('linksGroup').enable()
    this.form.get('employmentHistoryGroup').enable()
    this.form.get('educationGroup').enable()
    this.form.get('languagesGroup').enable()
  }


  test() {
    this.submitted = true
    this.showPdf = !this.showPdf
  }
}
