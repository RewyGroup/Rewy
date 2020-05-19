
import api from '../api/api';


export const createNotification = (targetUserId,type,token) => {  
    return (dispatch) => {
        
    return api.createNotification(targetUserId,type,token).then(response => {
        dispatch(notificationSuccess())
    })
}
};

const notificationSuccess = () =>{


    return{
        type: 'CREATE_NOTIFICATION_SUCCESS'
        
    }
}