import { TOGGLE_NAVBAR } from "../actions/userInfoActions";
import { Action } from "../reduxTypes";

const initState = {
  navbarToggle: false
};

export const userInfoReducers = (state = initState, action: Action) => {
  switch (action.type){
    case TOGGLE_NAVBAR: return {...state,navbarToggle: !state.navbarToggle};
    default: return state;
  }
}