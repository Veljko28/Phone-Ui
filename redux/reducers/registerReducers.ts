import { CHANGE_CONFIRM_PASSWORD, CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_USERNAME } from '../actions/registerActions';
import {Action} from '../reduxTypes';

const initState = {
  email: '',
  userName: '',
  password: '',
  confirmPassword: ''
}

const registerReducers = (state = initState , action: Action) => {
    switch (action.type){
        case CHANGE_EMAIL: return {...state, email: action.payload};
        case CHANGE_USERNAME: return {...state, userName: action.payload};
        case CHANGE_PASSWORD: return {...state, password: action.payload};
        case CHANGE_CONFIRM_PASSWORD: return {...state, confirmPassword: action.payload};
        default: return state;
    }
}


export default registerReducers;