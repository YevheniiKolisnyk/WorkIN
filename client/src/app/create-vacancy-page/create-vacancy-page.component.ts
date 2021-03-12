import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {VacanciesService} from '../shared/services/vacancies.service'
import countriesJSON from '../shared/countries.min.json'
import {Router} from '@angular/router'

@Component({
  selector: 'app-create-vacancy-page',
  templateUrl: './create-vacancy-page.component.html',
  styleUrls: ['./create-vacancy-page.component.scss'],
})
export class CreateVacancyPageComponent implements OnInit, AfterViewInit {

  @ViewChild('fileInput') fileInputRef: ElementRef
  @ViewChild('progressBar') progressBarRef: ElementRef

  errorsArray = {
    title: [
      {type: 'required', message: 'Title field cannot be empty.'},
      {type: 'minlength', message: 'This field cannot be shorter than 6 characters.'},
      {type: 'maxlength', message: 'This field cannot be longer than 30 characters.'}
    ],
    companyName: [
      {type: 'required', message: 'Company name field cannot be empty.'},
      {type: 'minlength', message: 'This field cannot be shorter than 2 characters.'},
      {type: 'maxlength', message: 'This field cannot be longer than 15 characters.'}
    ],
    country: [
      {type: 'required', message: 'Country required.'},
    ],
    city: [
      {type: 'required', message: 'City required.'},
    ],
    companyPic: [
      {type: 'required', message: 'Company picture required.'},
    ],
    expiryTime: [
      {type: 'required', message: 'Select until what date your vacancy will be active.'},
      {type: 'minlength', message: 'Too short :('},
    ],
    contractType: [
      {type: 'required', message: 'Contract type field cannot be empty.'},
    ],
    workTime: [
      {type: 'required', message: 'Work time field cannot be empty.'},
    ],
    experience: [
      {type: 'required', message: 'experience field cannot be empty.'},
    ],
    description: [
      {type: 'required', message: 'Work time field cannot be empty.'},
      {type: 'minlength', message: 'This field cannot be shorter than 30 characters.'},
    ],
    expectations: [
      {type: 'minlength', message: 'The minimum number of expectations is 3.'},
    ],
    responsibilities: [
      {type: 'minlength', message: 'The minimum number of responsibilities is 3.'},
    ],
    benefits: [
      {type: 'minlength', message: 'The minimum number of benefits is 3.'},
    ],
    salary: [
      {type: 'required', message: 'Salary field cannot be empty.'},
    ],
    tags: [
      {type: 'minlength', message: 'The minimum number of tags is 3.'},
    ],
  }

  countries: string[] = Object.keys(countriesJSON)
  countriesInputItem = ''

  cities: string[] = []
  citiesItem = ''


  image: File
  form: FormGroup
  completeBar: number = 0
  progressBarOffset: number
  responsibilities: string[] = []
  expectations: string[] = []
  benefits: string[] = []
  tags: string[] = []
  expiryDays: number
  showValidatorErrors: boolean = false
  contractTypes: string[] = [
    'Employment contract',
    'Commission contract',
    'Specific-task contract',
    'Commission contract with an economic entity',
    'Student and postgraduate internship contract'
  ]
  workTimes: string[] = [
    'Full-Time',
    'Part-Time',
    'Fixed',
    'Flextime',
  ]
  experience: string[] = [
    'Trainee',
    'Junior',
    'Middle',
    'Senior'
  ]

  submitted: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private vacancyService: VacanciesService,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.renderer.listen('window', 'scroll', () => {
      if (window.pageYOffset >= this.progressBarOffset) {
        this.renderer.addClass(this.progressBarRef.nativeElement, 'sticky')
      } else {
        this.renderer.removeClass(this.progressBarRef.nativeElement, 'sticky')
      }
    })
  }

  ngOnInit(): void {
    setInterval(() => {
      console.log(this.form.get('tags').valid)
    }, 1000)
    this.form = this.formBuilder.group({
        title: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]),
        companyName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15)
        ]),
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        companyPic: new FormControl(null, Validators.required),
        expiryTime: new FormControl('', Validators.required),
        contractType: new FormControl('', Validators.required),
        workTime: new FormControl('', Validators.required),
        experience: new FormControl('', Validators.required),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(30)
        ]),
        salary: new FormControl('', Validators.required),
        expectations: new FormControl(''),
        responsibilities: new FormControl(''),
        benefits: new FormControl(''),
        tags: new FormControl('')
      }
    )
  }

  ngAfterViewInit() {
    this.progressBarOffset = this.progressBarRef.nativeElement.offsetTop

  }

  onImageUpload(image) {
    this.image = image
  }

  progressBarPercent() {
    let percent = 0
    Object.keys(this.form.controls).forEach(key => {
      if (this.form.get(key).valid) {
        percent++
      }


    })
    return Math.round((percent / 15) * 100)
  }


  getCities(event) {
    this.countriesInputItem = event
    this.cities = countriesJSON[event]
  }

  getExpiryDays(event) {
    this.expiryDays = event
  }

  isControlValid(controlName) {
    if (!this.form.controls[controlName].valid && this.showValidatorErrors) {
      return Object.keys(this.form.controls[controlName].errors).join("")
    } else {
      return null
    }
  }

  submit() {
    if (!this.form.valid) {
      this.showValidatorErrors = true
      return
    }
    const data = this.form.value
    data.location = `${this.form.value.country}, ${this.form.value.city}`
    data.benefits = JSON.stringify(this.benefits)
    data.expectations = JSON.stringify(this.expectations)
    data.responsibilities = JSON.stringify(this.responsibilities)
    data.tags = JSON.stringify(this.tags)
    data.expiryTime = this.expiryDays
    this.vacancyService.createVacancy(data, this.image).subscribe(res => {
      this.router.navigate(['/vacancy/', res._id])
    })
  }

}
