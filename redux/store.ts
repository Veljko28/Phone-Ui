import {combineReducers, createStore} from 'redux';
import langReducers from './langReducers';
// import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
    language: langReducers
});

const store = createStore(rootReducer);

export default store;