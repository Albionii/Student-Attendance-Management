package com.example.student_attendance.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Entity
@Data
public class Lenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lendaID;

    private String emriLendes;

    @JsonIgnore
    @OneToMany(mappedBy = "lenda")
    private Set<Ligjerata> ligjeratat;
}
