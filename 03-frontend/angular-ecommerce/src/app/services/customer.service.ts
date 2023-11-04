import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import constants from '../config/constants';
import { Customer } from '../common/customer';

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

  getAllUsers() : Observable<Customer[]>{
    const searchUrl = `${this.baseUrl}/all`;
    return this.httpClient.get<Customer[]>(searchUrl);
  }

  getRoles(): string[] {
    const roles: string[] = JSON.parse(this.storage.getItem(constants.storageParams.USER_ROLES)!);
    return roles;
  }

  isSTAFF(): boolean{
    const roles: string[] = this.getRoles();
    return roles.includes(constants.roles.STAFF) || this.isADMIN();
  }

  isADMIN(): boolean{
    const roles: string[] = this.getRoles();
    return roles.includes(constants.roles.ADMIN) 
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
