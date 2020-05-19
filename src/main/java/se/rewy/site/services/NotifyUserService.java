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


    public Set<NotifyUser> getAllNotificationsByUserId(long id){
        return notifyUserRepository.findAllByUserId(id);
    }


    public void setToShown(long id){

      Set<NotifyUser> notifyUserSet = notifyUserRepository.findALlByUserIdAndShownFalse(id);

      for(NotifyUser notifyUser: notifyUserSet){
          notifyUser.setShown(true);
          notifyUserRepository.save(notifyUser);
      }


    }
}
