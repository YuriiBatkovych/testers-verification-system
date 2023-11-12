import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductEdition } from '../common/product-edition';
import { ProductForForm } from '../common/product-for-form';
import { GeneralHttpService } from './common/general-http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.backendApiUrl + '/products';

  constructor(private httpClient : HttpClient,
              private commonHttpService: GeneralHttpService) {
  }


  getProductList(categoryId: number): Observable<ProductEdition[]> {
      const searchUrl = `${this.baseUrl}/category?id=${categoryId}`
      return this.getProducts(searchUrl);
  }
  
  getProductListPaginate(page: number,
                         pageSize: number,
                         categoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/category?id=${categoryId}`
                      +`&page=${page}&size=${pageSize}`;

    console.log(searchUrl);
    return this.httpClient.get<GetResponseProducts>(searchUrl, this.handleHttpOptions());
  } 

  getSearchProducts(keyword: string): Observable<ProductEdition[]>{
    const searchUrl = `${this.baseUrl}/keyword?name=${keyword}`
    return this.getProducts(searchUrl);
  }

  searchProductListPaginate(page: number,
                            pageSize: number,
                            keyword: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/key?name=${keyword}`
                       +`&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl, this.handleHttpOptions());
  }

  getProducts(searchUrl: string){
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response.content)
    );
  }

  getProduct(productId: number): Observable<ProductEdition> {
    const searchUrl = `${this.baseUrl}?id=${productId}`;
    return this.httpClient.get<ProductEdition>(searchUrl, this.handleHttpOptions());
  }

  updateProduct(product: ProductForForm): Observable<any>{
    const updateUrl = `${this.baseUrl}/update`;
    return this.httpClient.put<ProductForForm>(updateUrl, product, this.handleHttpOptions());
  }

  addProduct(product: ProductForForm): Observable<any>{
    const addUrl = `${this.baseUrl}/add`;
    return this.httpClient.post<ProductForForm>(addUrl, product, this.handleHttpOptions());
  }

  deleteProduct(product: ProductEdition): Observable<any>{
    const deleteUrl = `${this.baseUrl}?id=${product.id}`;
    return this.httpClient.delete(deleteUrl, {headers: this.commonHttpService.getHttpHeaders(), responseType: 'text'});
  }

  handleHttpOptions(){
    return this.commonHttpService.getHttpOptions();
  }
  
}

interface GetResponseProducts{
  content : ProductEdition[];
  
  size : number,
  totalElements : number,
  totalPages : number,
  number : number
  
}
