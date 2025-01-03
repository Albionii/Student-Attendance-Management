package com.example.student_attendance.service;

import com.example.student_attendance.entities.Ligjerata;
import com.example.student_attendance.entities.Student;
import com.example.student_attendance.repository.LigjerataRepo;
import com.example.student_attendance.repository.StudentRepo;
import com.example.student_attendance.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepo studentRepository;
    private final LigjerataRepo ligjerataRepo;
    private final UserRepo userRepo;

    public Student createStudent(Student student){
        return studentRepository.save(student);
    }

    @CacheEvict(value = "studentCache",key = "#id")
    public void deleteStudentByID(Long studentID) {
        if (studentRepository.existsById(studentID)){
            studentRepository.deleteById(studentID);
            return;
        }
        throw new RuntimeException("Studenti me kete ID nuk ekziston");
    }

    @Cacheable(value = "studentCache",key = "#id")
    public Optional<Student> getStudentByID(Long id) {
        if (studentRepository.existsById(id)){
            return studentRepository.findById(id);
        }
        throw new RuntimeException("Studenti me kete ID nuk ekziston");
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }


    @Cacheable(value = "studentCache",key = "#uid")
    public Optional<Student> getStudentByUID(String uid) {
        return studentRepository.findByUid(uid);
    }

    @Cacheable(value = "studentByUserIdCache",key = "#id")
    public Student getStudentByUserID(Long id) {
        return studentRepository.findByUser_Id(id);
    }

    public Long getNumberOfStudents(){
        return studentRepository.countStudents();
    }


}
