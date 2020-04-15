package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.Answer;

public interface AnswerRepository extends CrudRepository<Answer,Long> {
}
