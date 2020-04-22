package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Long> {
    Optional <User> findUserByUsername (String username);
}
