import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import constants from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl: string = "http://localhost:8081/api/customer";

  storage: Storage = sessionStorage;

  constructor(private httpClient : HttpClient) { }

  getUserRoles(email: string) : Observable<string[]>{
    const searchUrl = `${this.baseUrl}/roles?email=${email}`;
    return this.httpClient.get<string[]>(searchUrl);
  }

  getRoles(): string[] {
    const roles: string[] = JSON.parse(this.storage.getItem(constants.storageParams.USER_ROLES)!);
    return roles;
  }

  setUserRoles(email: string){
    this.getUserRoles(email).subscribe(
      data => {
        const roles: string[] = data;
        this.storage.setItem(constants.storageParams.USER_ROLES, JSON.stringify(roles));
      }
    )
  }

  setDefaultRole(){
    const roles: string[] = [constants.roles.USER];
    this.storage.setItem(constants.storageParams.USER_ROLES, JSON.stringify(roles));
  }

  setDefaultEmail(){
    this.storage.setItem(constants.storageParams.USER_EMAIL, JSON.stringify(""));
  }
}
