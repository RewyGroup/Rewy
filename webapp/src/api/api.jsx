import axios from 'axios';

export const api = () => {

    const baseURL = 'http://localhost:4000'

    return {
         signIn : (user) => axios.post(baseURL + "/auth/login",user),
         register: (user) => axios.post(baseURL + "/user/create",user),
         uploadProfileImage: (formdata) => axios.post(baseURL + "/upload", formdata, {  headers: {'Content-Type': 'multipart/form-data'}})
              
    }
    
 
};

export default api();
