package com.example.student_attendance.service;

import com.example.student_attendance.entities.Student;
import com.example.student_attendance.repository.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepo studentRepository;

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

    public Student updateStudentByID(Long id, Student newStudent) {
        Optional<Student> oldStudent = getStudentByID(id);
        if (oldStudent.isPresent()){
            Student student = oldStudent.get();

//           Kur emri ose mbiemri te jene zbrazet mos ta ndryshojne vleren ne databaze objektit.
            if (newStudent.getFirstName() != null){
                student.setFirstName(newStudent.getFirstName());
            }
            if (newStudent.getLastName() != null) {
                student.setLastName(newStudent.getLastName());
            }
            return studentRepository.save(student);
        }
        throw new RuntimeException("Studenti me kete ID nuk ekziston");
    }

    public List<Student> getAllStudentsByLigjerataID(Long ligjerataID) {
        return studentRepository.findAllByLigjerata_Id(ligjerataID);
    }


}
