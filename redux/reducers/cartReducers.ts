import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from '../actions/cartActions';
import {Action} from '../reduxTypes';

const initState = {
    items: []
};


const cartReducers = (state = initState , action: Action) => {
    switch (action.type){
        case ADD_TO_CART: return {...state, items: [...state.items, action.payload]  };
        case REMOVE_FROM_CART: return {...state, items: state.items.filter(x => x !== action.payload)};
        case CLEAR_CART: return {...state,items: []};
        default: return state;
    }
}


export default cartReducers;