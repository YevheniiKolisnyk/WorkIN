import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core'
import {FormGroup} from '@angular/forms'

interface Day {
  day: string
  status: string
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  @ViewChild('calendarInput') calendarInputRef: ElementRef
  @ViewChild('calendar') calendarRef: ElementRef
  @ViewChild('datepicker') datepickerRef: ElementRef

  @Input() parenFormGroup: FormGroup
  @Input() controlName: string
  @Input() fixedDate: false | number
  @Input() title: string
  @Input() stillHere: boolean
  @Output() output: EventEmitter<number | Date> = new EventEmitter<number | Date>()


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
  daysOfWeek: string[] = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN'
  ]
  showCalendar: boolean = false
  currentDate = new Date()
  firstDate: Date = new Date()
  date: Date
  lastDate: Date
  currentYear: number
  currentMonth: number
  selectedDate: Date = new Date()
  daysInCurrentMonth: Day[] = []
  daysInPreviousMonthWeek: Day[] = []
  daysInNextMonthWeek: Day[] = []
  previousInvalidDays: Day[] = []
  afterInvalidDays: Day[] = []
  showSelectorType: string = 'day'
  years: number[] = new Array(12)
  yearMultiplier: number = 0
  showPrevArrow: boolean = true
  showNextArrow: boolean = true
  outputItem: string | Date

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.calendarRef) {
        return
      }
      if (!this.datepickerRef.nativeElement.contains(e.target)) {
        this.showCalendar = false
        this.calendarInputRef.nativeElement.blur()
      }
    })
  }

  ngOnInit() {
    this.date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth())
    if (this.fixedDate) {
      this.lastDate = new Date(this.firstDate.getFullYear(), this.firstDate.getMonth(), this.firstDate.getDate() + this.fixedDate)
    }
    this.setCalendar()
  }

  setCalendar() {
    this.currentYear = this.date.getFullYear()
    this.currentMonth = this.date.getMonth()
    this.getDaysInCalendar()
  }

  openCalendar() {
    this.showCalendar = true
    this.selectDay(this.selectedDate.getDate())
  }

  getDaysInCalendar() {
    const daysOfCurrentMonth = new Date(
      this.currentYear, this.currentMonth + 1, 0
    ).getDate()
    const currentMonthDays = []
    const previousInvalidDays = []
    const afterInvalidDays = []

    for (let i = 0; i < daysOfCurrentMonth; i++) {
      if (this.fixedDate &&
        this.firstDate.getFullYear() === this.currentYear &&
        this.firstDate.getMonth() === this.currentMonth &&
        i + 1 < this.firstDate.getDate()) {
        previousInvalidDays.push({
          day: i + 1,
          status: 'invalid'
        })
      } else if (this.fixedDate &&
        this.currentYear === this.lastDate.getFullYear() &&
        this.currentMonth === this.lastDate.getMonth() &&
        i + 1 > this.lastDate.getDate()) {
        afterInvalidDays.push({
          day: i + 1,
          status: 'invalid'
        })
      } else if (
        this.selectedDate.getFullYear() === this.date.getFullYear() &&
        this.selectedDate.getMonth() === this.date.getMonth() &&
        i + 1 === this.selectedDate.getDate()
      ) {
        currentMonthDays.push({
          day: i + 1,
          status: 'selected'
        })
      } else {
        currentMonthDays.push({
          day: i + 1,
          status: 'available'
        })
      }


    }

    this.daysInCurrentMonth = currentMonthDays
    this.previousInvalidDays = previousInvalidDays
    this.afterInvalidDays = afterInvalidDays
    this.daysInPreviousMonthWeek = this.getPreviousMonth()
    this.daysInNextMonthWeek = this.getNextMonth()

    if (this.fixedDate) {
      if (this.currentMonth === this.firstDate.getMonth()) {
        this.showPrevArrow = false
      } else {
        this.showPrevArrow = true
      }

      if (this.currentMonth === this.lastDate.getMonth()) {
        this.showNextArrow = false
      } else {
        this.showNextArrow = true
      }
    }

  }

  selectMonth(month) {
    this.date.setMonth(month)
    this.currentMonth = this.date.getMonth()
    this.getDaysInCalendar()
    this.showSelectorType = 'day'
  }

  selectYear(year) {
    this.date.setFullYear(year)
    this.currentYear = this.date.getFullYear()
    this.getDaysInCalendar()
    this.showSelectorType = 'month'
  }

  navigateSelector(next) {
    if (this.showSelectorType === 'year') {
      this.changeYear(next)
    } else {
      this.changeMonth(next)
    }
  }

  changeYear(next) {
    this.yearMultiplier = next ? this.yearMultiplier + 12 : this.yearMultiplier - 12
  }

  changeMonth(next: boolean) {
    this.date.setMonth(next ? this.date.getMonth() + 1 : this.date.getMonth() - 1)
    this.currentMonth = this.date.getMonth()
    this.currentYear = this.date.getFullYear()
    this.setCalendar()
  }

  getPreviousMonth() {
    const firstDayOfCurrentMonth = new Date(
      this.currentYear,
      this.currentMonth,
      0
    ).getDay()
    const daysInCurrentMonth = new Date(this.currentYear,
      this.currentMonth,
      0
    ).getDate()
    const previousWeekDays = []

    for (let i = 0; i < firstDayOfCurrentMonth; i++) {
      previousWeekDays.push(daysInCurrentMonth - i)
    }

    return previousWeekDays.reverse()
  }

  getNextMonth() {
    const lastDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDay()
    const nextWeekDays = []
    for (let i = 0; i < (7 - lastDayOfMonth); i++) {
      nextWeekDays.push(i + 1)
    }

    return nextWeekDays
  }

  selectDay(day) {
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day)
    this.outputItem = this.selectedDate
    this.parenFormGroup.controls[this.controlName].setValue(
      `${this.selectedDate.getFullYear()}-${twoDigits(this.selectedDate.getMonth() + 1)}-${twoDigits(this.selectedDate.getDate())}`
    )

    function twoDigits(number) {
      return (number < 10 ? '0' : '') + number
    }

    this.getDaysInCalendar()

    if (this.fixedDate) {
      this.output.emit(Math.ceil((this.selectedDate.getTime() - this.firstDate.getTime()) / (1000 * 3600 * 24)))
    } else {
      this.output.emit(this.selectedDate)
    }
  }


  toggleSelection(selectorType) {
    if (this.fixedDate) {
      return
    }
    this.yearMultiplier = 0
    this.showSelectorType = selectorType
  }

  keepFocus() {
    if (this.showCalendar) {
      this.calendarInputRef.nativeElement.focus()
    }
  }

  isStillHere(event) {
    if (event.target.checked) {
      this.outputItem = 'Present'
      this.parenFormGroup.controls[this.controlName].setValue(this.outputItem)
    } else {
      this.selectDay(this.selectedDate.getDate())
      this.outputItem = this.selectedDate
    }
  }
}
