package com.example.student_attendance.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentID;

    private String firstName;

    private String lastName;

    @JsonIgnore
    @OneToMany(mappedBy = "student")
    private Set<Attendance> attendances;


}
