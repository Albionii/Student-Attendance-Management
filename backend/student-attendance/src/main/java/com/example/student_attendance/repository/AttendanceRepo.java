package com.example.student_attendance.repository;

import com.example.student_attendance.entities.Attendance;
import com.example.student_attendance.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttendanceRepo extends JpaRepository<Attendance, Long> {
    List<Attendance> findAllByLigjerata_Id(Long id);

    @Query("SELECT a FROM Attendance a WHERE a.ligjerata.professor.id = :professorId")
    List<Attendance> findAllByProfessorID(@Param("professorId") Long professorId);

    List<Attendance> findByStudent_StudentID(Long id);
}
