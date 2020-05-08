import axios from 'axios';
import {baseURL} from "./URL";

export const api = () => {

    return {
         signIn : (user) => axios.post(baseURL + "/auth/login",user),
         register: (user) => axios.post(baseURL + "/user/create",user),
         getUserById: (id) => axios.get(baseURL + "/user/" + id),
         uploadProfileImage: (formdata) => axios.post(baseURL + "/upload", formdata, {  headers: {'Content-Type': 'multipart/form-data'}}),    
         createQuestion: (questionWeb,token) => axios.post(baseURL + "/question/create", questionWeb, { headers:{'Authorization': 'Bearer '+ token}}),
         getQuestionById:(id) => axios.get(baseURL+ "/question/" +id),
         getAllQuestionsByCategoryName:(categoryName) => axios.get(baseURL + "/question/category/" + categoryName),
         getAllQuestions: () => axios.get(baseURL + "/question/all"),
         getAllCategories: () => axios.get(baseURL + "/category/all"),
         getAllSubCategoriesByCategoryId:(categoryId) => axios.get(baseURL + "/subCategory/all/" + categoryId),
         createAnswer: (answerWeb,token) => axios.post(baseURL + "/answer/create", answerWeb, { headers:{'Authorization': 'Bearer '+ token}}),
         setCorrectAnswer:(answerId,token) => axios.post(baseURL+ "/answer/correct/" + answerId , {}, { headers:{'Authorization': 'Bearer '+ token}}),
    }

};

export default api();
