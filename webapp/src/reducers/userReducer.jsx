
const initialState = {
    user :{},
    imageUrl: null,
    updatedImage: false
};



const userReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'USER_FETCH_SUCCESS':
            return {...state, user: action.payload,updatedImage: false} 
        case 'UPLOAD_IMAGE_SUCCESS':
            return {...state, imageUrl: action.payload}
        case 'UPDATE_IMAGE_SUCCESS':
            return {...state, imageUrl:"", updatedImage: true}
        default:
            return {...state}
    }
};

export default userReducer;
