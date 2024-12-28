package com.example.student_attendance.service;

import com.example.student_attendance.entities.Attendance;
import com.example.student_attendance.entities.Student;
import com.example.student_attendance.port.ArduinoConnection;
import com.example.student_attendance.repository.AttendanceRepo;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Scanner;

@Service
@Data
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepo attendanceRepo;
    public static String id;

    private ArduinoConnection arduinoConnection = new ArduinoConnection("COM5", 9600);

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
        return attendanceRepo.findAllByLigjerata_Id(ligjerataID);
    }

    public void closeThread() {
        arduinoConnection.stopReading();
    }

    public List<Attendance> getAllByProfessorID(Long id) {
        return attendanceRepo.findAllByProfessorID(id);
    }

}
