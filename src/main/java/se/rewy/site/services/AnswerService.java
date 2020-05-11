package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.exception.UserServiceException;
import se.rewy.site.models.*;
import se.rewy.site.models.web.AnswerWeb;
import se.rewy.site.models.web.QuestionWeb;
import se.rewy.site.repository.AnswerRepository;
import se.rewy.site.repository.QuestionRepository;
import se.rewy.site.repository.UserRepository;
import se.rewy.site.repository.VoteRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final VoteRepository voteRepository;

    @Autowired
    public AnswerService(AnswerRepository answerRepository,UserRepository userRepository,QuestionRepository questionRepository, VoteRepository voteRepository) {
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.voteRepository = voteRepository;
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
    public void makeAnswerCorrectByAnswerId(long id) {
        Optional<Answer> optionalAnswer = answerRepository.findById(id);
        if(optionalAnswer.isPresent()){
            Answer answer = optionalAnswer.get();
            if (!answer.isCorrect()){
                answer.setCorrect(true);
                answerRepository.save(answer);
            }else{
                throw new UserServiceException("Answer is already correct!");
            }
        }
    }

    public void CreateOrUpdateAnswerVote(AnswerWeb answerWeb){
        long answerId = answerWeb.getId();
        long userId = answerWeb.getUserId();
        String voteType = answerWeb.getVoteType();

        Answer answer = answerRepository.findById(answerId).get();
        Vote vote = findVoteByAnswerAndUserId(answer,userId);
        if(vote == null){
            vote = new Vote();
            User user = userRepository.findById(userId).get();
            vote.setUser(user);
        }
        switch (voteType){
            case  "UPVOTE":
                vote.setType(VoteType.UPVOTE);
                break;

            case "DOWNVOTE":
                vote.setType(VoteType.DOWNVOTE);
                break;

            default:
                vote.setType(VoteType.NEUTRAL);
        }
        voteRepository.save(vote);
        answer.getVotes().add(vote);
        answerRepository.save(answer);


    }

    public Vote findVoteByAnswerAndUserId(Answer answer, long userId) {

        for (Vote vote : answer.getVotes()) {
            if (vote.getUser().getId().equals(userId)) {
                return vote;
            }
        }
        return null;
    }
}
