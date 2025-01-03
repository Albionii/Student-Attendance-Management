package com.example.student_attendance.service;

import com.example.student_attendance.entities.Ligjerata;
import com.example.student_attendance.entities.Student;
import com.example.student_attendance.entities.StudentLigjerata;
import com.example.student_attendance.repository.StudentLigjerataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentLigjerataService {

    @Autowired
    private StudentLigjerataRepo studentLigjerataRepo;

    public List<StudentLigjerata> getAllStudentLigjerata() {
        return studentLigjerataRepo.findAll();
    }

    public Optional<StudentLigjerata> getStudentLigjerataById(Long id) {
        return studentLigjerataRepo.findById(id);
    }

    public StudentLigjerata saveStudentLigjerata(StudentLigjerata studentLigjerata) {
        return studentLigjerataRepo.save(studentLigjerata);
    }

    public void deleteStudentLigjerata(Long id) {
        studentLigjerataRepo.deleteById(id);
    }

    public List<Student> getAllStudentsByLigjerataID(Long id) {
        return studentLigjerataRepo.findByLigjerata_Id(id).stream().map(StudentLigjerata::getStudent).toList();
    }

    public List<Ligjerata> getAllLigjeratatByStudentID(Long id) {
        return studentLigjerataRepo.findByStudent_StudentID(id).stream().map(StudentLigjerata::getLigjerata).toList();
    }

}

