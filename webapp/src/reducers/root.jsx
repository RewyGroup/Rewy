import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import questionReducer from './questionReducer';
import categoryReducer from './categoryReducer';
import answerReducer from './answerReducer';
import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key:'root',
    storage,
    whitelist:['questionReducer']
}

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    registerReducer: registerReducer,
    questionReducer: questionReducer,
    categoryReducer: categoryReducer,
    answerReducer:answerReducer
    
});

export default persistReducer(persistConfig,rootReducer);