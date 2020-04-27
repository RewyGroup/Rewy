package se.rewy.site.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.exception.UserServiceException;
import se.rewy.site.models.Category;
import se.rewy.site.models.Question;
import se.rewy.site.models.SubCategory;
import se.rewy.site.models.User;
import se.rewy.site.models.web.QuestionWeb;
import se.rewy.site.repository.CategoryRepository;
import se.rewy.site.repository.QuestionRepository;
import se.rewy.site.repository.SubCategoryRepository;
import se.rewy.site.repository.UserRepository;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService{
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository, UserRepository userRepository,CategoryRepository categoryRepository,SubCategoryRepository subCategoryRepository){
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    public Question findById(long id){
        return questionRepository.findById(id).get();
    }

    public void create(QuestionWeb questionWeb) {
        Question question = new Question();
        long userId = questionWeb.getUserId();
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            question.setUser(user.get());
        }else{
            throw new UserServiceException("User not found");
        }
        question.setTitle(questionWeb.getTitle());
        question.setText(questionWeb.getText());

        String categoryName = questionWeb.getCategory();
        Optional<Category> category = categoryRepository.findByTypeName(categoryName);
        if(category.isPresent()){
            question.setCategory(category.get());

        }else{
            throw new UserServiceException("Category " + categoryName+ " not found");
        }

        List<SubCategory> subCategoryList = new ArrayList<>();
        for (String s : questionWeb.getSubCategory()){
            Optional<SubCategory> subCategory = subCategoryRepository.findByName(s);
            if(subCategory.isPresent()){
                subCategoryList.add(subCategory.get());

            }else{
                throw new UserServiceException("SubCategory " +  s  +" not found");
            }
        }
        question.setSubCategoryList(subCategoryList);
        question.setCreatedAt(LocalDateTime.now());
        questionRepository.save(question);
    }
}
