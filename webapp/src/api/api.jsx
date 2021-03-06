import axios from 'axios';
import {baseURL} from "./URL";

export const api = () => {

    return {
         signIn : (user) => axios.post(baseURL + "/auth/login",user),
         register: (user) => axios.post(baseURL + "/user/create",user),
         getUserById: (id) => axios.get(baseURL + "/user/" + id),
         getUserByUsername: (username) => axios.get(baseURL + "/user/username/" + username),
         getAllUsers: () => axios.get(baseURL + "/user/all"),
         updateProfileInformation:(user,token) => axios.post(baseURL+"/user/update/profileInformation",user,{ headers:{'Authorization': 'Bearer '+ token}}),
         updateProfileImageUrlByUserId:(id,imageUrl,token) => axios.post(baseURL + "/user/"+ id +"/update/profileImage",imageUrl,{ headers:{'Authorization': 'Bearer '+ token}}),
         createQuestionVote: (questionWeb,token) => axios.post(baseURL +"/question/vote",questionWeb,{ headers:{'Authorization': 'Bearer '+ token}}),
         getNotificationById: (id,token) => axios.get(baseURL+"/notification/"+ id, { headers:{'Authorization': 'Bearer '+ token}}),
         setNotificationsToShown: (notShownNotifications,token) => axios.post(baseURL+"/notification/update/",notShownNotifications, { headers:{'Authorization': 'Bearer '+ token}}),
         uploadProfileImage: (formdata,token) => axios.post(baseURL + "/upload", formdata, { headers: {'Content-Type': 'multipart/form-data','Authorization': 'Bearer '+ token}}),    
         createQuestion: (questionWeb,token) => axios.post(baseURL + "/question/create", questionWeb, { headers:{'Authorization': 'Bearer '+ token}}),
         getQuestionById:(id) => axios.get(baseURL+ "/question/" + id),
         getAllUsers:() => axios.get(baseURL+ "/user/all"),
         getAllQuestionsByUserId:(id) => axios.get(baseURL+ "/question/user/" + id),
         getAllQuestionsByCategoryName:(categoryName) => axios.get(baseURL + "/question/category/" + categoryName),
         getAllQuestions: () => axios.get(baseURL + "/question/all"),
         getAllCategories: () => axios.get(baseURL + "/category/all"),
         getAllSubCategoriesByCategoryId:(categoryId) => axios.get(baseURL + "/subCategory/all/" + categoryId),
         getAllUserPreferences:(id) => axios.get(baseURL + "/user/"+ id +"/preferences"),
         createAnswer: (answerWeb,token) => axios.post(baseURL + "/answer/create", answerWeb, { headers:{'Authorization': 'Bearer '+ token}}),
         createAnswerVote:(answerWeb,token) => axios.post(baseURL + "/answer/vote/",answerWeb,{ headers:{'Authorization': 'Bearer '+ token}}),
         setCorrectAnswer:(answerId,token) => axios.post(baseURL+ "/answer/correct/" + answerId , {}, { headers:{'Authorization': 'Bearer '+ token}}),
    }

};

export default api();
