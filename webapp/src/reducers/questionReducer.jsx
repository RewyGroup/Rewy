
const initialState = {
    message: "",
    error : ""
};



const questionReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'CREATE_QUESTION_SUCCESS':
            return {...state, message: action.message , error: ""}
        case 'CREATE_QUESTION_ERROR':
            return {...state, message: "", error: action.error.message}
        default:
            return {...state, message: "", error:""}
    }
};

export default questionReducer;
