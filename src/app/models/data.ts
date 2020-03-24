/*
* Author: Hubert Formin
* Date: 26-11-2019 at 2:30 AM
*/

export interface UserModel {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    dateOfBirth?: Date;
    locationCoords?: {lat: number, long: number};
}

export interface CategoryModel {
    id?: string;
    name?: string;
    imageUrl?: string;
    items?: number;
}

export interface DevicesModel {
    id?: string;
    token?: string;
    uid?: string;
    deviceInfo?: any;
}

export interface ItemModel {
    id?: string;
    name?: string;
    category?: string;
    unitPrice?: number;
    units?: string;
    imageUrl?: string;
    orderCount?: number;
    date?: Date;
}

export interface CartItem {
    id?: string;
    name?: string;
    imageUrl?: string;
    unitPrice?: number;
    quantity?: number;
    units?: string;
    totalAmount?: number;
}

export interface OrderStats {
    id?: string;
    totalAmount: string;
    totalOrders: string;
}

export declare type SaleStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface OrderModel {
    id?: string;
    customerId: string;
    invoiceNumber?: string;
    customer: UserModel;
    items: CartItem[];
    totalAmount: number;
    status: SaleStatus;
    date: Date;
}


export const CATEGORIES_DATA: CategoryModel[] = [
    {
        id: 'a',
        name: 'Food',
        imageUrl: 'assets/images/products/Fruits.jpg',
        items: 50
    },
    {
        id: 'b',
        name: 'Cheese',
        imageUrl: 'assets/images/products/eggs.jpg',
        items: 20
    },
    {
        id: 'c',
        name: 'Beverages',
        imageUrl: 'assets/images/products/drinks.jpg',
        items: 25
    },
    {
        id: 'd',
        name: 'Perishables',
        imageUrl: 'assets/images/products/cooking-ingredients.jpg',
        items: 75
    },
    {
        id: 'e',
        name: 'Salt',
        imageUrl: 'assets/images/products/salt.jpg',
        items: 55
    },
    {
        id: 'f',
        name: 'Tomatoes',
        imageUrl: 'assets/images/products/tomatoes.jpg',
        items: 30
    },
    {
        id: 'g',
        name: 'Eggs',
        imageUrl: 'assets/images/products/eggs.jpg',
        items: 125
    },
    {
        id: 'h',
        name: 'Vegetables',
        imageUrl: 'assets/images/products/vegetables.jpg',
        items: 10
    },
    {
        id: 'i',
        name: 'Bread',
        imageUrl: 'assets/images/products/burgers.jpg',
        items: 2
    },
];

export const ITEMS_DATA: ItemModel[] = [
    {
        id: 'a',
        name: 'Breaded chicken',
        unitPrice: 2000,
        units: 'EA',
        imageUrl: 'assets/images/products/food.jpg'
    },
    {
        id: 'b',
        name: 'Cheese burger',
        unitPrice: 2000,
        units: 'KG',
        imageUrl: 'assets/images/products/salt.jpg'
    },
    {
        id: 'c',
        name: 'Cocktail',
        unitPrice: 1500,
        units: 'EA',
        imageUrl: 'assets/images/products/drinks.jpg'
    },
    {
        id: 'd',
        name: 'Classic burger',
        unitPrice: 1500,
        units: 'EA',
        imageUrl: 'assets/images/products/eggs.jpg'
    },
    {
        id: 'e',
        name: 'Brochettes',
        unitPrice: 1500,
        units: 'EA',
        imageUrl: 'assets/images/products/burgers.jpg'
    },
    {
        id: 'f',
        name: 'Roasted chicken',
        unitPrice: 400,
        units: 'EA',
        imageUrl: 'assets/images/products/food.jpg'
    },
    {
        id: 'g',
        name: 'Ice black',
        unitPrice: 1500,
        units: 'EA',
        imageUrl: 'assets/images/products/drinks.jpg'
    },
    {
        id: 'h',
        name: 'Sprite',
        unitPrice: 1500,
        units: 'EA',
        imageUrl: 'assets/images/products/drinks.jpg'
    },
];
