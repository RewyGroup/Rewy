
const initialState = {
    notifications : [],
};



const notificationReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'FETCH_NOTIFICATION_SUCCESS':
            return {...state, notifications: action.payload}
        case 'NOTIFICATION_SET_TO_SHOWN_SUCCESS':
            return {...state}      
        default:
            return {...state}
    }
};

export default notificationReducer;
