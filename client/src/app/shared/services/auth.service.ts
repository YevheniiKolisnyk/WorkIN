import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {tap} from 'rxjs/operators'
import {User} from '../iterfaces'

@Injectable({providedIn: 'root'})

export class AuthService {
  private token = null
  private currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')))
  public currentUser = this.currentUserSubject.asObservable()

  public get currentUserValue() {
    return this.currentUserSubject.value
  }

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('api/auth/register', user)
  }

  updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUserSubject.next(user)
  }

  login(user: User): Observable<{ token: string, user: User }> {
    return this.http.post<{ token: string, user: User }>('api/auth/login', user)
      .pipe(
        tap(res => {
          localStorage.setItem('auth-token', res.token)
          localStorage.setItem('user', JSON.stringify(res.user))
          this.setToken(res.token)
          this.currentUserSubject.next(res.user)
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
    this.currentUserSubject.next(null)
  }
}
