package se.rewy.site.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.rewy.site.exception.UserServiceException;
import se.rewy.site.models.Question;
import se.rewy.site.models.web.QuestionWeb;
import se.rewy.site.services.QuestionService;

import java.util.Set;

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

    @GetMapping("/all")
    public ResponseEntity<Set<Question>> findAllQuestions(){
        Set<Question> allQuestions = questionService.findAll();
        return ResponseEntity.ok(allQuestions);
    }
}
