import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = localStorage;

  constructor() { 
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if(data != null){
      this.cartItems = data;
      this.computeCartTotals();
    }
  }

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

  persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
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

    this.persistCartItems();
  }

  decrementQuantity(theCartItem: CartItem) {
   theCartItem.quantity --;

   if(theCartItem.quantity == 0){
    this.removeItem(theCartItem);
   }
   else{
    this.computeCartTotals();
   }
  }

  removeItem(theCartItem: CartItem){
    const itemIndex = this.cartItems.findIndex(tmpCartItem => tmpCartItem.id == theCartItem.id);

    if(itemIndex>-1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
