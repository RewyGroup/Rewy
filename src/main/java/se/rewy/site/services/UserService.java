package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import se.rewy.site.exception.UserServiceException;
import se.rewy.site.models.Preference;
import se.rewy.site.models.Role;
import se.rewy.site.models.User;
import se.rewy.site.models.UserCredentials;
import se.rewy.site.repository.PreferenceRepository;
import se.rewy.site.repository.UserRepository;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PreferenceRepository preferenceRepository;
    private final MailService mailService;

    @Autowired
    public UserService(UserRepository userRepository,PreferenceRepository preferenceRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.preferenceRepository = preferenceRepository;
        this.mailService = mailService;
    }


    public User findById(long id) { return userRepository.findById(id).get();}

    public Optional<User> findByUsername(String username) { return userRepository.findUserByUsername(username);}

    public Optional<User> findByEmail(String email) { return userRepository.findUserByEmail(email);}

    public ResponseEntity<?> saveUser (User user) throws UserServiceException, MessagingException {
        Optional<User> optionalUser = findByUsername(user.getUsername());
        Optional<User> optionalUserByEmail = findByEmail(user.getEmail());

        if(optionalUser.isEmpty() && optionalUserByEmail.isEmpty()){
            user.setDateOfBirth(user.getDateOfBirth().plusDays(1));
            user.setRole(Role.MEMBER);
            user.setCreatedAt(LocalDateTime.now());
            String encodedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
            user.setPassword(encodedPassword);
            user.setProfileImageUrl("https://rewy.s3-eu-west-1.amazonaws.com/DefaultIcon.png1591195801680");
            userRepository.save(user);
            mailService.sendRegisterEmail(user.getEmail());
        }else{
        if(optionalUser.isPresent() && optionalUserByEmail.isPresent()){
            throw new UserServiceException("Username and Email is already in use!");
        }
        else if(optionalUser.isPresent()){
            throw new UserServiceException("Username is already in use!");
        }
        else{
            throw new UserServiceException("Email is already in use!");
        }
    }
        return ResponseEntity.ok().build();


    }
    public ResponseEntity<?> updateProfileImageUrl(long id, String encodedProfileImageUrl){
        //the image we get from frontend is encoded.
        String decodedProfileImageUrl = decode(encodedProfileImageUrl);
        //the image is also 1 character too long
        String profileImageUrl = decodedProfileImageUrl.substring(0, decodedProfileImageUrl.length() -1);

        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setProfileImageUrl(profileImageUrl);
            userRepository.save(user);
        }
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> updateProfileInformation(User user){

        Optional<User> optionalUserByUsername = findByUsername(user.getUsername());
        Optional<User> optionalUserByEmail = findByEmail(user.getEmail());

        if(optionalUserByUsername.isPresent() && optionalUserByEmail.isPresent() ) {

            if (optionalUserByUsername.get().getId() == user.getId() && optionalUserByEmail.get().getId() == user.getId()) {
                updateUser(user);
            }else if(optionalUserByUsername.get().getId() != user.getId() && optionalUserByEmail.get().getId() != user.getId()){
                throw new UserServiceException("Username and Email is already in use!");

            }else if(optionalUserByUsername.get().getId() != user.getId()){
                throw new UserServiceException("Username is already in use!");
            }else{
                throw new UserServiceException("Email is already in use!");
            }
        }else if(optionalUserByUsername.isPresent()){
            if(optionalUserByUsername.get().getId() == user.getId()){
                if(optionalUserByEmail.isEmpty()) {
                    updateUser(user);
                }else{
                    throw new UserServiceException("Email is already in use!");
                }
            }
        }else if(optionalUserByEmail.isPresent()){
            if(optionalUserByEmail.get().getId() == user.getId()){
                if(optionalUserByUsername.isEmpty()){
                    updateUser(user);
                }else{
                    throw new UserServiceException("Username is already in use!");
                }
            }
        }else{
            updateUser(user);
        }


        return ResponseEntity.ok().build();
    }

    public void updateUser(User user) {
        Optional<User> optionalUser = userRepository.findById(user.getId());
        if (optionalUser.isPresent()) {
            User oldUser = optionalUser.get();
            oldUser.setUsername(user.getUsername());
            oldUser.setEmail(user.getEmail());
            oldUser.setFirstName(user.getFirstName());
            oldUser.setLastName((user.getLastName()));
            oldUser.setOccupation(user.getOccupation());
            userRepository.save(oldUser);
        }
    }

    public void updateUserPreferences(long userId, Set<Preference> newPreferences) {

        Set<Preference> UserPreferences =  preferenceRepository.findAllByUser_Id(userId);

        User user = userRepository.findById(userId).get();

        if(UserPreferences.size() > 0) {

            Set<Long> preferenceIds = newPreferences.stream()
                    .map(preference -> preference.getId()).collect(Collectors.toSet());

            List<Preference> preferencesToDelete =
                    UserPreferences.stream()
                            .filter(p -> !preferenceIds.contains(p.getId()))
                            .collect(Collectors.toList());

        preferencesToDelete.forEach(preference -> preferenceRepository.delete(preference));
        }
       newPreferences.forEach(preference -> {
           preference.setUser(user);
           preferenceRepository.save(preference);
       });

    }
    public Set<Preference> findAllUserPreferences(long userId) {
        Set<Preference> UserPreferences =  preferenceRepository.findAllByUser_Id(userId);
        UserPreferences.forEach(preference -> preference.getCategory().setSubCategoryList(null));

        Set<Preference> sortedUserPreferencesByPriorityList = UserPreferences.stream()
                .sorted(Comparator.comparing(Preference::getPriority)).collect(Collectors.toCollection(LinkedHashSet::new));

        return sortedUserPreferencesByPriorityList;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findUserByUsername(username);

        user.orElseThrow(() -> new UsernameNotFoundException("Not found:" + username));

        return user.map(UserCredentials::new).get();
    }


    public static String decode(String url)
    {
        try {
            String prevURL="";
            String decodeURL=url;
            while(!prevURL.equals(decodeURL))
            {
                prevURL=decodeURL;
                decodeURL= URLDecoder.decode( decodeURL, "UTF-8" );
            }
            return decodeURL;
        } catch (UnsupportedEncodingException e) {
            return "Issue while decoding" +e.getMessage();
        }
    }
    public Set<User> findAllUsers(){
        return userRepository.findAll();
    }

}
