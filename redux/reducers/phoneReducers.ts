import { FETCH_LATEST_PHONES, CHANGE_QUANTITY, CHANGE_PHONE_CATEGORY, CHANGE_BID_CATEGORY } from '../actions/phonesActions';
import {Action} from '../reduxTypes';

const initState = {
    quantity: 1,
    phoneOptions: {
        category: "All Phones",
        brand: "All",
        price: "All",
        sorting: "none"
   },
   bidOptions: {
       category: "All Phones",
       brand: "All",
       price: "All",
       sorting: "none"
   }
};

const phoneReducers = (state = initState , action: Action) => {
    switch (action.type){
        case FETCH_LATEST_PHONES: return {...state, list: action.payload};
        case CHANGE_QUANTITY: return {...state, quantity: action.payload};
        case CHANGE_PHONE_CATEGORY: return {...state, phoneOptions: action.payload}
        case CHANGE_BID_CATEGORY: return {...state, bidOptions: action.payload}
        default: return state;
    }
}


export default phoneReducers;