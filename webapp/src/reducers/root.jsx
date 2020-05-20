import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import questionReducer from './questionReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import answerReducer from './answerReducer';
import notificationReducer from './notificationReducer';
import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key:'root',
    storage,
    whitelist:['userReducer']
}

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    registerReducer: registerReducer,
    questionReducer: questionReducer,
    categoryReducer: categoryReducer,
    answerReducer:answerReducer,
    userReducer:userReducer,
    notificationReducer:notificationReducer,
    
});

export default persistReducer(persistConfig,rootReducer);