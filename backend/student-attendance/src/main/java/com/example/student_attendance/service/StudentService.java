package com.example.student_attendance.service;

import com.example.student_attendance.entities.Ligjerata;
import com.example.student_attendance.entities.Student;
import com.example.student_attendance.entities.User;
import com.example.student_attendance.repository.AttendanceRepo;
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

//    public User updateStudentByID(Long id, Student newStudent) {
//        Optional<User> oldUser = userRepo.findById(id);
//        if (oldUser.isPresent()){
//            User user = oldUser.get();
//            String firstName = userRepo.findById((Long.valueOf(newStudent.getStudentID()))).get().getFirstName();
//            String lastName = userRepo.findById((Long.valueOf(newStudent.getStudentID()))).get().getLastName();
//
////           Kur emri ose mbiemri te jene zbrazet mos ta ndryshojne vleren ne databaze objektit.
//            if (user.getFirstName() != null){
//                user.setFirstName(firstName);
//            }
//            if (user.getLastName() != null) {
//                user.setLastName(lastName);
//            }
//            return userRepo.save(user);
//        }
//        throw new RuntimeException("Studenti me kete ID nuk ekziston");
//    }

    public List<Student> getAllStudentsByLigjerataID(Long ligjerataID) {
        Optional<Ligjerata> ligjerata = ligjerataRepo.findById(ligjerataID);
        System.out.println(ligjerata.get().getStudents());
        return ligjerata.isPresent() ? ligjerata.get().getStudents() : null;
    }

    public Student getStudentByUID(String uid) {
        return studentRepository.findByUid(uid).orElseThrow(() -> new RuntimeException("Studenti nuk ekziston"));
    }


}
