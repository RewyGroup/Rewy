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

export const getQuestionById = (id) =>{
    return(dispatch) => {
        return api.getQuestionById(id).then(response => {
            dispatch(selectedQuestion(response.data))
        })
    }
}

export const getAllQuestionsByCategoryName = (categoryName) =>{
    return(dispatch) => {
        return api.getAllQuestionsByCategoryName(categoryName).then(response => {
            dispatch(allQuestionsByCategory(response.data))
        })
    }
}

export const createQuestionVote = (questionWeb,token) =>{
    return(dispatch) => {
        return api.createQuestionVote(questionWeb,token)
    }
}


export const setQuestion = (question) =>{

    return{
    type: 'SET_QUESTION_SUCCESS',
    payload: question
    
}
};


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

const allQuestionsByCategory = (questionList) =>{

    return{
    type: 'GET_ALL_QUESTION_BY_CATEGORY_SUCCESS',
    payload: questionList
    
}
};

const selectedQuestion = (question) =>{

    return{
    type: 'GET_QUESTION_SUCCESS',
    payload: question
    
}
};

const createdQuestionVote = () =>{

    return{
    type: 'QUESTION_VOTE_CREATED_SUCCESS',
    
}
};

