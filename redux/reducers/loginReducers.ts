import { INPUT_EMAIL_USERNAME, INPUT_PASSWORD } from "../actions/loginActions";
import { Action } from "../reduxTypes";


const initState = {
  email_username: '',
  password: ''
}

const loginReducers = (state = initState, action: Action) => {
  switch (action.type){
    case INPUT_EMAIL_USERNAME: return {...state, email_username: action.payload};
    case INPUT_PASSWORD: return {...state, password: action.payload};
    default: return state;
  }
}

export default loginReducers;