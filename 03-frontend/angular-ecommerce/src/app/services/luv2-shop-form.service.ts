import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import httpConsts from '../config/httpConsts';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = 'http://localhost:8081/api/countries';
  private statesUrl = 'http://localhost:8081/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>{

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl, httpConsts.httpOptions).pipe(
      map(response => response._embedded.countries)
    );

  }

  getStates(countryCode: string): Observable<State[]>{

    const searchUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;

    return this.httpClient.get<GetResponseStates>(searchUrl, httpConsts.httpOptions).pipe(
      map(response => response._embedded.states)
    );

  }

  getCreditCardMonth(startMonth: number): Observable<number[]>{

    let data: number[] = [];

    for(let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{

    let data: number[] = [];
    const startYear: number = new Date().getFullYear();

    for(let theYear = startYear; theYear <= startYear + 15; theYear++){
      data.push(theYear);
    }

    return of(data);
  }
}


interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}