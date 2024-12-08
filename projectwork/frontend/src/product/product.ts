export enum ProductType {
    Essential = 'Essential',
    Minimalist = 'Minimalist',
    Playing = 'Playing',
}

export function getPriceFromId(id: string): number {
    switch (id) {
        case ProductType.Essential:
            return 5000;
        case ProductType.Minimalist:
            return 7000;
        case ProductType.Playing:
            return 10000;
        default:
            return 0;
    }
}

export class Product {
    id: string;
    image: string;
    product_type: ProductType;
    quantity: number;
    price: number;

    constructor(id: string, image: string, product_type: ProductType, quantity: number) {
        this.id = id;
        this.image = image;
        this.product_type = product_type;
        this.quantity = quantity;
        this.price = getPriceFromId(id);
    }
}