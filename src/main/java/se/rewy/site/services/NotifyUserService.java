package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.models.NotifyUser;
import se.rewy.site.repository.NotifyUserRepository;

import java.util.List;
import java.util.Set;

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

    public NotifyUser findById(long id){
        return notifyUserRepository.findById(id).get();
    }

    public Set<NotifyUser> getAllNotificationsByUserId(long id){
        return notifyUserRepository.findAllByUserId(id);
    }


    public void setToShown(Set<NotifyUser> notifyUsers){

      for(NotifyUser notifyUser: notifyUsers){
          notifyUser.setShown(true);
          notifyUserRepository.save(notifyUser);
      }


    }
}
