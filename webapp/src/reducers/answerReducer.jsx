const initialState = {
    answerList : [],
};



const answerReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'ANSWER_CORRECT':
            return {...state}
        case 'ANSWER_CREATED_SUCCESS':
            return {...state}       
        default:
            return {...state}
    }
};

export default answerReducer;
