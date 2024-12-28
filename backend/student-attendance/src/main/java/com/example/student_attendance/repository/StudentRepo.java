package com.example.student_attendance.repository;

import com.example.student_attendance.entities.Ligjerata;
import com.example.student_attendance.entities.Professor;
import com.example.student_attendance.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {
    Optional<Student> findByUid(String uid);
    Student findByUser_Id(Long id);

//    @Query("SELECT s FROM Student s JOIN s.ligjerata l WHERE l.id = :ligjerataId")
    List<Student> findByLigjerata(Ligjerata ligjerata);
}
