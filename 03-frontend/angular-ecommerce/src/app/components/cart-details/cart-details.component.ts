import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0; 

  constructor(private cartService: CartService,
              private logsService: LogsService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails(){
    this.cartItems = this.cartService.cartItems;
    
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    this.cartService.computeCartTotals();

  }

  incrementQuantity(theCartItem: CartItem){
    this.logsService.logMessage("incrementing quantity of product in cart-details");
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem){
    this.logsService.logMessage("decrementing quantity of product in cart-details");
    this.cartService.decrementQuantity(theCartItem);
  }

  removeItem(theCartItem: CartItem){
    this.logsService.logMessage("Removing product in cart-details");
    this.cartService.removeItem(theCartItem);
  }

}
