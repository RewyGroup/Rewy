
import api from '../api/api';


export const getNotificationById = (id,token) => {  
    return (dispatch) => {
        
    return api.getNotificationById(id,token).then(response => {
        dispatch(notificationFetchSuccess(response.data))
    })
}
};

const notificationFetchSuccess = (notifications) =>{


    return{
        type: 'FETCH_NOTIFICATION_SUCCESS',
        action: notifications
    }
}