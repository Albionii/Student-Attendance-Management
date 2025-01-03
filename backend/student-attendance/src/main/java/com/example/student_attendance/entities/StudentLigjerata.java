package com.example.student_attendance.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StudentLigjerata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "ligjerata_id", nullable = false)
    private Ligjerata ligjerata;
}
