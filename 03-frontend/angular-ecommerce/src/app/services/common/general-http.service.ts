import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import constants from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class GeneralHttpService {

  storage: Storage = sessionStorage;

  constructor() { }

  getHttpHeaders() : HttpHeaders {
    const userEmail: string = JSON.parse(this.storage.getItem(constants.storageParams.USER_EMAIL)!);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' 
                        + btoa(`${constants.backendSecurity.USER_NAME}:${constants.backendSecurity.PASSWORD}`),
      'User-Email': userEmail,
    });
    return headers;
  }

  getHttpOptions(){
    return {headers: this.getHttpHeaders()};
  }
}
