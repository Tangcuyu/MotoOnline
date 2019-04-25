export interface ICartItem {
    id: string;
    total_on_hand: number;
    count: number;
    price: number;
    max_items?: number;
}

export interface ICart {
    cartItems: ICartItem[];
    priceAfterDiscount: number;
    totalPrice: number;
    totalItems: number;
}

export class CartItem implements ICartItem {
    id: '';
    total_on_hand: 0;
    count: 0;
    price: 0;
}

export class Cart implements ICart {
    cartItems: [];
    priceAfterDiscount: 0;
    totalPrice: 0;
    totalItems: 0;
}
