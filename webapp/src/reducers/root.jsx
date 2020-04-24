import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    loginReducer: loginReducer,
    registerReducer: registerReducer,
});

export default rootReducer;