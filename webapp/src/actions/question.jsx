import api from '../api/api';



export const createQuestion = (questionWeb,token) => {
    return (dispatch) => {
        
        return api.createQuestion(questionWeb,token).then(response => {
            dispatch(questionSuccess(response.data))
        })
        .catch(error =>{
            dispatch({
                type: 'CREATE_QUESTION_ERROR',error:error.response.data
            })
        })
    }
}
export const getAllQuestions = () =>{
    return(dispatch) => {
        return api.getAllQuestions().then(response => {
            dispatch(allQuestions(response.data))
        })
    }
}


const questionSuccess = (message) =>{

    return{
    type: 'CREATE_QUESTION_SUCCESS',
    payload: message
    
}
};


const allQuestions = (questionList) =>{

    return{
    type: 'GET_ALL_QUESTION_SUCCESS',
    payload: questionList
    
}
};