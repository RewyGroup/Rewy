package se.rewy.site.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.rewy.site.models.NotifyUser;
import se.rewy.site.services.NotifyUserService;

import java.util.Set;

@RestController
@RequestMapping("notification")
public class NotificationController {

    private final NotifyUserService notifyUserService;

    @Autowired
    public NotificationController(NotifyUserService notifyUserService) {
        this.notifyUserService = notifyUserService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Set<NotifyUser>> getAllNotifications(@PathVariable long id){
        Set<NotifyUser> allNotifications = notifyUserService.getAllNotificationsByUserId(id);

        return ResponseEntity.ok(allNotifications);
    }

    @PostMapping("/update")
    public ResponseEntity<?>updateNotifications(@RequestBody Set<NotifyUser> notifyUsers ){

        notifyUserService.setToShown(notifyUsers);
        return ResponseEntity.ok().build();
    }
}
