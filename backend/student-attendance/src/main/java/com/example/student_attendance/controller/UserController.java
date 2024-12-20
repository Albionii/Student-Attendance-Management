package com.example.student_attendance.controller;

import com.example.student_attendance.DTO.CreateProfessorDTO;
import com.example.student_attendance.DTO.CreateStudentDTO;
import com.example.student_attendance.DTO.NameRequest;
import com.example.student_attendance.DTO.signInDTO;
import com.example.student_attendance.config.JwtProvider;
import com.example.student_attendance.entities.Professor;
import com.example.student_attendance.entities.Role;
import com.example.student_attendance.entities.Student;
import com.example.student_attendance.entities.User;
import com.example.student_attendance.service.ProfessorService;
import com.example.student_attendance.service.StudentService;
import com.example.student_attendance.service.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final StudentService studentService;
    private final ProfessorService professorService;


    @PostMapping("/updateUser/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody NameRequest nameRequest) {
        try {
            userService.updateUserById(id, nameRequest.getFirstName(), nameRequest.getLastName());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("User me Id " + id + "Has been Updated");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        }
    }

    @GetMapping("/getUsers")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/getUsers/{id}")
    public Optional<User> getAllUsers(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/createStudent")
    public HashMap<String, String> createStudent(@RequestBody CreateStudentDTO student) {
        if ((userService.getUserByEmail(student.getEmail()) == null) && (studentService.getStudentByUID(student.getUid()).isEmpty())) {
            User newUser = new User();
            newUser.setLastName(student.getLastName());
            newUser.setEmail(student.getEmail());
            newUser.setFirstName(student.getFirstName());
            newUser.setPassword(student.getPassword());
            User createdUser = userService.createUser(newUser);
            newUser.setRole(Role.STUDENT);
            Student newStudent = new Student();
            newStudent.setUser(createdUser);
            newStudent.setUid(student.getUid());
            studentService.createStudent(newStudent);
            Authentication authentication = new UsernamePasswordAuthenticationToken(student.getEmail(), student.getPassword());
            String jwt = new JwtProvider().generateToken(authentication);
            return new HashMap<>() {{
                put("Jwt", jwt);
            }};
        } else {
            return new HashMap<>() {{
                put("Jwt", "NOT Valid");
            }};

        }

    }

    @PostMapping("/createProfessor")
    public HashMap<String, String> createProfessor(@RequestBody CreateProfessorDTO professor) {
        if (userService.getUserByEmail(professor.getEmail()) == null) {
            User newUser = new User();
            newUser.setLastName(professor.getLastName());
            newUser.setEmail(professor.getEmail());
            newUser.setFirstName(professor.getFirstName());
            newUser.setPassword(professor.getPassword());
            newUser.setRole(Role.PROFESSOR);
            User createdUser = userService.createUser(newUser);
            Professor newProfessor = new Professor();
            newProfessor.setUser(createdUser);
            professorService.createProfessor(newProfessor);
            Authentication authentication = new UsernamePasswordAuthenticationToken(professor.getEmail(), professor.getPassword());
            String jwt = new JwtProvider().generateToken(authentication);
            return new HashMap<>() {{
                put("Jwt", jwt);
            }};


        } else {
            return new HashMap<>() {{
                put("Jwt", "NOT Valid");
            }};
        }
    }

    @PostMapping("/signIn")
    public HashMap<String,String> signin(@RequestBody signInDTO login){
        User user = userService.getUserByEmail(login.getEmail());
        if (user != null && user.getPassword().equals(login.getPassword())){
            List<GrantedAuthority> authorities = Collections.singletonList(
                    new SimpleGrantedAuthority("ROLE_" + user.getRole().name()) // Assuming roles are like "ADMIN", "USER"
            );
            Authentication authentication = new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword(),authorities);
            String jwt = new JwtProvider().generateToken(authentication);
            return new HashMap<>() {{
                put("Jwt", jwt);
            }};
        }
//        if ()
        return new HashMap<>() {{
            put("Jwt", "NON EXISTANT");
        }};
    }


}
