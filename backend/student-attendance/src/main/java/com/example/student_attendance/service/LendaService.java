package com.example.student_attendance.service;

import com.example.student_attendance.entities.Lenda;
import com.example.student_attendance.repository.LendaRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LendaService {
    private final LendaRepo lendaRepo;

    public Lenda createLenda(Lenda lenda) {
        return lendaRepo.save(lenda);
    }

    public void deleteLendaByID(Long lendaID) {
        if (lendaRepo.existsById(lendaID)) {
            lendaRepo.deleteById(lendaID);
            return;
        }
        throw new RuntimeException("Lënda me këtë ID nuk ekziston");
    }

    public Optional<Lenda> getLendaByID(Long id) {
        if (lendaRepo.existsById(id)) {
            return lendaRepo.findById(id);
        }
        throw new RuntimeException("Lënda me këtë ID nuk ekziston");
    }

    public List<Lenda> getAllLenda() {
        return lendaRepo.findAll();
    }

    public Lenda updateLendaByID(Long id, Lenda newLenda) {
        Optional<Lenda> oldLenda = getLendaByID(id);
        if (oldLenda.isPresent()) {
            Lenda lenda = oldLenda.get();

            if (newLenda.getEmriLendes() != null) {
                lenda.setEmriLendes(newLenda.getEmriLendes());
            }
            return lendaRepo.save(lenda);
        }
        throw new RuntimeException("Lënda me këtë ID nuk ekziston");
    }
}
