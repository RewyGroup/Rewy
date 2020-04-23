
import api from '../api/api';



export const register = (user) => {  
 return (dispatch) => {
        
    return api.register(user).then(response => {
        dispatch(registerSuccess())
    })
    .catch(error =>{

        dispatch({
            type: 'REGISTER_ERROR',error:error.response.data.message
        })
    })

}
};

const registerSuccess= () =>{


    return{
        type: 'REGISTER_SUCCESS'
        
    }
}