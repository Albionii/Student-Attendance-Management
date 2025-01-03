package com.example.student_attendance.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentID;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @Column(unique = true)
    private String uid;

    private int currentAttendanceID;

    @JsonIgnore
    @OneToMany(mappedBy = "student")
    private Set<Attendance> attendances;

    @JsonIgnore
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<StudentLigjerata> studentLigjerata;
}
