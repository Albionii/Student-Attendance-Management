package com.example.student_attendance.repository;

import com.example.student_attendance.entities.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProfessorRepo extends JpaRepository<Professor, Long> {
    Professor findByUser_Id(Long id);

    @Query("SELECT COUNT(p) FROM Professor p")
    Long countProfessors();
}
