package se.rewy.site.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.rewy.site.models.*;
import se.rewy.site.services.CategoryService;
import se.rewy.site.services.QuestionService;
import se.rewy.site.services.SubCategoryService;
import se.rewy.site.services.UserService;

@RestController
@RequestMapping("/")
public class HomeController {
    private final UserService userService;
    private final QuestionService questionService;
    private final CategoryService categoryService;
    private final SubCategoryService subCategoryService;

    @Autowired
    public HomeController(UserService userService,QuestionService questionService,CategoryService categoryService,SubCategoryService subCategoryService){
        this.userService = userService;
        this.questionService = questionService;
        this.categoryService = categoryService;
        this.subCategoryService = subCategoryService;

    }

    @PostMapping("category")
    ResponseEntity<Category> createCategory(@RequestBody Category category){
        categoryService.create(category);
        return ResponseEntity.ok().build();

    }
    @PostMapping("sub_category")
    ResponseEntity<SubCategory> createSubCategory(@RequestBody SubCategory subCategory){
        subCategoryService.create(subCategory);
        return ResponseEntity.ok().build();
    }

    @PostMapping("question")
    ResponseEntity<Question> createQuestion(@RequestBody Question question){
        questionService.create(question);
        return ResponseEntity.ok().build();
    }

     @GetMapping("user/{id}")
     ResponseEntity<User> findUserById(@PathVariable long id){
        User user =userService.findById(id);
        user.setRole(Role.ADMIN);
        return ResponseEntity.ok(user);
     }

     @GetMapping("question/{id}")
    ResponseEntity<Question> findQuestionById(@PathVariable long id){
        Question question = questionService.findById(id);
        return  ResponseEntity.ok(question);
     }

     @GetMapping("sub_category/{id}")
    ResponseEntity<SubCategory> findSubCategoryById(@PathVariable long id){
         SubCategory subCategory = subCategoryService.findById(id);
         return  ResponseEntity.ok(subCategory);
     }
}
