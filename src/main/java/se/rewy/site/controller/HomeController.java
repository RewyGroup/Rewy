package se.rewy.site.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.rewy.site.models.*;
import se.rewy.site.services.*;

import javax.mail.MessagingException;


@RestController
@RequestMapping("/")
public class HomeController {
    private final UserService userService;
    private final QuestionService questionService;
    private final CategoryService categoryService;
    private final SubCategoryService subCategoryService;
    private final MailService mailService;


    @Autowired
    public HomeController(UserService userService, QuestionService questionService, CategoryService categoryService, SubCategoryService subCategoryService, MailService mailService){
        this.userService = userService;
        this.questionService = questionService;
        this.categoryService = categoryService;
        this.subCategoryService = subCategoryService;
        this.mailService = mailService;
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





     @GetMapping("sub_category/{id}")
    ResponseEntity<SubCategory> findSubCategoryById(@PathVariable long id){
         SubCategory subCategory = subCategoryService.findById(id);
         return  ResponseEntity.ok(subCategory);
     }
     @PostMapping("send/mail")
    ResponseEntity<?> sendMail() throws MessagingException {
        mailService.sendEmail();
        return ResponseEntity.ok().build();
     }
}

