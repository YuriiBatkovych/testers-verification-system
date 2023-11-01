import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductEdition } from '../common/product-edition';
import { ProductForForm } from '../common/product-for-form';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081/api/products';

  constructor(private httpClient : HttpClient) {
  }


  getProductList(categoryId: number): Observable<Product[]> {
      const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
      return this.getProducts(searchUrl);
  }
  
  getProductListPaginate(page: number,
                         pageSize: number,
                         categoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
                      +`&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getSearchProducts(keyword: string): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  searchProductListPaginate(page: number,
                            pageSize: number,
                            keyword: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
                       +`&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProducts(searchUrl: string){
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(productId: number): Observable<ProductEdition> {
    const searchUrl = `${this.baseUrl}?id=${productId}`;
    return this.httpClient.get<ProductEdition>(searchUrl);
  }

  updateProduct(product: ProductForForm): Observable<any>{
    const updateUrl = `${this.baseUrl}/update`;
    return this.httpClient.put<ProductForForm>(updateUrl, product);
  }

  addProduct(product: ProductForForm): Observable<any>{
    const addUrl = `${this.baseUrl}/add`;
    return this.httpClient.post<ProductForForm>(addUrl, product);
  }

  deleteProduct(product: ProductEdition): Observable<any>{
    const deleteUrl = `${this.baseUrl}?id=${product.id}`;
    return this.httpClient.delete(deleteUrl, {responseType: 'text'});
  }

}

interface GetResponseProducts{
  _embedded : {
    products : Product[];
  },
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}
