package com.example.student_attendance.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserUpdateRequest {
    private String email;
    private String password;
//    private String profile_url;
//    private String cover_url;
}
