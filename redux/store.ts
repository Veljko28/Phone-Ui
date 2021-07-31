import {combineReducers, createStore} from 'redux';
import cartReducers from './reducers/cartReducers';
import langReducers from './reducers/langReducers';
import phoneReducers from './reducers/phoneReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userInfoReducers } from './reducers/userInfoReducers';


const rootReducer = combineReducers({
    language: langReducers,
    cart: cartReducers,
    phones: phoneReducers,
    userInfo: userInfoReducers,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;