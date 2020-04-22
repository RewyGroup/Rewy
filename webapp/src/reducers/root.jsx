import counterReducer from './counter';
import isLoggedReducer from './isLogged';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    count: counterReducer,
    isLoggedIn: isLoggedReducer
});

export default rootReducer;