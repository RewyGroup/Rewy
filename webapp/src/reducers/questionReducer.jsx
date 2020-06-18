
const initialState = {
    message: "",
    error : "",
    questionList:[],
    question:{} ,
    questionIsCreated :false,
    questionLoaded: false
};



const questionReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'CREATE_QUESTION_SUCCESS':
            return {...state, message: action.message , error: "", questionIsCreated: true}
        case 'CREATE_QUESTION_ERROR':
            return {...state, message: "", error: action.error.message, questionIsCreated:false}
            case 'GET_ALL_USER_QUESTIONS_SUCCESS':
                return {...state, questionList:action.payload,questionLoaded:true}    
        case 'GET_ALL_QUESTION_SUCCESS':
            return {...state, message: "", error: "", questionList: action.payload, questionIsCreated: false,questionLoaded:true}
        case 'GET_ALL_QUESTION_BY_CATEGORY_SUCCESS':
            return {...state, message: "", error: "", questionList: action.payload, question:null, questionIsCreated: false,questionLoaded:true}  
        case 'GET_QUESTION_SUCCESS':
            return {...state, message: "", error: "", question:action.payload, questionIsCreated: false}     
        case 'QUESTION_VOTE_CREATED_SUCCESS':
            return {...state,  message: "", error: "", questionList: [], question:{}, questionIsCreated: false}
        default:
            return {...state, message: "", error:"", questionIsCreated: false}
    }
};

export default questionReducer;
