import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import constants from '../config/constants';
import { Customer } from '../common/customer';
import { Role } from '../common/role';
import { GeneralHttpService } from './common/general-http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl: string = "http://localhost:8081/api/customer";

  storage: Storage = sessionStorage;

  constructor(private httpClient : HttpClient,
              private commonHttpservice: GeneralHttpService) { }

  getUserRole(email: string) : Observable<Role>{
    const searchUrl = `${this.baseUrl}/roles?email=${email}`;
    return this.httpClient.get<Role>(searchUrl, this.commonHttpservice.getHttpOptions());
  }

  getAllUsers() : Observable<Customer[]>{
    const searchUrl = `${this.baseUrl}/all`;
    return this.httpClient.get<Customer[]>(searchUrl, this.commonHttpservice.getHttpOptions());
  }

  getUserById(id: number) : Observable<Customer>{
    const searchUrl = `${this.baseUrl}/search?id=${id}`;
    return this.httpClient.get<Customer>(searchUrl, this.commonHttpservice.getHttpOptions());
  }

  getAllRolesList() : Observable<Role[]>{
    const searchUrl = `${this.baseUrl}/allroles`;
    return this.httpClient.get<Role[]>(searchUrl, this.commonHttpservice.getHttpOptions());
  }

  getRole(): string {
    const role: string = JSON.parse(this.storage.getItem(constants.storageParams.USER_ROLES)!);
    return role;
  }

  isSTAFF(): boolean{
    const role: string = this.getRole();
    return (role === constants.roles.STAFF) || this.isADMIN();
  }

  isADMIN(): boolean{
    const role: string = this.getRole();
    return (role === constants.roles.ADMIN); 
  }

  addUser(user: Customer){
    const updateUrl = `${this.baseUrl}/add`;
    return this.httpClient.post<Customer>(updateUrl, user, this.commonHttpservice.getHttpOptions());
  }

  updateUser(user: Customer){
    const updateUrl = `${this.baseUrl}/update`;
    return this.httpClient.put<Customer>(updateUrl, user, this.commonHttpservice.getHttpOptions());
  }

  deleteUser(userId: number){
    const deleteUrl = `${this.baseUrl}?id=${userId}`;
    return this.httpClient.delete(deleteUrl, {headers: this.commonHttpservice.getHttpHeaders(), 
                                              responseType: 'text'});
  }

  setUserRole(email: string){
    this.getUserRole(email).subscribe(
      data => {
        const role: string = data.name;
        this.storage.setItem(constants.storageParams.USER_ROLES, JSON.stringify(role));
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
