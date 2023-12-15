import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { GeneralHttpService } from './common/general-http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = environment.backendApiUrl + '/orders';
  
  constructor(private httpClient: HttpClient,
              private commonHttpService: GeneralHttpService) { }

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory>{
    const orderHistoryUrl = `${this.orderUrl}?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl, this.commonHttpService.getHttpOptions());
  }
}

interface GetResponseOrderHistory{
  content:  OrderHistory[];
}