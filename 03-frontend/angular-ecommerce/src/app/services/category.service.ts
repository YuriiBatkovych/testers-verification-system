import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = 'http://localhost:8081/api/product-category';

  constructor(private httpClient : HttpClient) {
  }

  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetResponseProductCategories{
  _embedded : {
    productCategory : ProductCategory[];
  }
}
