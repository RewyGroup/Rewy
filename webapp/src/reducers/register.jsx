
const initialState = {
    error : "",
    isRegistered: false
};



const registerReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'REGISTER_ERROR':
            return {...state, error: action.error}
        case 'REGISTER_SUCCESS':
            return {...state, error:initialState.error, isRegistered: true}    
        default:
            return {...state}
    }
};

export default registerReducer;
