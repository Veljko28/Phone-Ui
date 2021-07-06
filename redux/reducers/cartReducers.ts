import { ADD_TO_CART } from '../actions/cartActions';
import {Action} from '../reduxTypes';

const initState = {
    numOfItems: 0,
    items: []
};


const cartReducers = (state = initState , action: Action) => {
    switch (action.type){
        case ADD_TO_CART: return {...state, numOfItems: state.numOfItems + parseInt(action.payload.amount), items: [...state.items, action.payload.item]  };
        default: return state;
    }
}


export default cartReducers;