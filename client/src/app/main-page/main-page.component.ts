import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core'
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
  user: User

  canShowStars: boolean = false
  form: FormGroup
  favoriteList: string[]

  showLoader: boolean = true
  tags: string[]
  checkboxValues: string[] = []
  searchInputItem: string
  vacancies: Vacancy[] = []
  locations: string[]
  locationsInputItem: string = ''
  locationsListHidden: boolean = true
  locationsShowError: boolean = false
  locationsSelectedIndex: number = -1
  locationsFilteredList: string[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vacanciesService: VacanciesService,
    private FormBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private profileService: ProfileService,
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('keywords') === 'ALL') {
      this.searchInputItem = ''
    } else if (this.route.snapshot.queryParamMap.get('keywords')) {
      this.searchInputItem = this.route.snapshot.queryParamMap.get('keywords')
    }

    if (this.route.snapshot.queryParamMap.get('location') === 'GLOBAL') {
      this.locationsInputItem = ''
    } else if (this.route.snapshot.queryParamMap.get('location')) {
      this.locationsInputItem = this.route.snapshot.queryParamMap.get('location')
    }

    this.form = this.FormBuilder.group({
      searchInput: new FormControl(null, Validators.required),
      locationInput: new FormControl(null)
    })

    this.profileService.user.subscribe(user => {
      console.log('subject',user)
      if (user) {
        this.user = user
        this.favoriteList = user.favorite.map(item => item._id)
        this.canShowStars = true
        this.getAll()
      } else {
        this.getAll()
      }
    })
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

  getFilteredList() {
    this.locationsListHidden = false
    this.ref.detectChanges()

    if (!this.locationsListHidden && this.locationsInputItem !== undefined) {
      this.locationsFilteredList = this.locations.filter((item) => {
        return item.toLowerCase().startsWith(this.locationsInputItem.toLowerCase())
      })
    }

    if (this.locationsInputItem !== undefined && !this.locations.find(item => {
      return item.toLowerCase().startsWith(this.locationsInputItem.toLowerCase())
    })) {
      this.locationsShowError = true
    } else {
      this.locationsShowError = false
    }
  }

  selectItem(idx, click,) {
    this.locationsInputItem = this.locationsFilteredList[idx]
    this.locationsSelectedIndex = idx
    this.ref.detectChanges()
    if (click) {
      this.locationsListHidden = true
      this.ref.detectChanges()
    }
  }

  toggleListDisplay(sender) {
    if (sender) {
      this.locationsInputItem = ''
      this.getFilteredList()
      this.locationsListHidden = false
      this.ref.detectChanges()
    } else {
      if (!this.locations.some(item => item === this.locationsInputItem)) {
        this.locationsInputItem = ''
        this.locationsFilteredList = this.locations
        this.locationsListHidden = true
        this.ref.detectChanges()
      } else if (this.locationsInputItem) {

      }
      this.locationsFilteredList = this.locations
      this.locationsListHidden = true
      this.ref.detectChanges()
    }
  }

  focusLocation() {
    if (this.locationsListHidden) {
      this.toggleListDisplay(true)
    } else {
      this.toggleListDisplay(false)
    }
  }

  search() {
    this.showLoader = true
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

  selectFilter(event, tag) {
    this.showLoader = true
    if (event.target.checked) {
      this.checkboxValues.push(tag)
      this.vacanciesService.searchByTags(this.checkboxValues).subscribe(res => {
        this.vacancies = res
        this.showLoader = false
      })
    } else {
      this.checkboxValues = this.checkboxValues.filter(el => el != tag)
      if (!this.checkboxValues.length) {
        this.getAll()
      } else {
        this.vacanciesService.searchByTags(this.checkboxValues).subscribe(res => {
          this.vacancies = res
          this.showLoader = false
        })
      }
    }


  }

  clearVacanciesInput() {
    this.form.controls['searchInput'].reset()
  }

  clearLocationInput() {
    this.form.controls['locationInput'].reset()
  }

  favorite(id) {
    this.vacanciesService.toFavorite(id).subscribe(res => {
      if (this.favoriteList.includes(id)) {
        this.favoriteList = this.favoriteList.filter(item => item !== id)
      } else {
        this.favoriteList.push(id)
      }
      this.user.favorite = res.favorite
    })
  }
}
