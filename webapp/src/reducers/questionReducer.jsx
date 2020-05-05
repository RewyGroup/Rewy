
const initialState = {
    message: "",
    error : "",
    questionList:[],
    questionIsCreated :false
};



const questionReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'CREATE_QUESTION_SUCCESS':
            return {...state, message: action.message , error: "", questionIsCreated: true}
        case 'CREATE_QUESTION_ERROR':
            return {...state, message: "", error: action.error.message, questionIsCreated:false}
        case 'GET_ALL_QUESTION_SUCCESS':
            return {...state, message: "", error: "", questionList: action.payload, questionIsCreated: false}
        default:
            return {...state, message: "", error:"", questionIsCreated: false}
    }
};

export default questionReducer;
