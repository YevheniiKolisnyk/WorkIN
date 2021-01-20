import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs'
import {User, Vacancy} from '../iterfaces'


@Injectable({providedIn: 'root'})
export class VacanciesService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<{ vacancies: Vacancy[], tags: string[] }> {
    return this.http.get<{ vacancies: Vacancy[], tags: string[] }>('api/vacancy')
  }

  getById(id): Observable<Vacancy> {
    return this.http.get<Vacancy>(`api/vacancy/${id}`)
  }

  search(keywords, location): Observable<Vacancy[]> {
    let params = new HttpParams()
    keywords = keywords.split(' ')
    params = params.append('keywords', keywords.join(', '))
    params = params.append('location', location)
    return this.http.get<Vacancy[]>('api/vacancy/search/', {
      params: params
    })
  }
  searchByTags(tags): Observable<any> {
    let params = new HttpParams()
    params = params.append('tags', tags.join(', '))
    return this.http.get<Vacancy[]>('api/vacancy/searchByTags', {
      params: params
    })
  }

  toFavorite(id): Observable<User> {
    return this.http.post<User>(`api/vacancy/${id}/subscribe`, id)
  }

  createVacancy(data, image?: File): Observable<Vacancy> {
    console.log(image)
    const fd = new FormData()

    if (image) {
      fd.append('companyPic', image, image.name)
    }

    for (let key in data) {
      fd.append(key, data[key])
    }
    return this.http.post<Vacancy>(`api/vacancy/create`, fd)
  }

  applyVacancy(id): Observable<Vacancy> {
    return this.http.post<Vacancy>(`api/vacancy/${id}/apply`, id)
  }
}
