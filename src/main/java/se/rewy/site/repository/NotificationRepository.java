package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.Notification;

public interface NotificationRepository  extends CrudRepository<Notification,Long> {

}
