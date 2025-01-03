package com.example.student_attendance.controller;

import com.example.student_attendance.config.annotation.CookieValidated;
import com.example.student_attendance.entities.Professor;
import com.example.student_attendance.service.ProfessorService;
import com.example.student_attendance.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/professors")
@RequiredArgsConstructor
public class ProfessorController {

    private final ProfessorService professorService;
    private final StudentService studentService;


    @PostMapping("/create")
    public Professor createProfessor(@RequestBody Professor professor) {
        return professorService.createProfessor(professor);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProfessor(@PathVariable Long id) {
        try {
            professorService.deleteProfessorByID(id);
            return ResponseEntity.ok("Professor with ID " + id + " was deleted");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getProfessor(@PathVariable Long id) {
        try {
            Optional<Professor> professor = professorService.getProfessorByID(id);
            return ResponseEntity.ok(professor);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Professor>> getAllProfessors() {
        return ResponseEntity.ok(professorService.getAllProfessors());
    }

    @GetMapping("/count")
    @CookieValidated
    public ResponseEntity<Long> getNumberOfProfessors(){
        return ResponseEntity.ok(professorService.getNumberOfProfessors());
    }

}
