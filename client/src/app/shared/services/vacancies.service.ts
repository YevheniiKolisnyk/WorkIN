import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Vacancy} from '../iterfaces'


@Injectable({providedIn: 'root'})
export class VacanciesService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<{ vacancies: Vacancy[], tags: string[] }> {
    return this.http.get<{ vacancies: Vacancy[], tags: string[] }>('api/vacancy')
  }

  search(keywords, location): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`api/vacancy/search/?keywords=${keywords}&location=${location}`)
  }

  searchByTags(tags): Observable<any> {
    let params = new HttpParams()
    params = params.append('tags', tags.join(', '))
    return this.http.get<Vacancy[]>('api/vacancy/searchByTags', {
      params: params
    })
  }
}
