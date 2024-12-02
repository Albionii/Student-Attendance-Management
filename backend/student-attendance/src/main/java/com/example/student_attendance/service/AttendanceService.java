package com.example.student_attendance.service;

import com.example.student_attendance.entities.Attendance;
import com.example.student_attendance.entities.Student;
import com.example.student_attendance.repository.AttendanceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepo attendanceRepo;

    public Attendance createAttendance(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }

    public void deleteAttendanceByID(Long attendanceID) {
        if (attendanceRepo.existsById(attendanceID)) {
            attendanceRepo.deleteById(attendanceID);
            return;
        }
        throw new RuntimeException("Attendance record with this ID does not exist");
    }

    public Optional<Attendance> getAttendanceByID(Long id) {
        if (attendanceRepo.existsById(id)) {
            return attendanceRepo.findById(id);
        }
        throw new RuntimeException("Attendance record with this ID does not exist");
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepo.findAll();
    }

    public Attendance updateAttendanceByID(Long id, Attendance newAttendance) {
        Optional<Attendance> oldAttendance = getAttendanceByID(id);
        if (oldAttendance.isPresent()) {
            Attendance attendance = oldAttendance.get();

            if (newAttendance.getHyrjaNeSalle() != null) {
                attendance.setHyrjaNeSalle(newAttendance.getHyrjaNeSalle());
            }
            if (newAttendance.getDaljaNgaSalla() != null) {
                attendance.setDaljaNgaSalla(newAttendance.getDaljaNgaSalla());
            }
            return attendanceRepo.save(attendance);
        }
        throw new RuntimeException("Attendance record with this ID does not exist");
    }

    public List<Attendance> getAllAttendencesByLigjerataID(Long ligjerataID){
//        attendanceRepo.findA
    }
}
