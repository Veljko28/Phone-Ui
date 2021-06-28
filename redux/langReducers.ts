import {Action} from './reduxTypes';
import {CHANGE_LANGUAGE} from './actions';

const initState = {
    lang: 'en'
};


const langReducers = (state = initState , action: Action) => {
    switch (action.type){
        case CHANGE_LANGUAGE: return {...state, lang: action.payload};
        default: return state;
    }
}


export default langReducers;