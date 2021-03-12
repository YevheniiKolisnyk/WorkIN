import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {authAnimations} from '../shared/animations/auth.animations'
import {Subject} from 'rxjs'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  animations: [authAnimations]
})
export class AuthPageComponent implements OnInit {
  canShowLogin = false

  constructor() {
  }

  ngOnInit(): void {

  }

  switchAuth() {
    this.canShowLogin = !this.canShowLogin
  }

}
