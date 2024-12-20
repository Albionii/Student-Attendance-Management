package com.example.student_attendance.repository;

import com.example.student_attendance.entities.Student;
import com.example.student_attendance.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User findUserByEmail(String email);
}
