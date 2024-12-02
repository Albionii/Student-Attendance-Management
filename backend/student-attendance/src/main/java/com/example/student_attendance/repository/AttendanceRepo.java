package com.example.student_attendance.repository;

import com.example.student_attendance.entities.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepo extends JpaRepository<Attendance, Long> {
    List<Attendance> findAllByLigjerata_Id(Long id);
}
