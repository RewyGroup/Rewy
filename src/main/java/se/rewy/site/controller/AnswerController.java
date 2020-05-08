package se.rewy.site.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.rewy.site.exception.UserServiceException;
import se.rewy.site.models.Answer;
import se.rewy.site.models.web.AnswerWeb;
import se.rewy.site.services.AnswerService;

import java.util.Set;

@RestController
@RequestMapping("/answer")
public class AnswerController {


     private final AnswerService answerService;


        @Autowired
        public AnswerController(AnswerService answerService) {
            this.answerService= answerService;
        }

        @PostMapping("/create")
    public ResponseEntity<?> createAnswer(@RequestBody AnswerWeb answerWeb)throws UserServiceException {
            answerService.create(answerWeb);
            return ResponseEntity.ok().build();
        }

    @PostMapping("/correct/{id}")
    public ResponseEntity<?> makeAnswerCorrect(@PathVariable long id )throws UserServiceException {
        answerService.makeAnswerCorrectByAnswerId(id);
        return ResponseEntity.ok().build();
    }

        @GetMapping("/{id}")
    public ResponseEntity<Answer> findAnswerById(@PathVariable long id){
            return ResponseEntity.ok(answerService.findById(id));
        }
    }
