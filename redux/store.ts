import {combineReducers, createStore} from 'redux';
import cartReducers from './reducers/cartReducers';
import langReducers from './reducers/langReducers';
// import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
    language: langReducers,
    cart: cartReducers
});

const store = createStore(rootReducer);

export default store;