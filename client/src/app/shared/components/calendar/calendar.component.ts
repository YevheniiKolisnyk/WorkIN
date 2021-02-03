import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendarInput') calendarInputRef: ElementRef
  @ViewChild('calendar') calendarRef: ElementRef

  @Input() parenFormGroup: FormGroup
  @Input() controlName: string = ''
  @Output() days: EventEmitter<number> = new EventEmitter<number>()


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
  currentDate: Date = new Date()
  firstDate: Date = this.currentDate
  date: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth())
  lastDate: Date = new Date(this.firstDate.getFullYear(), this.firstDate.getMonth(), this.firstDate.getDate() + 60)
  currentYear: number
  currentMonth: number
  selectedDate: Date = new Date()
  daysInCurrentMonth: { day: number, status: string }[] = []
  daysInPreviousMonthWeek: { day: number, status: string }[] = []
  daysInNextMonthWeek: { day: number, status: string }[] = []
  previousInvalidDays: { day: number, status: string }[] = []
  afterInvalidDays: { day: number, status: string }[] = []

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.calendarRef) {
        return
      }
      if (!this.calendarInputRef.nativeElement.contains(e.target) &&
        !this.calendarRef.nativeElement.contains(e.target)) {
        this.showCalendar = false
      }
    })
  }

  ngOnInit() {
    this.setCalendar()
  }

  setCalendar() {
    this.currentYear = this.date.getFullYear()
    this.currentMonth = this.date.getMonth()
    this.getDaysInCalendar()
  }

  getDaysInCalendar() {
    const daysOfCurrentMonth = new Date(
      this.currentYear, this.currentMonth + 1, 0
    ).getDate()
    const currentMonthDays = []
    const previousInvalidDays = []
    const afterInvalidDays = []

    for (let i = 0; i < daysOfCurrentMonth; i++) {
      if (this.firstDate.getFullYear() === this.currentYear &&
        this.firstDate.getMonth() === this.currentMonth &&
        i + 1 < this.firstDate.getDate()) {
        previousInvalidDays.push({
          day: i + 1,
          status: 'invalid'
        })
      } else if (this.currentYear === this.lastDate.getFullYear() &&
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

  changeMonth(next: boolean) {
    this.date.setMonth(next ? this.date.getMonth() + 1 : this.date.getMonth() - 1)
    this.currentMonth = this.date.getMonth()
    this.currentYear = this.date.getFullYear()
    this.setCalendar()
  }

  selectDay(day) {
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day)
    this.getDaysInCalendar()

    this.parenFormGroup.controls[this.controlName].setValue(
      `${this.selectedDate.getFullYear()}-${twoDigits(this.selectedDate.getMonth() + 1)}-${twoDigits(this.selectedDate.getDate())}`
    )

    function twoDigits(number) {
      return (number < 10 ? '0' : '') + number
    }

    this.days.emit(Math.ceil((this.selectedDate.getTime() - this.firstDate.getTime()) / (1000 * 3600 * 24)))
  }

  openCalendar() {
    this.showCalendar = true
    this.selectDay(this.selectedDate.getDate())
  }
}
