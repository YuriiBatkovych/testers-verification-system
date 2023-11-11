import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { GeneralHttpService } from './common/general-http.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:8081/api/checkout/purchase'; 

  constructor(private httpClient: HttpClient,
              private commonHttpService: GeneralHttpService) {}

  placeOrder(purchase: Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase, this.commonHttpService.getHttpOptions());
  }
}
