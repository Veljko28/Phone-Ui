import { FETCH_LATEST_PHONES } from '../actions/phonesActions';
import {Action} from '../reduxTypes';

const initState = {
    list: [{name: 'Pixel 1', id: '1'}, {name: 'IPhone 7+', id: '2'}, {name: 'Redmi Note 9', id: '3'}, {name: 'Nokia 5', id: '4'}]
};

const phoneReducers = (state = initState , action: Action) => {
    switch (action.type){
        case FETCH_LATEST_PHONES: return {...state, list: action.payload};
        default: return state;
    }
}


export default phoneReducers;