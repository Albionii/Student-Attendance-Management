package com.example.student_attendance.entities;

import com.example.student_attendance.entities.Lenda;
import com.example.student_attendance.entities.Professor;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Ligjerata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Professor professor;

    @ManyToOne
    private Lenda lenda;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime fillimiLigjerates;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime mbarimiLigjerates;


    @JsonIgnore
    @OneToMany(mappedBy = "ligjerata")
    private Set<Attendance> attendances;

    @ManyToMany(mappedBy = "ligjerata")
    private List<Student> students;

}
