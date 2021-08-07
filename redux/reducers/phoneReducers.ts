import { FETCH_LATEST_PHONES, CHANGE_QUANTITY } from '../actions/phonesActions';
import {Action} from '../reduxTypes';

const initState = {
    list: [
        {name: 'Pixel 1', id: '1'}, {name: 'IPhone 7+', id: '2'},
        {name: 'Redmi Note 9', id: '3'}, {name: 'Nokia 5', id: '4'},
        {name: 'Pixel 1', id: '5'}, {name: 'IPhone 7+', id: '6'},
        {name: 'Redmi Note 9', id: '7'}, {name: 'Nokia 5', id: '8'},
        {name: 'Nokia 5', id: '9'},
    ],
    quantity: 1,
};

const phoneReducers = (state = initState , action: Action) => {
    switch (action.type){
        case FETCH_LATEST_PHONES: return {...state, list: action.payload};
        case CHANGE_QUANTITY: return {...state, quantity: action.payload};
        default: return state;
    }
}


export default phoneReducers;