package com.example.student_attendance.controller;

import com.example.student_attendance.entities.Student;
import com.example.student_attendance.entities.StudentLigjerata;
import com.example.student_attendance.service.LigjerataService;
import com.example.student_attendance.service.StudentLigjerataService;
import com.example.student_attendance.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final LigjerataService ligjerataService;

    private final StudentLigjerataService studentLigjerataService;

    @PostMapping("/create")
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        try{
            studentService.deleteStudentByID(id);
            return ResponseEntity.ok("Studenti me ID " + id + " u fshi");
        }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getStudent(@PathVariable Long id) {
        try{
            Optional<Student> student = studentService.getStudentByID(id);
            return ResponseEntity.ok(student);

        }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Student>> getAllStudent(){
        return ResponseEntity.ok(studentService.getAllStudents());
    }


    //! Kjo metode nuk bon qysh po du
    //* Update: E kom rregullu qysh po du

    @GetMapping("/getByLigjerata/{id}")
    public ResponseEntity<?> getStudentsByLigjerataID(@PathVariable Long id) {
        return ResponseEntity.ok(studentLigjerataService.getAllStudentsByLigjerataID(id));
    }

    @GetMapping("/getAllLigjeratatByStudentID/{id}")
    public ResponseEntity<?> getAllLigjeratatOfStudent(@PathVariable Long id){
        return ResponseEntity.ok(studentLigjerataService.getAllLigjeratatByStudentID(id));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getAllNumberOfStudents(){
        return ResponseEntity.ok(studentService.getNumberOfStudents());
    }

}
