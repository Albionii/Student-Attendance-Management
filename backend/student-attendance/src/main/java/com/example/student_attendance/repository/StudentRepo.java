package com.example.student_attendance.repository;

import com.example.student_attendance.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {
    List<Student> findAllByLigjerata_Id(Long id);
}
