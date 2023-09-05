import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem){

    let alreadyExistsInTheCart: boolean = false;

    if(this.cartItems.length > 0){

      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === cartItem.id){
          alreadyExistsInTheCart = true;
          tempCartItem.quantity++;
          break;
        }
      }
    }

    if(!alreadyExistsInTheCart){
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
  }


  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let tempCartItem of this.cartItems){
       totalPriceValue = totalPriceValue + tempCartItem.unitPrice*tempCartItem.quantity;
       totalQuantityValue = totalQuantityValue + tempCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
