
import api from '../api/api';


export const getNotificationById = (id,token) => {  
    return (dispatch) => {
        
    return api.getNotificationById(id,token).then(response => {
        dispatch(notificationFetchSuccess(response.data))
    })
}
};

export const setNotificationsToShown = (notShownNotifications,token) => {  
    return (dispatch) => {
        
    return api.setNotificationsToShown(notShownNotifications,token).then(response => {
        dispatch(notificationSetToShown())
    })
}
};

const notificationSetToShown = () => {
    return{
        type: 'NOTIFICATION_SET_TO_SHOWN_SUCCESS'

    }
}

const notificationFetchSuccess = (notifications) =>{


    return{
        type: 'FETCH_NOTIFICATION_SUCCESS',
        payload: notifications,
    }
}