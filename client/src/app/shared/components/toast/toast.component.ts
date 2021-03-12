import {Component, OnDestroy, OnInit} from '@angular/core'
import {ToastService} from '../../services/toast.service'
import {toastAnimation} from '../../animations/toast.animations'

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: toastAnimation
})
export class ToastComponent implements OnInit, OnDestroy {

  message: string
  type: string
  delay: number = 5000

  constructor(private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.toastService.toast$.subscribe(toast => {
      this.message = toast.message
      this.type = toast.type
    })

    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      this.message = ''
    }, this.delay)
  }

  ngOnDestroy() {
  }

  close() {

  }
}
