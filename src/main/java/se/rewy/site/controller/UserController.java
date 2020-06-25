package se.rewy.site.controller;

import com.sun.mail.iap.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.rewy.site.exception.UserServiceException;
import se.rewy.site.models.Preference;
import se.rewy.site.models.User;
import se.rewy.site.services.UserService;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController( UserService userService){
        this.userService = userService;

    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody User user){
        try {
            userService.saveUser(user);
        }
        catch (Exception e){
            throw new UserServiceException(e.getMessage());
        }
        return ResponseEntity.ok().build();
        }

    @PostMapping("/{id}/update/profileImage")
    public ResponseEntity<?> updateProfileImageUrlByUserId(@PathVariable long id, @RequestBody String profileImageUrl){
        userService.updateProfileImageUrl(id,profileImageUrl);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/update/profileInformation")
    public ResponseEntity<?> updateProfile(@RequestBody User user){

        try {
            userService.updateProfileInformation(user);
        }
        catch (Exception e){
            throw new UserServiceException(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }
    @PostMapping("{id}/update/preferences")
    ResponseEntity <?> updatePreferences( @PathVariable long id, @RequestBody Set<Preference> newPreferences){

        userService.updateUserPreferences(id,newPreferences);

        return ResponseEntity.ok().build();
    }


    @GetMapping("{id}")
    ResponseEntity<User> findUserById(@PathVariable long id){
        User user =userService.findById(id);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/username/{username}")
    ResponseEntity<User> findUserByUsername(@PathVariable String username){
        User user = userService.findByUsername(username).get();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/all")
    ResponseEntity<Set<User>> findAllUsers(){
        Set<User> allUsers = userService.findAllUsers();
       return ResponseEntity.ok(allUsers);
    }


}
