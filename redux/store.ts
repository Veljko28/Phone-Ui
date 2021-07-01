import {combineReducers, createStore} from 'redux';
import cartReducers from './reducers/cartReducers';
import langReducers from './reducers/langReducers';
import phoneReducers from './reducers/phoneReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import loginReducers from './reducers/loginReducers';


const rootReducer = combineReducers({
    language: langReducers,
    cart: cartReducers,
    phones: phoneReducers,
    login: loginReducers
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;