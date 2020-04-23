package se.rewy.site.controller;

import com.sun.mail.iap.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.rewy.site.exception.UserServiceException;
import se.rewy.site.models.User;
import se.rewy.site.services.UserService;

import java.util.Optional;

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

    @GetMapping("{id}")
    ResponseEntity<User> findUserById(@PathVariable long id){
        User user =userService.findById(id);
        return ResponseEntity.ok(user);
    }


}
