import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  previousKeyword: string = "";

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

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

    console.log(this.currentCategoryId);

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
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  addToCart(addedProduct: Product) {
    console.log(`Added product ${addedProduct.name} price ${addedProduct.unitPrice}`);

    const cartItem = new CartItem(addedProduct);

    this.cartService.addToCart(cartItem);
  }

}
