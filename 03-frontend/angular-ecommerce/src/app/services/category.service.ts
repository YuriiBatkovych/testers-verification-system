import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../common/product-category';
import { GeneralHttpService } from './common/general-http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = 'http://localhost:8081/api/product-category';
  private baseCategoryUrl = 'http://localhost:8081/api/category';

  constructor(private httpClient : HttpClient,
              private commonHttpService : GeneralHttpService) {
  }

  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl, this.commonHttpService.getHttpOptions())
    .pipe(
      map(response => response._embedded.productCategory)
    );
  }

  updateCategory(id: number, newName: string): Observable<any>{
    const updateUrl = `${this.baseCategoryUrl}/update`;
    let newCategory = new ProductCategory(id, newName);
    return this.httpClient.post<any>(updateUrl, newCategory, this.commonHttpService.getHttpOptions());
  }

  addNewCategory(categoryName: string): Observable<ProductCategory>{
    const addUrl = `${this.baseCategoryUrl}/add`;

    let newCategory = new ProductCategory(0, categoryName);

    return this.httpClient.post<ProductCategory>(addUrl, newCategory, this.commonHttpService.getHttpOptions()); 
  }

  deleteCategory(id: number): Observable<any>{
    const deleteUrl = `${this.baseCategoryUrl}?id=${id}`;
    return this.httpClient.delete(deleteUrl, { headers: this.commonHttpService.getHttpHeaders(), responseType: 'text'});
  }

}

interface GetResponseProductCategories{
  _embedded : {
    productCategory : ProductCategory[];
  }
}
