package com.example.student_attendance.controller;

import com.example.student_attendance.DTO.*;
import com.example.student_attendance.config.JwtProvider;
import com.example.student_attendance.entities.Professor;
import com.example.student_attendance.entities.Role;
import com.example.student_attendance.entities.Student;
import com.example.student_attendance.entities.User;
import com.example.student_attendance.service.ProfessorService;
import com.example.student_attendance.service.StudentService;
import com.example.student_attendance.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final StudentService studentService;
    private final ProfessorService professorService;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder;


    @PutMapping("/updateUser/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            userService.updateUserById(id, user);
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
    public ResponseEntity<?> createStudent(@RequestBody CreateStudentDTO student) {
        if ((userService.getUserByEmail(student.getEmail()) == null) && (studentService.getStudentByUID(student.getUid()).isEmpty())) {
//            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashpassword = passwordEncoder.encode(student.getPassword());

            User newUser = new User();
            newUser.setLastName(student.getLastName());
            newUser.setEmail(student.getEmail());
            newUser.setFirstName(student.getFirstName());
            newUser.setPassword(hashpassword);
            User createdUser = userService.createUser(newUser);
            newUser.setRole(Role.STUDENT);
            Student newStudent = new Student();
            newStudent.setUser(createdUser);
            newStudent.setUid(student.getUid());
            studentService.createStudent(newStudent);
            return ResponseEntity.ok("Student created");
        }
        return ResponseEntity.ok("Student not created");

    }

    @PostMapping("/createProfessor")
    public ResponseEntity<?> createProfessor(@RequestBody CreateProfessorDTO professor) {
        if (userService.getUserByEmail(professor.getEmail()) == null) {

//            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashpassword = passwordEncoder.encode(professor.getPassword());


            User newUser = new User();
            newUser.setLastName(professor.getLastName());
            newUser.setEmail(professor.getEmail());
            newUser.setFirstName(professor.getFirstName());
            newUser.setPassword(hashpassword);
            newUser.setRole(Role.PROFESSOR);
            User createdUser = userService.createUser(newUser);
            Professor newProfessor = new Professor();
            newProfessor.setUser(createdUser);
            professorService.createProfessor(newProfessor);
            return ResponseEntity.ok("Professor created successfully");
        }
        return ResponseEntity.ok("Account creation failed");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loggedIn(@RequestBody LoginDTO login, HttpServletResponse response){
        User user = userService.getUserByEmail(login.getEmail());
        int id = user.getId();

        if (user.getRole().name().equals("PROFESSOR")){
            Professor professor = professorService.getProfessorByUserID((long) user.getId());
            id = professor.getProfessorID();
        }
        else if (user.getRole().name().equals("STUDENT")){
            Student student = studentService.getStudentByUserID((long) user.getId());
            id = student.getStudentID();
        }

//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashpassword = passwordEncoder.encode(login.getPassword());
        System.out.println("HASH : " + hashpassword);
        System.out.println("USER PASS : " + user.getPassword());

        boolean isPassMatching = passwordEncoder.matches(login.getPassword(), user.getPassword());

        if (isPassMatching){

            UserAuthRequest userAuth = new UserAuthRequest(id, user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole().toString());
            List<GrantedAuthority> authorities = Collections.singletonList(
                    new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
            );
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(
                        userAuth,
                        login.getPassword(),
                        authorities
                    );
            String jwt = new JwtProvider().generateToken(authentication);


            Cookie cookie = new Cookie("jwt", jwt);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(15*60);
            response.addCookie(cookie);


            Map<String, Object> map = new HashMap<>();
            map.put("message","Login Successfull. Token created");
            map.put("user", userAuth);
            return ResponseEntity.ok(map);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to login");
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("Logged out successfully!");
    }

    @GetMapping("/protected")
    public ResponseEntity<?> getProtectedData(@CookieValue(name = "jwt", defaultValue = "") String jwt) {
        if (!jwt.isEmpty()){
            UserAuthRequest user = JwtProvider.getUserFromJWT(jwt);
            return ResponseEntity.ok(user);
        }


        return ResponseEntity.ok("No cookie");
    }


    /**
     * Extracts the JWT from the HTTP-only cookie in the request.
     *
     * @param request The HttpServletRequest object that contains the cookies.
     * @return The JWT string if found in the cookies, or null if not found.
     */
    private String extractJwtFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    @PutMapping("/pass")
    public ResponseEntity<?> getPasswordFromUser(@RequestBody UserUpdateRequest userUpdateRequest){
        String email = userUpdateRequest.getEmail();
        String password = userUpdateRequest.getPassword();

//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashpassword = passwordEncoder.encode(password);

        User oldUser = userService.getUserByEmail(email);

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(hashpassword);
        try{
            userService.updateUserById((long) oldUser.getId(), newUser);
            return ResponseEntity.ok("User updated successfully");

        }catch (RuntimeException exception) {
            System.out.println(exception.getMessage());
        }

        return ResponseEntity.ok("User failed to update");

    }
}
