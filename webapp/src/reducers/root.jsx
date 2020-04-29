import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import questionReducer from './questionReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    loginReducer: loginReducer,
    registerReducer: registerReducer,
    questionReducer: questionReducer,
});

export default rootReducer;