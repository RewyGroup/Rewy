package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.NotifyUser;

public interface NotifyUserRepository extends CrudRepository<NotifyUser,Long> {
}
