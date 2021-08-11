import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';
import {Action} from '../reduxTypes';

const initState = {
    items: [{}]
};


const cartReducers = (state = initState , action: Action) => {
    switch (action.type){
        case ADD_TO_CART: return {...state, items: [...state.items, action.payload]  };
        case REMOVE_FROM_CART: return {...state, items: state.items.filter(x => x !== action.payload)};
        default: return state;
    }
}


export default cartReducers;