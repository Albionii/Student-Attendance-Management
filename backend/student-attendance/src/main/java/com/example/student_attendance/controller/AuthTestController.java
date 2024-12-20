package com.example.student_attendance.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthTestController {

    @GetMapping("/student")
    public String studentSecretMessage(){
        return "THE SECRETE MESSAGE IS UIII UIII UIII";
    }

    @GetMapping("/professor")
    public String professorSecretMessage(){
        return "THE SECRETE MESSAGE IS UJEE UJEE UJEE";
    }

    @GetMapping("/admin")
    public String adminSecretMessage(){
        return "THE SECRETE MESSAGE IS UFII UFII UFII";
    }


    @GetMapping("/")
    public String allSecretMessage(){
        return "THE SECRETE MESSAGE IS UJAA UJAA UJAA";
    }
}
