package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.Vote;

public interface VoteRepository extends CrudRepository<Vote,Long> {
}
