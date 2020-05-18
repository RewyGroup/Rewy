import api from '../api/api';


export const getUserById = (id) =>{
    return(dispatch) => {
        return api.getUserById(id).then(response => {
            dispatch(getUser(response.data))
        })
    }
}


export const uploadProfileImage = (image,token) =>{
    return(dispatch) => {
        return api.uploadProfileImage(image,token).then(response => {
            dispatch(uploadProfileImageUrl(response.data))
        })
    }
}

export const updateProfileImageUrlByUserId = (id,imageUrl,token) =>{
    return(dispatch) => {
        return api.updateProfileImageUrlByUserId(id,imageUrl,token).then(response => {
            dispatch(updateProfileImageUrl(response.data))
        })
    }
}

const getUser = (user) =>{

    return{
    type: 'USER_FETCH_SUCCESS',
    payload: user
    
}
};


const uploadProfileImageUrl = (imageUrl) =>{

    return{
    type: 'UPLOAD_IMAGE_SUCCESS',
    payload: imageUrl
    
}
};

const updateProfileImageUrl = (imageUrl) =>{

    return{
    type: 'UPDATE_IMAGE_SUCCESS',
    payload: imageUrl
    
}
};



