import api from '../api/api';


export const getUserById = (id) =>{
    return(dispatch) => {
        return api.getUserById(id).then(response => {
            dispatch(getUser(response.data))
        })
    }
}

const getUser = (user) =>{

    return{
    type: 'USER_FETCH_SUCCESS',
    payload: user
    
}
};


