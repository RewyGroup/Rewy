package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import se.rewy.site.models.User;
import se.rewy.site.models.UserCredentials;
import se.rewy.site.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }


    public User findById(long id){
        return userRepository.findById(id).get();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findUserByUsername(username);

        user.orElseThrow(() -> new UsernameNotFoundException("Not found:" + username));

        return user.map(UserCredentials::new).get();
    }
}
