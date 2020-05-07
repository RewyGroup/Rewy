import api from '../api/api';


export const setCorrectAnswer = (answerId,token) =>{
    return(dispatch) => {
        return api.setCorrectAnswer(answerId,token).then(response => {
            dispatch(setCorrect())
        })
    }
}
export const createAnswer = (answerWeb,token) =>{
    return(dispatch) => {
        return api.createAnswer(answerWeb,token).then(response => {
            dispatch(createdAnswer())
        })
    }
}

const setCorrect = () =>{

    return{
    type: 'ANSWER_CORRECT'
    
}
};

const createdAnswer = () =>{

    return{
    type: 'ANSWER_CREATED_SUCCESS'
    
}
};

