package com.example.student_attendance.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateStudentDTO {
    private String firstName;
    private String lastName;
    private String uid;
    private String email;
    private String password;
}
