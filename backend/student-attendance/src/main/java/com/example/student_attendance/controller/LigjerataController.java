package com.example.student_attendance.controller;

import com.example.student_attendance.entities.Lenda;
import com.example.student_attendance.entities.Ligjerata;
import com.example.student_attendance.service.LendaService;
import com.example.student_attendance.service.LigjerataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/ligjerata")
@RequiredArgsConstructor
public class LigjerataController {

    private final LigjerataService ligjerataService;

    @PostMapping("/create")
    public Ligjerata createLigjerata(@RequestBody Ligjerata ligjerata) {
        return ligjerataService.createLigjerata(ligjerata);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteLigjerata(@PathVariable Long id) {
        try {
            ligjerataService.deleteLigjerataByID(id);
            return ResponseEntity.ok("Ligjerata me ID " + id + " u fshi");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getLigjerata(@PathVariable Long id) {
        try {
            Optional<Ligjerata> ligjerata = ligjerataService.getLigjerataByID(id);
            return ResponseEntity.ok(ligjerata);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getByProfessor/{id}")
    public ResponseEntity<List<Ligjerata>> getLigjeratatByProfessorID(@PathVariable Long id){
        return ResponseEntity.ok(ligjerataService.getAllLigjeratatByProfessorID(id));
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Ligjerata>> getAllLigjeratat() {
        return ResponseEntity.ok(ligjerataService.getAllLigjerata());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateLigjerata(@PathVariable Long id, @RequestBody Ligjerata newLigjerata) {
        try {
            return ResponseEntity.ok(ligjerataService.updateLigjerataByID(id, newLigjerata));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getAllNumberOfLigjerata() {
        return ResponseEntity.ok(ligjerataService.getNumberOfLigjerata());
    }
}
