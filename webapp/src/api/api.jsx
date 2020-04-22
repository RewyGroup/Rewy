import axios from 'axios';

export const api = () => {

    const baseURL = 'http://localhost:4000'

    return {
         signIn : (user) => axios.post(baseURL + "/auth/login",user),
    }
    
 
};

export default api();
