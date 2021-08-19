import { CHANGE_NUMBER_OF_NOTIFICATIONS } from "../actions/notificationActions";
import { Action } from "../reduxTypes";

const initState = {
  numOfNotifications: 0,
};

export const notificationReducers = (state = initState, action: Action) => {
  switch (action.type){
    case CHANGE_NUMBER_OF_NOTIFICATIONS: return {...state, numOfNotifications: action.payload};
    default: return state;
  }
}