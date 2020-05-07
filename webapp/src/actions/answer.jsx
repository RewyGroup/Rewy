import api from '../api/api';


export const setCorrectAnswer = (answerId,token) =>{
    return(dispatch) => {
        return api.setCorrectAnswer(answerId,token).then(response => {
            dispatch(setCorrect())
        })
    }
}

const setCorrect = () =>{

    return{
    type: 'ANSWER_CORRECT'
    
}
};

