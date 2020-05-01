import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import questionReducer from './questionReducer';
import categoryReducer from './categoryReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    loginReducer: loginReducer,
    registerReducer: registerReducer,
    questionReducer: questionReducer,
    categoryReducer: categoryReducer,
});

export default rootReducer;