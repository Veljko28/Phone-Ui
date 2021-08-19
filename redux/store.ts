import {combineReducers, createStore} from 'redux';
import cartReducers from './reducers/cartReducers';
import langReducers from './reducers/langReducers';
import phoneReducers from './reducers/phoneReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userInfoReducers } from './reducers/userInfoReducers';
import { notificationReducers } from './reducers/notificationReducers';


const rootReducer = combineReducers({
    language: langReducers,
    cart: cartReducers,
    phones: phoneReducers,
    userInfo: userInfoReducers,
    notification: notificationReducers, 
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;