import { CHANGE_LOGIN_STATUS, TOGGLE_NAVBAR } from "../actions/userInfoActions";
import { Action } from "../reduxTypes";

const initState = {
  navbarToggle: false,
  logged_in: false
};

export const userInfoReducers = (state = initState, action: Action) => {
  switch (action.type){
    case TOGGLE_NAVBAR: return {...state,navbarToggle: !state.navbarToggle};
    case CHANGE_LOGIN_STATUS: return {...state,logged_in: action.payload}
    default: return state;
  }
}