import { FETCH_LATEST_PHONES } from '../actions/phonesActions';
import {Action} from '../reduxTypes';

const initState = {
    list: [
        {name: 'Pixel 1', id: '1'}, {name: 'IPhone 7+', id: '2'},
        {name: 'Redmi Note 9', id: '3'}, {name: 'Nokia 5', id: '4'},
        {name: 'Pixel 1', id: '5'}, {name: 'IPhone 7+', id: '6'},
        {name: 'Redmi Note 9', id: '7'}, {name: 'Nokia 5', id: '8'},
        {name: 'Pixel 1', id: '1'}, {name: 'IPhone 7+', id: '10'},
        {name: 'Redmi Note 9', id: '9'}, {name: 'Nokia 5', id: '12'},
        {name: 'Pixel 1', id: '1'}, {name: 'IPhone 7+', id: '14'},
        {name: 'Redmi Note 9', id: '11'}, {name: 'Nokia 5', id: '16'},
        {name: 'Pixel 1', id: '13'}, {name: 'IPhone 7+', id: '18'},
    ]
};

const phoneReducers = (state = initState , action: Action) => {
    switch (action.type){
        case FETCH_LATEST_PHONES: return {...state, list: action.payload};
        default: return state;
    }
}


export default phoneReducers;