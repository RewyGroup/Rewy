package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.models.Notification;
import se.rewy.site.repository.NotificationRepository;

@Service
public class NotificationService {


    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public void createNotification (Notification notification){

        notificationRepository.save(notification);
    }
}
