package com.example.student_attendance.controller;

import com.example.student_attendance.DTO.CreateProfessorDTO;
import com.example.student_attendance.DTO.CreateStudentDTO;
import com.example.student_attendance.DTO.NameRequest;
import com.example.student_attendance.entities.Professor;
import com.example.student_attendance.entities.Student;
import com.example.student_attendance.entities.User;
import com.example.student_attendance.service.ProfessorService;
import com.example.student_attendance.service.StudentService;
import com.example.student_attendance.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final StudentService studentService;
    private final ProfessorService professorService;


    @PostMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id,@RequestBody NameRequest nameRequest){
        try {
            userService.updateUserById(id, nameRequest.getFirstName(), nameRequest.getLastName());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("User me Id " + id + "Has been Updated");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        }
    }

    @PostMapping("/createStudent")
    public ResponseEntity<String> createStudent(@RequestBody CreateStudentDTO student){
        if ((userService.getUserByEmail(student.getEmail()) == null) && (studentService.getStudentByUID(student.getUid()) == null)){
            User newUser = new User();
            newUser.setLastName(student.getLastName());
            newUser.setEmail(student.getEmail());
            newUser.setFirstName(student.getFirstName());
            newUser.setPassword(student.getPassword());
            User createdUser = userService.createUser(newUser);
            Student newStudent = new Student();
            newStudent.setUser(createdUser);
            newStudent.setUid(student.getUid());
            studentService.createStudent(newStudent);
            return ResponseEntity.status(HttpStatus.CREATED).body("Student Successfully created");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This User with this Email or UID arleady exists");
        }

    }

    @PostMapping("/createProfessor")
    public ResponseEntity<String> createProfessor(@RequestBody CreateProfessorDTO professor) {
    if (userService.getUserByEmail(professor.getEmail()) == null){
        User newUser = new User();
        newUser.setLastName(professor.getLastName());
        newUser.setEmail(professor.getEmail());
        newUser.setFirstName(professor.getFirstName());
        newUser.setPassword(professor.getPassword());
        User createdUser = userService.createUser(newUser);
        Professor newProfessor = new Professor();
        newProfessor.setUser(createdUser);
        professorService.createProfessor(newProfessor);
        return ResponseEntity.status(HttpStatus.CREATED).body("Professor created sucessfuly");

    }else{
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This User with this Email arleady exists");
    }
    }


    }
