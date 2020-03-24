import {Action} from '@ngrx/store';
import {CartItem} from '../../models/data';

// export const addToCart = createAction('[CART_ACTION] ADD', props<CartItem>());
// export const removeFromCart = createAction('[CART_ACTION] REMOVE', props<CartItem>());


export const UPDATE_CART = '[CART] UPDATE';
export const RESET_CART = '[CART] RESET';

export class UpdateCart implements Action {
    readonly type = UPDATE_CART;

    constructor(public payload: CartItem[]) {}
}

export class ResetCart implements Action {
    readonly type = RESET_CART;
    constructor() {}
}

export type Actions = UpdateCart | ResetCart;
