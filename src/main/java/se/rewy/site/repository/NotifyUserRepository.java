package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.NotifyUser;

import java.util.Set;

public interface NotifyUserRepository extends CrudRepository<NotifyUser,Long> {

    Set<NotifyUser> findAllByUserId(long userId);
}
