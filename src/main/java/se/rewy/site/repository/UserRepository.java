package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.User;

public interface UserRepository extends CrudRepository<User,Long> {
}
