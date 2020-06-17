package se.rewy.site.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.rewy.site.exception.UserServiceException;
import se.rewy.site.models.Question;
import se.rewy.site.models.web.QuestionWeb;
import se.rewy.site.services.QuestionService;

import java.util.*;

@RestController
@RequestMapping("/question")
public class QuestionController {
    private final QuestionService questionService;


    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createQuestion(@RequestBody QuestionWeb questionWeb){

        questionService.create(questionWeb);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{id}")
    ResponseEntity<Question> findQuestionById(@PathVariable long id)throws UserServiceException {
        Question question = questionService.findById(id);
        return  ResponseEntity.ok(question);
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<?> deleteQuestionById(@PathVariable long id){
        questionService.delete(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<Set<Question>> getAllQuestionsByCategoryName(@PathVariable String categoryName){
        Set<Question> allQuestionsByCategoryName = questionService.findAllQuestionsByCategoryName(categoryName);
        return ResponseEntity.ok(allQuestionsByCategoryName);
    }

    @GetMapping("/all")
    public ResponseEntity<Set<Question>> findAllQuestions(){
        Set<Question> allQuestions = questionService.findAll();
        return ResponseEntity.ok(allQuestions);
    }

    @PostMapping("/vote")
    public ResponseEntity<?>CreateOrUpdateQuestionVote(@RequestBody QuestionWeb questionWeb){
        questionService.CreateOrUpdateQuestionVote(questionWeb);
        return ResponseEntity.ok().build();
    }

    @GetMapping("user/{userId}")
    public  ResponseEntity<Set<Question>>getAllQuestionsByUserId(@PathVariable Long userId){
        Set <Question> allQuestions = questionService.findQuestionsByUserId(userId);
        return ResponseEntity.ok(allQuestions);
    }
}
