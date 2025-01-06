package com.example.student_attendance.controller;

import com.example.student_attendance.entities.Lenda;
import com.example.student_attendance.service.LendaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/lenda")
public class LendaController {

    private final LendaService lendaService;

    public LendaController(LendaService lendaService) {
        this.lendaService = lendaService;
    }

    @PostMapping("/create")
    public Lenda createLenda(@RequestBody Lenda lenda) {
        return lendaService.createLenda(lenda);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteLenda(@PathVariable Long id) {
        try {
            lendaService.deleteLendaByID(id);
            return ResponseEntity.ok("Lënda me ID " + id + " u fshi");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getLenda(@PathVariable Long id) {
        try {
            Optional<Lenda> lenda = lendaService.getLendaByID(id);
            return ResponseEntity.ok(lenda);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Lenda>> getAllLenda() {
        return ResponseEntity.ok(lendaService.getAllLenda());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateLenda(@PathVariable Long id, @RequestBody Lenda newLenda) {
        try {
            return ResponseEntity.ok(lendaService.updateLendaByID(id, newLenda));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
