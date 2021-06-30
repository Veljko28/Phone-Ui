import { FETCH_LATEST_PHONES } from '../actions/phonesActions';
import {Action} from '../reduxTypes';

const initState = {
    list: [{name: 'this', id: '1'}, {name: 'is', id: '2'}, {name: 'working', id: '3'}, {name: 'yay', id: '4'}]
};

const phoneReducers = (state = initState , action: Action) => {
    switch (action.type){
        case FETCH_LATEST_PHONES: return {...state, list: action.payload};
        default: return state;
    }
}


export default phoneReducers;