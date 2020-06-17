
const initialState = {
    user :{},
    users : [],
    imageUrl: null,
    updatedImage: false,
    updatedProfile: false,
    error:""
};



const userReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'USER_FETCH_SUCCESS':
            return {...state, user: action.payload,updatedImage: false, updatedProfile: false} 
        case 'SELECTED_USER_FETCH_SUCCESS':
            return {...state, user: action.payload,updatedImage: false, updatedProfile: false}
        case 'UPLOAD_IMAGE_SUCCESS':
            return {...state, imageUrl: action.payload}
        case 'UPDATE_IMAGE_SUCCESS':
            return {...state, imageUrl:"", updatedImage: true}
        case 'UPDATE_PROFILE_ERROR':
            return {...state, imageUrl:"", error: action.error}
        case 'UPDATE_PROFILE_SUCCESS':
            return {...state, imageUrl:"", updatedProfile: true}
        case 'GET_ALL_USERS_SUCCESS':
            return {...state, users: action.payload, user:{}}
        default:
            return {...state}
    }
};

export default userReducer;
