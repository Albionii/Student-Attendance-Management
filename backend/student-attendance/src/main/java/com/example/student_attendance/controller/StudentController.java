package com.example.student_attendance.controller;

import com.example.student_attendance.entities.Student;
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

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody Student newStudent){
        try{
            return ResponseEntity.ok(studentService.updateStudentByID(id,newStudent));
        }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getByLigjerata/{id}")
    public ResponseEntity<List<Student>> getStudentsByLigjerataID(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getAllStudentsByLigjerataID(id));
    }

}
