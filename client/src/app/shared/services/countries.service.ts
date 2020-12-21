import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'


@Injectable({providedIn: 'root'})

export class CountriesService {

  constructor(
    private http: HttpClient
  ) {}

  getCountries(): Observable<any> {
    return this.http.get('http://api.geonames.org/countryInfoJSON?&username=kolesnik')
  }

  getStates(country): Observable<any> {
    return this.http.get(`http://api.geonames.org/childrenJSON?geonameId=${country.geonameId}&username=kolesnik`)
  }

  getRegions(state): Observable<any> {
    return this.http.get(`http://api.geonames.org/childrenJSON?geonameId=${state.geonameId}&username=kolesnik`)
  }

  getCities(region): Observable<any> {
    return this.http.get(`http://api.geonames.org/childrenJSON?geonameId=${region.geonameId}&username=kolesnik`)
  }

}

