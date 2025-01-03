package com.example.student_attendance.repository;

import com.example.student_attendance.entities.StudentLigjerata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentLigjerataRepo extends JpaRepository<StudentLigjerata, Long> {
    List<StudentLigjerata> findByStudent_StudentID(Long id);
    List<StudentLigjerata> findByLigjerata_Id(Long id);

    // You can add custom queries here if needed.
}
