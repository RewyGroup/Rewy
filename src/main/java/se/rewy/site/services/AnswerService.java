package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.exception.UserServiceException;
import se.rewy.site.models.*;
import se.rewy.site.models.web.AnswerWeb;
import se.rewy.site.repository.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final VoteRepository voteRepository;
    private final NotificationRepository notificationRepository;
    private final NotifyUserRepository notifyUserRepository;
    private final VoteService voteService;
    @Autowired
    public AnswerService(AnswerRepository answerRepository, UserRepository userRepository, QuestionRepository questionRepository, VoteRepository voteRepository,
                         NotificationRepository notificationRepository, NotifyUserRepository notifyUserRepository, VoteService voteService) {
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.voteRepository = voteRepository;
        this.notificationRepository = notificationRepository;
        this.notifyUserRepository = notifyUserRepository;
        this.voteService = voteService;
    }
    public Answer findById(long id){
        return answerRepository.findById(id).get();
    }

    public void create(AnswerWeb answerWeb){
        Answer answer = new Answer();

        Optional<User> optionalUser = userRepository.findById(answerWeb.getUserId());
        Optional<Question> optionalQuestion = questionRepository.findById(answerWeb.getQuestionId());
        if (optionalUser.isPresent() && optionalQuestion.isPresent()){
            User user = optionalUser.get();
            Question question = optionalQuestion.get();
            User questionOwner = question.getUser();
            answer.setUser(user);
            answer.setQuestion(question);
            if(user.getId() != questionOwner.getId()) {
                Notification notification = new Notification();
                notification.setType("answer");
                notification.setUser(user);
                notification.setCreatedAt(LocalDateTime.now());
                notification.setNotificationText(user.getUsername() + " har svarat på din fråga " + question.getTitle());
                notificationRepository.save(notification);

                long userToNotify = questionOwner.getId();
                NotifyUser notifyUser = new NotifyUser();
                notifyUser.setNotification(notification);
                notifyUser.setUserId(userToNotify);
                notifyUserRepository.save(notifyUser);
            }

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

        Vote newVote = voteService.setVoteType(vote,userId,voteType);
        voteRepository.save(newVote);
        answer.getVotes().add(newVote);
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
