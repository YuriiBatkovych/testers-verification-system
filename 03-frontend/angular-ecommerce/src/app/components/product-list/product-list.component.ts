import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ProductEdition } from 'src/app/common/product-edition';

import { environment } from 'src/environments/environment';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: ProductEdition[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  previousKeyword: string = "";

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private logsService: LogsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts()
    });
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }
  
  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have different keyword then previous
    //then set pageNumber to 1

    if(keyword != this.previousKeyword){
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    this.productService.searchProductListPaginate(this.pageNumber - 1,
                                                  this.pageSize, 
                                                  keyword).subscribe(this.processResults())
  }

  handleListProducts(){
    //check if route has category id parameter
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentCategoryId = 1;
    }

    //Check if we have the different category then previous
    //Note: Angular will reuse a component if it is currently being viewed

    //if we have a different category id then previous we should set the page
    //number back to one
    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId; 

    this.productService.getProductListPaginate(this.pageNumber-1,
                                               this.pageSize,
                                               this.currentCategoryId).subscribe(this.processResults())
  }

  updatePageSize(newPageSize: string){
      this.pageSize = +newPageSize;
      this.pageNumber = 1;
      this.listProducts();
  }

  processResults(){
    return (data: any) => {
      this.products = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
    }
  }

  addToCart(addedProduct: ProductEdition) {
    if(environment.bugReplaceProductInCart){
      this.productService.getProduct(addedProduct.id+1).subscribe(
        product => {
          const cartItem = new CartItem(product.id, product.name, product.imageUrl, product.unitPrice);
          this.cartService.addToCart(cartItem);
          this.logsService.logMessage("ReplacingProductInCart");
        }
      )
    }
    else{
      const cartItem = new CartItem(addedProduct.id, addedProduct.name, addedProduct.imageUrl, addedProduct.unitPrice);
      this.cartService.addToCart(cartItem);
    }
  }

}
