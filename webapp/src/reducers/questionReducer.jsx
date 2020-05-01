
const initialState = {
    message: "",
    error : "",
    questionList:[]
};



const questionReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'CREATE_QUESTION_SUCCESS':
            return {...state, message: action.message , error: ""}
        case 'CREATE_QUESTION_ERROR':
            return {...state, message: "", error: action.error.message}
        case 'GET_ALL_QUESTION_SUCCESS':
            return {...state, message: "", error: "", questionList: action.payload}
        default:
            return {...state, message: "", error:""}
    }
};

export default questionReducer;
