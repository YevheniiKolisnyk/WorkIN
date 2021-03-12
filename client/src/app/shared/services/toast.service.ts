import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'
import {Toast} from '../iterfaces'

@Injectable({providedIn: 'root'})

export class ToastService {

  toast$ = new Subject<Toast>()
  constructor() {
  }

  success(message) {
    this.toast$.next({type: 'success', message})
  }

  error(message) {
    this.toast$.next({type: 'error', message})
  }
}
