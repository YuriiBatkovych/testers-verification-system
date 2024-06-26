import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { ProductEdition } from 'src/app/common/product-edition';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: ProductEdition;
  constructor(private productService: ProductService,
              private cartService: CartService,
              private customerService: CustomerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  hasUpdateRights(): boolean{
    return this.customerService.isSTAFF();
  }

  handleProductDetails() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  addToCart(){
    console.log(`Added product ${this.product.name} price ${this.product.unitPrice}`);

    const cartItem = new CartItem(this.product.id, this.product.name, this.product.imageUrl, this.product.unitPrice);

    this.cartService.addToCart(cartItem);
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product).subscribe({
      next: response => {
        alert(`Product is deleted`);
        this.reset();
      },
      error: err =>{
        alert(`There was an error: ${err.message}`);
      }
    })
  }

  reset() {
    this.router.navigateByUrl("/products");
  }

}
