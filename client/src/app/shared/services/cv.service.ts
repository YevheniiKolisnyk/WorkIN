import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'

@Injectable({providedIn: 'root'})

export class CvService {

  constructor(private http: HttpClient) {
  }

  createCv(data, image): Observable<any> {
    const fd = new FormData()
    fd.append('cvUserPic', image)

    for (let key in data) {
      fd.append(key, data[key])
    }

    return this.http.post<any>('/api/cv/createCv', fd, {responseType: 'blob' as 'json'})
  }
}
