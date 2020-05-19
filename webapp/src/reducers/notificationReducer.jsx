
const initialState = {
    notifications : [],
};



const notificationReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'FETCH_NOTIFICATION_SUCCESS':
            return {...state, notifications: action.notifications}    
        default:
            return {...state}
    }
};

export default notificationReducer;
