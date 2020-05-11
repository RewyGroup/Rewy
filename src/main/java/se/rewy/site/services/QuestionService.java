package se.rewy.site.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.exception.UserServiceException;
import se.rewy.site.models.*;
import se.rewy.site.models.web.QuestionWeb;
import se.rewy.site.repository.*;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final VoteRepository voteRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository, UserRepository userRepository, CategoryRepository categoryRepository, SubCategoryRepository subCategoryRepository, VoteRepository voteRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.voteRepository = voteRepository;
    }

    public Question findById(long id) {
        return questionRepository.findById(id).get();
    }

    public void create(QuestionWeb questionWeb) {
        Question question = new Question();
        long userId = questionWeb.getUserId();
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            question.setUser(user.get());
        } else {
            throw new UserServiceException("User not found");
        }
        question.setTitle(questionWeb.getTitle());
        question.setText(questionWeb.getText());

        String categoryName = questionWeb.getCategory();
        Optional<Category> category = categoryRepository.findByTypeName(categoryName);
        if (category.isPresent()) {
            question.setCategory(category.get());

        } else {
            throw new UserServiceException("Category " + categoryName + " not found");
        }

        Set<SubCategory> subCategoryList = new HashSet<>();
        for (String s : questionWeb.getSubCategory()) {
            Optional<SubCategory> subCategory = subCategoryRepository.findByName(s);
            if (subCategory.isPresent()) {
                subCategoryList.add(subCategory.get());

            } else {
                throw new UserServiceException("SubCategory " + s + " not found");
            }
        }
        question.setSubCategoryList(subCategoryList);
        question.setCreatedAt(LocalDateTime.now());
        questionRepository.save(question);
    }

    public Set<Question> findAllQuestionsByCategoryName(String categoryName) {
        Optional<Category> category = categoryRepository.findByTypeName(categoryName);
        Set<Question> questions = new HashSet<>();
        if (category.isPresent()) {
            questions = questionRepository.findQuestionsByCategory_Id(category.get().getId());
            return questions;
        }
        return questions;
    }

    public void delete(long id) {
        questionRepository.deleteById(id);
    }

    public Set<Question> findAll() {
        return questionRepository.findAll();
    }


    public void CreateOrUpdateQuestionVote(QuestionWeb questionWeb){
        long questionId = questionWeb.getId();
        long userId = questionWeb.getUserId();
        String voteType = questionWeb.getVoteType();

        Question question = questionRepository.findById(questionId).get();
        Vote vote = findVoteByQuestionAndUserId(question,userId);

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
        question.getVotes().add(vote);
        questionRepository.save(question);


    }

    public Vote findVoteByQuestionAndUserId(Question question, long userId) {

        for (Vote vote : question.getVotes()) {
            if (vote.getUser().getId().equals(userId)) {
                return vote;
            }
        }
        return null;
    }
}
