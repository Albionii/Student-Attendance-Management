package com.example.student_attendance.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int professorID;

    private String firstName;

    private String lastName;

    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "professor")
    private Set<Ligjerata> ligjeratat;


}
