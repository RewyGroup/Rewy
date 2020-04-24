
const initialState = {
    isLoggedIn: false,
    token : "",
    error : ""
};



const loginReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'SIGN_IN':
            return {...state, isLoggedIn: initialState.isLoggedIn = true, token: action.payload}
        case 'SIGN_IN_ERROR':
            return {...state, isLoggedIn: initialState.isLoggedIn = false, error: action.error.message}
        case 'SIGN_OUT':
            return {...state, isLoggedIn: initialState.isLoggedIn = false, token: ""}
        case 'STILL_LOGGED_IN':
            return {...state, isLoggedIn: initialState.isLoggedIn = true, token: action.payload} 
        case 'SESSION_TIMED_OUT':
            return {...state, isLoggedIn: initialState.isLoggedIn = false, token: ""} 
        default:
            return {...state, isLoggedIn: initialState.isLoggedIn}
    }
};

export default loginReducer;
