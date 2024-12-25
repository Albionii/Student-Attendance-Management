package com.example.student_attendance.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserAuthRequest {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
}
