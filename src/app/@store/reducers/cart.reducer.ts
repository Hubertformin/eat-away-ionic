// import { createReducer, on } from '@ngrx/store';
// import {addToCart, removeFromCart} from '../actions/cart.actions';
import {CartItem} from '../../models/data';
import * as CartActions from '../actions/cart.actions';
// tslint:disable-next-line:variable-name
// const _cartReducer = createReducer(initialCartState,
//     on(addToCart, (state, action) => {
//         const currentItem = state.find(st => st.id === action.id);
//         if (currentItem) {
//             const items = state.filter(st => st.id !== action.id);
//             action.quantity += 1;
//             return [...items, action];
//         } else {
//             return [...state, action];
//         }
//     }),
//     on(removeFromCart, (state, action) => {
//         const items = [...state];
//         return items.filter(st => st.id !== action.id);
//     }));
export const initialCartState: CartItem[] = [];
export function cartReducer(state = initialCartState, action: CartActions.Actions) {

    switch (action.type) {
        case '[CART] UPDATE':
            return action.payload;
        case '[CART] RESET':
            return [];
        default:
            return initialCartState;
    }
}
