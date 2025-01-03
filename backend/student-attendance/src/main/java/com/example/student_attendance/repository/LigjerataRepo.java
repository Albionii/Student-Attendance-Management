package com.example.student_attendance.repository;

import com.example.student_attendance.entities.Ligjerata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LigjerataRepo extends JpaRepository<Ligjerata, Long> {
    List<Ligjerata> findAllByProfessor_ProfessorID(Long id);


    @Query("SELECT COUNT(l) FROM Ligjerata l")
    Long countLigjeratat();
}
