
const initialState = {
    isLoggedIn: false,
    error : "",
    user:{},
};



const loginReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'SIGN_IN':
            return {...state, isLoggedIn: initialState.isLoggedIn = true}
        case 'SIGN_IN_ERROR':
            return {...state, isLoggedIn: initialState.isLoggedIn = false, error: action.error.message}
        case 'SIGN_OUT':
            return {...state, isLoggedIn: initialState.isLoggedIn = false, user: {}}
        case 'STILL_LOGGED_IN':
            return {...state, isLoggedIn: initialState.isLoggedIn = true, user: action.user} 
        case 'SESSION_TIMED_OUT':
            return {...state, isLoggedIn: initialState.isLoggedIn = false, user:{}} 
        default:
            return {...state, isLoggedIn: initialState.isLoggedIn}
    }
};

export default loginReducer;
