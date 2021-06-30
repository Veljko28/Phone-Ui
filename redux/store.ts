import {combineReducers, createStore} from 'redux';
import cartReducers from './reducers/cartReducers';
import langReducers from './reducers/langReducers';
import phoneReducers from './reducers/phoneReducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
    language: langReducers,
    cart: cartReducers,
    phones: phoneReducers
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;