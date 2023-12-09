import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralHttpService } from './common/general-http.service';
import { Discount } from '../common/discount';
import constants from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private baseUrl: string = environment.backendApiUrl + "/discount";

  storage: Storage = sessionStorage;

  constructor(private httpClient : HttpClient,
              private commonHttpservice: GeneralHttpService) { }

  
  getDiscount(){
    const userEmail: string = JSON.parse(this.storage.getItem(constants.storageParams.USER_EMAIL)!);
    const disountUrl = this.baseUrl+`?email=${userEmail}`;
    console.log(disountUrl);
    return this.httpClient.get<Discount>(disountUrl, this.commonHttpservice.getHttpOptions());
  }
  
}
