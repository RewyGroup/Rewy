import axios from 'axios';
import {baseURL} from "./URL";

export const api = () => {

    return {
         signIn : (user) => axios.post(baseURL + "/auth/login",user),
         register: (user) => axios.post(baseURL + "/user/create",user),
         uploadProfileImage: (formdata) => axios.post(baseURL + "/upload", formdata, {  headers: {'Content-Type': 'multipart/form-data'}}),
         createQuestion: (questionWeb,token) => axios.post(baseURL + "/question/create", questionWeb, { headers:{'Authorization': 'Bearer '+ token}}),
         getQuestionById:(id) => axios.get(baseURL+ "/question/" +id),
         getAllQuestionsByCategoryName:(categoryName) => axios.get(baseURL + "/question/category/" + categoryName),
         getAllQuestions: () => axios.get(baseURL + "/question/all"),
         getAllCategories: () => axios.get(baseURL + "/category/all"),
         getAllSubCategoriesByCategoryId:(categoryId) => axios.get(baseURL + "/subCategory/all/" + categoryId),
         
    }

};

export default api();
