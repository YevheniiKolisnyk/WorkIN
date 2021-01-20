import {Component, OnInit} from '@angular/core'
import {AuthService} from '../shared/services/auth.service'
import {ProfileService} from '../shared/services/profile.service'
import {User} from '../shared/iterfaces'
import {Router} from '@angular/router'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: User
  showUser: boolean = false

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
      this.authService.currentUser.subscribe(item => {
        this.user = item
        this.showUser = true
      })
  }

  logout() {
    this.router.navigate(['/auth'])
    this.authService.logout()
  }

  viewProfile(id) {
    this.router.navigate(['/user/', id])
  }
}
