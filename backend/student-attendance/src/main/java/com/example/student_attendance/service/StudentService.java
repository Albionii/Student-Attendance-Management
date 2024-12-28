package com.example.student_attendance.service;

import com.example.student_attendance.entities.Ligjerata;
import com.example.student_attendance.entities.Student;
import com.example.student_attendance.repository.LigjerataRepo;
import com.example.student_attendance.repository.StudentRepo;
import com.example.student_attendance.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public void deleteStudentByID(Long studentID) {
        if (studentRepository.existsById(studentID)){
            studentRepository.deleteById(studentID);
            return;
        }
        throw new RuntimeException("Studenti me kete ID nuk ekziston");
    }

    public Optional<Student> getStudentByID(Long id) {
        if (studentRepository.existsById(id)){
            return studentRepository.findById(id);
        }
        throw new RuntimeException("Studenti me kete ID nuk ekziston");
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public List<Student> getAllStudentsByLigjerataID(Long ligjerataID) {
        Optional<Ligjerata> ligjerata = ligjerataRepo.findById(ligjerataID);
        System.out.println(ligjerata.get().getStudents());
        return ligjerata.isPresent() ? ligjerata.get().getStudents() : null;
    }

    public Optional<Student> getStudentByUID(String uid) {
        return studentRepository.findByUid(uid);
    }

    public Student getStudentByUserID(Long id) {
        return studentRepository.findByUser_Id(id);
    }

    public List<Student> getAllStudentInLigjerate(Long id) {
        Optional<Ligjerata> ligjerata = ligjerataRepo.findById(id);
        return studentRepository.findByLigjerata(ligjerata.orElse(null));
    }

}
