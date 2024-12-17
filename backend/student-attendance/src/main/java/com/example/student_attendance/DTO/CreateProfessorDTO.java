package com.example.student_attendance.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProfessorDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
