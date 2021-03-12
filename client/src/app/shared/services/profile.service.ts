import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {User} from '../iterfaces'
import {HttpClient} from '@angular/common/http'
import {AuthService} from './auth.service'

@Injectable({providedIn: 'root'})

export class ProfileService {

  user = new BehaviorSubject<User>(null)

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    if (this.authService.isAuthenticated()) {
      this.http.get<User>('/api/profile/getUser').subscribe(res => {
        this.user.next(res)
      })
    } else {
      return null
    }
  }
}
