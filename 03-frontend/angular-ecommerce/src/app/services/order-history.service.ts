import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import httpConsts from '../config/httpConsts';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = 'http://localhost:8081/api/orders';
  
  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory>{
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl, httpConsts.httpOptions);
  }
}

interface GetResponseOrderHistory{
  _embedded: {
    orders: OrderHistory[];
  }
}