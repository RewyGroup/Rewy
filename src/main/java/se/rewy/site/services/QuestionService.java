package se.rewy.site.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.models.*;
import se.rewy.site.models.web.QuestionWeb;
import se.rewy.site.repository.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final VoteRepository voteRepository;
    private final VoteService voteService;
    private final PreferenceRepository preferenceRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository, UserRepository userRepository, CategoryRepository categoryRepository,
                           SubCategoryRepository subCategoryRepository, VoteRepository voteRepository,VoteService voteService,PreferenceRepository preferenceRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.voteRepository = voteRepository;
        this.voteService = voteService;
        this.preferenceRepository = preferenceRepository;
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
    public Set<Question> findQuestionsByUserId(long userId){
     return questionRepository.findAllByUser_Id(userId);
    }

    public List<Question> findAllPreferenceQuestionsByUserId(long userId){
        List<Question> questions = new ArrayList<>();
        Set<Category> categorySet = categoryRepository.findAll();
        List<Category> categoryList = new ArrayList<>(categorySet);

        Set<Preference> preferenceSet = preferenceRepository.findAllByUser_Id(userId);
        List<Preference> preferenceList = new ArrayList<>(preferenceSet);

        ArrayList<List<Preference>> arrayOfPreference = new ArrayList<>();
        for(Category category: categoryList){
            List<Preference> tempList = preferenceList.stream().filter(preference -> (preference.getCategory().equals(category))).collect(Collectors.toList());
            if(tempList.size() > 0) {
                arrayOfPreference.add(tempList);
            }
        }

        for(List<Preference> categoryPreferenceList : arrayOfPreference){
            long categoryId = categoryPreferenceList.get(0).getCategory().getId();
          Set<Question> tempQuestions =  questionRepository.findQuestionsByCategory_Id(categoryId);
          List<Question> sortedList = tempQuestions.stream().sorted(Comparator.comparingLong(Question::getId).reversed()).collect(Collectors.toList());


          questions.addAll(sortedList);
        }


        List<Question> preferencedQuestions = new ArrayList<>();

        for (Question question : questions){
            Set<SubCategory> subCategories = question.getSubCategoryList();
            String  questionCategory = question.getCategory().getTypeName();
            for (Preference pref:preferenceList) {
                if(questionCategory.equals(pref.getText())){
                    switch (pref.getPriority()) {
                        case 1:
                            question.setPoints(question.getPoints() + 5);
                            break;
                        case 2:
                            question.setPoints(question.getPoints() + 4);
                            break;
                        case 3:
                            question.setPoints(question.getPoints() + 3);
                            break;

                        case 4:
                            question.setPoints(question.getPoints() + 2);
                            break;
                        case 5:
                            question.setPoints(question.getPoints() + 1);
                            break;
                        default:
                            break;
                    }
                }
            }
            for (SubCategory subCategory: subCategories) {
                for (Preference pref: preferenceList) {
                    if(subCategory.getName().equalsIgnoreCase(pref.getText())){
                        switch (pref.getPriority()){
                            case 1:
                                question.setPoints(question.getPoints() + 5);
                                break;
                            case 2:
                                question.setPoints(question.getPoints() + 4);
                                break;
                            case 3:
                                question.setPoints(question.getPoints() + 3);
                                break;

                            case 4:
                                question.setPoints(question.getPoints() + 2);
                                break;
                            case 5:
                                question.setPoints(question.getPoints() + 1);
                                break;
                            default:
                                break;

                        }

                        //if question == 9 preferenceQuestions.add(question)

                        //if preferenceQuestion.size == 3 break;
                    }
                }



            }
            if(question.getPoints() >= 9){
                preferencedQuestions.add(question);
            }
            if(preferencedQuestions.size() == 3){
                break;
            }

        }
        if(preferencedQuestions.size() == 3){
            return preferencedQuestions;
        }
        else{
            List<Question> highestScoreList = questions.stream().sorted(Comparator.comparingInt(Question::getPoints)).collect(Collectors.toList());
            for(int i = 0; preferencedQuestions.size() < 3; i++){
                Question tempQuestion = highestScoreList.get(i);
                preferencedQuestions.add(tempQuestion);
            }
        }


        return preferencedQuestions;
}
}
