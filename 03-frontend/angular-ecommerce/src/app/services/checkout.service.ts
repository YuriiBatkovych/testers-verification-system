import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { GeneralHttpService } from './common/general-http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = environment.backendApiUrl + '/checkout/purchase'; 

  constructor(private httpClient: HttpClient,
              private commonHttpService: GeneralHttpService) {}

  placeOrder(purchase: Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase, this.commonHttpService.getHttpOptions());
  }
}
