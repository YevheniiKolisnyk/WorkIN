import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core'
import {VacanciesService} from '../shared/services/vacancies.service'
import {User, Vacancy} from '../shared/iterfaces'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {ProfileService} from '../shared/services/profile.service'
import {AuthService} from '../shared/services/auth.service'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  @ViewChild('locationInput') locationInputRef: ElementRef
  @ViewChild('dropdownContainer') locationDropdownContainerRef: ElementRef
  @ViewChild('locationDropdown') locationDropdownRef: ElementRef

  user: User
  canShowStars: boolean = false
  form: FormGroup

  showLoader: boolean = true
  tags: string[]
  checkboxValues: string[] = []
  vacancies: Vacancy[] = []
  showLocationMenu: boolean = false
  locations: string[]
  showDropdownError: boolean = false
  filteredList: string[] = []
  searchQuery: string
  locationQuery: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vacanciesService: VacanciesService,
    private FormBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private profileService: ProfileService,
    private authService: AuthService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.locationDropdownRef) {
        return
      }
      if (!this.locationDropdownContainerRef.nativeElement.contains(e.target)) {
        this.closeLocationMenu()
      }
    })
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('keywords') === 'ALL') {
      this.searchQuery = ''
    } else if (this.route.snapshot.queryParamMap.get('keywords')) {

      this.searchQuery = this.route.snapshot.queryParamMap.get('keywords')
    }

    if (this.route.snapshot.queryParamMap.get('location') === 'GLOBAL') {
      this.locationQuery = ''
    } else if (this.route.snapshot.queryParamMap.get('location')) {
      this.locationQuery = this.route.snapshot.queryParamMap.get('location')
    }

    this.form = this.FormBuilder.group({
      searchInput: new FormControl(this.searchQuery, Validators.required),
      locationInput: new FormControl(this.locationQuery)
    })

    this.authService.currentUser.subscribe(user => {
      this.user = user
    })
    this.getAll()
  }

  getAll() {
    this.showLoader = true
    this.vacanciesService.getAll().subscribe(res => {
      this.tags = res.tags
      this.vacancies = res.vacancies
      this.locations = [...new Map(res.vacancies.map(item => [JSON.stringify(item.location), item.location])).values()]
      this.showLoader = false
    })
  }

  openLocationMenu() {
    this.showLocationMenu = true
    this.locationInputRef.nativeElement.focus()
    this.filteredList = this.locations
    this.form.controls.locationInput.setValue('')
  }

  closeLocationMenu() {
    this.showLocationMenu = false
    this.locationInputRef.nativeElement.blur()
    if (!this.locations.includes(this.form.controls.locationInput.value)) {
      this.form.controls.locationInput.setValue('')
      this.showDropdownError = false
    }
  }

  getFilteredList() {
    if (this.showLocationMenu && this.form.value.locationInput !== undefined) {
      this.filteredList = this.locations.filter((item) => {
        return item.toLowerCase().startsWith(this.form.value.locationInput.toLowerCase())
      })
    }

    if (this.form.value.locationInput !== undefined && !this.locations.find(item => {
      return item.toLowerCase().startsWith(this.form.value.locationInput.toLowerCase())
    })) {
      this.showDropdownError = true
    } else {
      this.showDropdownError = false
    }
  }

  selectItem(idx) {
    this.locationInputRef.nativeElement.focus()
    this.form.controls.locationInput.setValue(this.filteredList[idx])
    this.showLocationMenu = false
    this.locationInputRef.nativeElement.blur()
  }

  keepFocus() {
    if (this.showLocationMenu) {
      this.locationInputRef.nativeElement.focus()
    }
  }


  search() {
    this.showLoader = true
    this.closeLocationMenu()
    const location = this.form.value.locationInput ? this.form.value.locationInput : "GLOBAL"
    const keywords = this.form.value.searchInput ? this.form.value.searchInput : 'ALL'
    this.vacanciesService.search(keywords, location).subscribe(res => {
      this.vacancies = res
      this.router.navigate(['/'], {
        queryParams: {
          keywords: keywords,
          location: location
        }
      })
      this.showLoader = false
    })
  }



  clearVacanciesInput() {
    this.form.controls.searchInput.setValue('')
  }

  clearLocationInput() {
    this.form.controls.locationInput.setValue('')
  }
  getTags(res) {
     if (res) {
       this.vacancies = res
     } else {
       this.getAll()
     }
  }
}
