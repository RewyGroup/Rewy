package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.models.NotifyUser;
import se.rewy.site.repository.NotifyUserRepository;

@Service
public class NotifyUserService {

    private final NotifyUserRepository notifyUserRepository;

    @Autowired

    public NotifyUserService(NotifyUserRepository notifyUserRepository) {
        this.notifyUserRepository = notifyUserRepository;
    }

    public void createNotifyUser(NotifyUser notifyUser){
        notifyUserRepository.save(notifyUser);
    }
}
