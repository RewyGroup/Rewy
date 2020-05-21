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
    private final VoteService voteService;

    @Autowired
    public QuestionService(QuestionRepository questionRepository, UserRepository userRepository, CategoryRepository categoryRepository,
                           SubCategoryRepository subCategoryRepository, VoteRepository voteRepository,VoteService voteService) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.voteRepository = voteRepository;
        this.voteService = voteService;
    }

    public Question findById(long id) {
        return questionRepository.findById(id).get();
    }

    public void create(QuestionWeb questionWeb) {
        Question question = new Question();
        long userId = questionWeb.getUserId();
        Optional<User> user = userRepository.findById(userId);

        question.setUser(user.get());
        question.setTitle(questionWeb.getTitle());
        question.setText(questionWeb.getText());

        String categoryName = questionWeb.getCategory();
        Optional<Category> category = categoryRepository.findByTypeName(categoryName);
        question.setCategory(category.get());

        Set<SubCategory> subCategoryList = new HashSet<>();
        for (String s : questionWeb.getSubCategory()) {
            Optional<SubCategory> subCategory = subCategoryRepository.findByName(s);
                subCategoryList.add(subCategory.get());
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

        Vote newVote = voteService.setVoteType(vote,userId,voteType);
        voteRepository.save(newVote);
        question.getVotes().add(newVote);
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
