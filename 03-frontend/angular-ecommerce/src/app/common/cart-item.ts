import { ProductEdition } from "./product-edition";

export class CartItem {
    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;

    quantity: number;

    constructor(productId: number, productName: string, productImageUrl: string, productUnitPrice: number){
        this.id = productId;
        this.name = productName;
        this.imageUrl = productImageUrl;
        this.unitPrice = productUnitPrice;

        this.quantity = 1;
    }
}
