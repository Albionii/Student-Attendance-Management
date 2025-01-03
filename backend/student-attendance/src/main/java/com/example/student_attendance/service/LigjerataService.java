package com.example.student_attendance.service;

import com.example.student_attendance.entities.Ligjerata;
import com.example.student_attendance.repository.LigjerataRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LigjerataService {
    private final LigjerataRepo ligjerataRepo;

    public Ligjerata createLigjerata(Ligjerata ligjerata) {
        return ligjerataRepo.save(ligjerata);
    }

    public void deleteLigjerataByID(Long id) {
        if (ligjerataRepo.existsById(id)) {
            ligjerataRepo.deleteById(id);
        } else {
            throw new RuntimeException("Ligjerata me kete ID nuk ekziston");
        }
    }

    public Optional<Ligjerata> getLigjerataByID(Long id) {
        return ligjerataRepo.findById(id);
    }

    public List<Ligjerata> getAllLigjerata() {
        return ligjerataRepo.findAll();
    }

    public Ligjerata updateLigjerataByID(Long id, Ligjerata newLigjerata) {
        Optional<Ligjerata> existingLigjerata = getLigjerataByID(id);
        if (existingLigjerata.isPresent()) {
            Ligjerata ligjerata = existingLigjerata.get();
            if (newLigjerata.getProfessor() != null) {
                ligjerata.setProfessor(newLigjerata.getProfessor());
            }
            if (newLigjerata.getFillimiLigjerates() != null) {
                ligjerata.setFillimiLigjerates(newLigjerata.getFillimiLigjerates());
            }

            if (newLigjerata.getMbarimiLigjerates() != null) {
                ligjerata.setMbarimiLigjerates(newLigjerata.getMbarimiLigjerates());
            }
            return ligjerataRepo.save(ligjerata);
        } else {
            throw new RuntimeException("Ligjerata me kete ID nuk ekziston");
        }
    }

    public List<Ligjerata> getAllLigjeratatByProfessorID(Long id) {
        return ligjerataRepo.findAllByProfessor_ProfessorID(id);
    }

    public Long getNumberOfLigjerata(){
        return ligjerataRepo.countLigjeratat();
    }
}
