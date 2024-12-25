package com.example.student_attendance.service;

import com.example.student_attendance.entities.User;
import com.example.student_attendance.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepo userRepo;

    public Optional<User> getUserById(Long id){
        return userRepo.findById(id);
    }

    public User findUserByEmail(String email){
        return userRepo.findUserByEmail(email);
    }

    public User updateUserById (Long id, String firstName, String lastName){
        Optional<User> oldUser = getUserById(id);
        if (oldUser.isPresent()){
            User user = oldUser.get();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            userRepo.save(user);
            return user;
        }
        throw new RuntimeException("Useri me ket Id nuk ekziston");
    }

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
