package se.rewy.site;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.rewy.site.models.Category;
import se.rewy.site.models.Question;
import se.rewy.site.models.User;
import se.rewy.site.services.CategoryService;
import se.rewy.site.services.QuestionService;
import se.rewy.site.services.UserService;

@RestController
@RequestMapping("/")
public class HomeController {
    private final UserService userService;
    private final QuestionService questionService;
    private final CategoryService categoryService;

    @Autowired
    public HomeController(UserService userService,QuestionService questionService,CategoryService categoryService){
        this.userService = userService;
        this.questionService = questionService;
        this.categoryService = categoryService;

    }

    @PostMapping("category")
    ResponseEntity<Category> createCategory(@RequestBody Category category){
        categoryService.create(category);
        return ResponseEntity.ok().build();

    }

    @PostMapping("question/create")
    ResponseEntity<Question> createQuestion(@RequestBody Question question){
        questionService.create(question);
        return ResponseEntity.ok().build();
    }

     @GetMapping("user/{id}")
     ResponseEntity<User> findUserById(@PathVariable long id){
        User user =userService.findById(id);
        return ResponseEntity.ok(user);
     }

     @GetMapping("question/{id}")
    ResponseEntity<Question> findQuestionById(@PathVariable long id){
        Question question = questionService.findById(id);
        return  ResponseEntity.ok(question);
     }
}
