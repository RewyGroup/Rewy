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

export const updateProfileInformation = (user,token) =>{
    return(dispatch) => {

        return api.updateProfileInformation(user,token).then(response => {
            dispatch(updateProfile())
        })
            .catch(error => {
                dispatch({
                    type: 'UPDATE_PROFILE_ERROR',error:error.response.data.message       
            })
        })
    }
};
export const getAllQuestionsById = (userId) => async (dispatch) => {

    const response = await api.getAllQuestionsByUserId(userId);
    dispatch({ type: "GET_ALL_USER_QUESTIONS_SUCCESS", payload: response.data });
  };

export const getAllUsers = () => async (dispatch) => {

    const response = await api.getAllUsers();
    dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: response.data });
  };

export const getUserByUsername = (username) => async (dispatch) => {

    const response = await api.getUserByUsername(username);
    dispatch({ type: "SELECTED_USER_FETCH_SUCCESS", payload: response.data });
  };

  export const getAllUserPreferences = (userId) => async (dispatch) => {

    const response = await api.getAllUserPreferences(userId);
    dispatch({ type: "PREFERENCES_FETCH_SUCCESS", payload: response.data });
  };



const updateProfile = () => {
    return{
        type: 'UPDATE_PROFILE_SUCCESS',

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



