import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = 'http://localhost:8081/api/product-category';
  private baseCategoryUrl = 'http://localhost:8081/api/category';

  constructor(private httpClient : HttpClient) {
  }

  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  updateCategory(id: number, newName: string): Observable<any>{
    const updateUrl = `${this.baseCategoryUrl}/update`;
    let newCategory = new ProductCategory(id, newName);
    return this.httpClient.post<any>(updateUrl, newCategory);
  }

  addNewCategory(categoryName: string): Observable<ProductCategory>{
    const addUrl = `${this.baseCategoryUrl}/add`;

    let newCategory = new ProductCategory(0, categoryName);

    return this.httpClient.post<ProductCategory>(addUrl, newCategory); 
  }

}

interface GetResponseProductCategories{
  _embedded : {
    productCategory : ProductCategory[];
  }
}
