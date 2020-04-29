import api from '../api/api';



export const createQuestion = (questionWeb,token) => {
    return (dispatch) => {
        
        return api.createQuestion(questionWeb,token).then(response => {
            console.log(response.data);
            dispatch(questionSuccess(response.data))
        })
        .catch(error =>{
            dispatch({
                type: 'CREATE_QUESTION_ERROR',error:error.response.data
            })
        })
    }
}

const questionSuccess = (message) =>{

    return{
    type: 'CREATE_QUESTION_SUCCESS',
    payload: message
    
}
};