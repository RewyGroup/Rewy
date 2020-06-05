
const initialState = {
    categoryList : [],
    subCategoryList: [],
    selectedCategory: ""
};



const categoryReducer = ( state = initialState ,action) => {
    switch(action.type){
        case 'GET_ALL_CATEGORIES_SUCCESS':
            return {...state, categoryList: action.payload} 
        case 'GET_ALL_SUBCATEGORIES_BY_ID_SUCCESS':
            return {...state, subCategoryList: action.payload}
        case 'GET_SELECTED_CATEGORY_SUCCESS':
            return {...state, selectedCategory: action.payload}
        default:
            return {...state}
    }
};

export default categoryReducer;
