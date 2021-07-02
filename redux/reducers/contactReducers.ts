import { CHANGE_CONTACT_EMAIL, CHANGE_CONTACT_MESSAGE, CHANGE_CONTACT_NAME, CHANGE_CONTACT_SUBJECT } from '../actions/contactActions';
import {Action} from '../reduxTypes';

const initState = {
  email: '',
  name: '',
  subject: '',
  message: ''
}

const contactReducers = (state = initState , action: Action) => {
    switch (action.type){
        case CHANGE_CONTACT_EMAIL: return {...state, email: action.payload};
        case CHANGE_CONTACT_NAME: return {...state, name: action.payload};
        case CHANGE_CONTACT_SUBJECT: return {...state, subject: action.payload};
        case CHANGE_CONTACT_MESSAGE: return {...state, message: action.payload};
        default: return state;
    }
}


export default contactReducers;