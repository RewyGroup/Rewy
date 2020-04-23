import isLoggedReducer from './isLogged';
import registerReducer from './register';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    isLoggedIn: isLoggedReducer,
    registerError: registerReducer,
});

export default rootReducer;