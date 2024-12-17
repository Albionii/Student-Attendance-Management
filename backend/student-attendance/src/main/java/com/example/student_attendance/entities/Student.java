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

    @Column(unique = true)
    private String uid;

    private String firstName;

    private String lastName;

    private int currentAttendanceID;

    @ManyToMany
    @JoinTable(
            name = "student_ligjerata",  // Name of the join table
            joinColumns = @JoinColumn(name = "student_id"),  // Foreign key for Student
            inverseJoinColumns = @JoinColumn(name = "ligjerata_id")  // Foreign key for Ligjerata
    )
    private List<Ligjerata> ligjerata;
    @JsonIgnore
    @OneToMany(mappedBy = "student")
    private Set<Attendance> attendances;


}
