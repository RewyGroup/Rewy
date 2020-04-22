package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import se.rewy.site.models.Role;
import se.rewy.site.models.User;
import se.rewy.site.models.UserCredentials;
import se.rewy.site.repository.UserRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User findById(long id) { return userRepository.findById(id).get();}

    public Optional<User> findByUsername(String username) { return userRepository.findUserByUsername(username);}

    public Optional<User> findByEmail(String email) { return userRepository.findUserByEmail(email);}

    public void saveUser (User user) throws Exception {
        Optional<User> optionalUser = findByUsername(user.getUsername());
        Optional<User> optionalUserByEmail = findByEmail(user.getEmail());

        if(optionalUser.isEmpty() && optionalUserByEmail.isEmpty()){

            user.setRole(Role.MEMBER);
            user.setCreatedAt(LocalDateTime.now());
            System.out.println(LocalDateTime.now());
            String encodedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
            user.setPassword(encodedPassword);
            userRepository.save(user);
        }else{
            if(optionalUser.isPresent() && optionalUserByEmail.isPresent()){
                throw new Exception("Username and Email is already in use!");
            }
            else if(optionalUser.isPresent()){
                throw new Exception("Username is already in use!");
            }
            else{
                throw new Exception("Email is already in use!");
            }
        }


    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findUserByUsername(username);

        user.orElseThrow(() -> new UsernameNotFoundException("Not found:" + username));

        return user.map(UserCredentials::new).get();
    }

}
