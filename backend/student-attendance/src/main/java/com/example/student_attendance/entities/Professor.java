package com.example.student_attendance.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Professor {

    @Id
    private int professorID;

    private String firstName;

    private String lastName;

}
