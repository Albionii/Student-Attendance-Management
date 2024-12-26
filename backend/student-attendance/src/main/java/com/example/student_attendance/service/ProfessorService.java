package com.example.student_attendance.service;

import com.example.student_attendance.entities.Professor;
import com.example.student_attendance.entities.Student;
import com.example.student_attendance.repository.ProfessorRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfessorService {
    private final ProfessorRepo professorRepo;

    public Professor createProfessor(Professor professor){
        return professorRepo.save(professor);
    }

    public void deleteProfessorByID(Long professorID) {
        if (professorRepo.existsById(professorID)){
            professorRepo.deleteById(professorID);
            return;
        }
        throw new RuntimeException("Profesori me kete ID nuk ekziston");
    }

    public Optional<Professor> getProfessorByID(Long id) {
        if (professorRepo.existsById(id)){
            return professorRepo.findById(id);
        }
        throw new RuntimeException("Profesori me kete ID nuk ekziston");
    }

    public List<Professor> getAllProfessors(){
        return professorRepo.findAll();
    }

//    public Professor updateProfessorByID(Long id, Professor newProfessor) {
//        Optional<Professor> oldProfessor = getProfessorByID(id);
//        if (oldProfessor.isPresent()){
//            Professor professor = oldProfessor.get();
//
////           Kur emri ose mbiemri te jene zbrazet mos ta ndryshojne vleren ne databaze objektit.
//            if (professor.getFirstName() != null){
//                professor.setFirstName(professor.getFirstName());
//            }
//            if (newProfessor.getLastName() != null) {
//                professor.setLastName(newProfessor.getLastName());
//            }
//            return professorRepo.save(professor);
//        }
//        throw new RuntimeException("Profesori me kete ID nuk ekziston");
//    }

    public Professor getProfessorByUserID(Long id) {
        return professorRepo.findByUser_Id(id);
    }



}
