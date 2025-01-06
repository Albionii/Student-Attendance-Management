package com.example.student_attendance.service;

import com.example.student_attendance.entities.User;
import com.example.student_attendance.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepo userRepo;

//    @Cacheable(value = "userCache",key = "#id")
    public Optional<User> getUserById(Long id){
        return userRepo.findById(id);
    }

    public User findUserByEmail(String email){
        return userRepo.findUserByEmail(email);
    }

//    @CacheEvict(value = "userCache", key = "#id")
    public void updateUserById (Long id, User newUser){
        Optional<User> oldUser = getUserById(id);
        if (oldUser.isPresent()){
            User user = oldUser.get();
//            user.setFirstName(newUser.getFirstName());
//            user.setLastName(newUser.getLastName());
            user.setEmail(newUser.getEmail());
            user.setPassword(newUser.getPassword());
            userRepo.save(user);
            return;
        }
        throw new RuntimeException("Useri me ket Id nuk ekziston");
    }

//    @Cacheable(value = "emailUserCache", key = "#email")
    public User getUserByEmail(String email) {
        return userRepo.findUserByEmail(email);
    }
    public List<User> findAllUsers(){
        return userRepo.findAll();
    }

    public Optional<User> findUserById(Long id){
        return userRepo.findById(id);
    }


    public User createUser(User user){
        return userRepo.save(user);
    }
}
