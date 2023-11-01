export class ProductEdition {

    constructor(public id: number,
                public categoryName: string,
                public sku: string,
                public name: string,
                public description: string,
                public unitPrice: number,
                public imageUrl: string,
                public active: boolean,
                public unitsInStock: number,
                ){
        }

}
