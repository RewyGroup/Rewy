
const initialState = {
    user :{},
};



const userReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'USER_FETCH_SUCCESS':
            return {...state, user: action.payload} 
        default:
            return {...state}
    }
};

export default userReducer;
