
const initialState = {
    notifications : [],
    notificationCreated: false
};



const notificationReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'CREATE_NOTIFICATION_SUCCESS':
            return {...state, notificationCreated: true}    
        default:
            return {...state}
    }
};

export default notificationReducer;
