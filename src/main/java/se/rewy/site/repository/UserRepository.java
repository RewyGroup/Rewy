package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.User;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends CrudRepository<User,Long> {
    Optional <User>  findUserByUsername (String username);
    Optional<User> findUserByEmail(String username);
    Set<User> findAll();
}
