import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {tap} from 'rxjs/operators'
import {User} from '../iterfaces'

@Injectable({providedIn: 'root'})

export class AuthService {
  private token = null

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('api/auth/register', user)
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('api/auth/login', user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('auth-token', token)
          this.setToken(token)
        })
      )
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  getToken() {
    return this.token
  }

  setToken(token: string) {
    this.token = token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }
}
