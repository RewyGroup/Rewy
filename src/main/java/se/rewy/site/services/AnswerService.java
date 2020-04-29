package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.exception.UserServiceException;
import se.rewy.site.models.Answer;
import se.rewy.site.models.Question;
import se.rewy.site.models.User;
import se.rewy.site.models.web.AnswerWeb;
import se.rewy.site.repository.AnswerRepository;
import se.rewy.site.repository.QuestionRepository;
import se.rewy.site.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    @Autowired
    public AnswerService(AnswerRepository answerRepository,UserRepository userRepository,QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;

    }
    public Answer findById(long id){
        return answerRepository.findById(id).get();
    }

    public void create(AnswerWeb answerWeb){
        Answer answer = new Answer();

        Optional<User> user = userRepository.findById(answerWeb.getUserId());
        Optional<Question> question = questionRepository.findById(answerWeb.getQuestionId());
        if (user.isPresent() && question.isPresent()){
            answer.setUser(user.get());
            answer.setQuestion(question.get());
        }else{
            throw new UserServiceException("Something went wrong!");
        }

        answer.setText(answerWeb.getText());
        answer.setCreatedAt(LocalDateTime.now());
        answerRepository.save(answer);

    }
}
