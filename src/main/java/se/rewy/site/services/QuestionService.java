package se.rewy.site.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.models.Question;
import se.rewy.site.repository.QuestionRepository;

@Service
public class QuestionService{
    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository){
        this.questionRepository = questionRepository;
    }

    public Question findById(long id){
        return questionRepository.findById(id).get();
    }

    public void create(Question question){
        questionRepository.save(question);
    }
}
