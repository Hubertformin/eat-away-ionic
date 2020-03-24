import {CartItem} from '../models/data';

export interface AppState {
    readonly cart: CartItem[];
}
