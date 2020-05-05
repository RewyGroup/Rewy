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
export const getAllQuestions = (token) =>{
    return(dispatch) => {
        return api.getAllQuestions(token).then(response => {
            dispatch(allQuestions(response.data))
        })
    }
}

export const getQuestionById = (id,token) =>{
    return(dispatch) => {
        return api.getQuestionById(id,token).then(response => {
            dispatch(selectedQuestion(response.data))
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

const selectedQuestion = (question) =>{

    return{
    type: 'GET_QUESTION_SUCCESS',
    payload: question
    
}
};

