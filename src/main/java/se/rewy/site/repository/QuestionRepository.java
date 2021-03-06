package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.Question;

import java.util.Set;

public interface QuestionRepository extends CrudRepository<Question,Long> {

    Set<Question>findAll();

    Set<Question> findQuestionsByCategory_Id(Long categoryId);

    Set<Question> findAllByUser_Id(Long userId);
}
