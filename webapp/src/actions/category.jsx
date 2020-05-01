import api from '../api/api';


export const getAllCategories = (token) =>{
    return(dispatch) => {
        return api.getAllCategories(token).then(response => {
            dispatch(allCategories(response.data))
        })
    }
}

export const getAllSubCategoriesByCategoryId = (categoryId,token) =>{
    return(dispatch) => {
        return api.getAllSubCategoriesByCategoryId(categoryId,token).then(response => {
            dispatch(allSubCategoriesById(response.data))
        })
    }
}


const allCategories = (categoryList) =>{

    return{
    type: 'GET_ALL_CATEGORIES_SUCCESS',
    payload: categoryList
    
}
};


const allSubCategoriesById = (subCategoryList) =>{

    return{
    type: 'GET_ALL_SUBCATEGORIES_BY_ID_SUCCESS',
    payload: subCategoryList
    
}
};
