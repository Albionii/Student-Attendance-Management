package com.example.student_attendance.controller;

import com.example.student_attendance.entities.Attendance;
import com.example.student_attendance.entities.Ligjerata;
import com.example.student_attendance.entities.Student;
import com.example.student_attendance.port.ArduinoConnection;
import com.example.student_attendance.port.NfcTagListener;
import com.example.student_attendance.repository.LigjerataRepo;
import com.example.student_attendance.repository.StudentRepo;
import com.example.student_attendance.service.AttendanceService;
import com.example.student_attendance.service.LigjerataService;
import com.example.student_attendance.service.StudentService;
import com.example.student_attendance.websocket.NotificationWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attendance")
public class AttendanceController  {

    private final AttendanceService attendanceService;
    private final StudentService studentService;
    private final LigjerataService ligjerataService;

    @Autowired
    private NotificationWebSocketHandler notificationWebSocketHandler;


    //    private final LigjerataRepo ligjerataRepo;
    @PostMapping("/create")
    public ResponseEntity<Attendance> createAttendance(@RequestBody Attendance attendance) {
        Attendance createdAttendance = attendanceService.createAttendance(attendance);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAttendance);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAttendance(@PathVariable Long id) {
        try {
            attendanceService.deleteAttendanceByID(id);
            return ResponseEntity.ok("Attendance with ID " + id + " was deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getAttendanceByID(@PathVariable Long id) {
        try {
            Optional<Attendance> attendance = attendanceService.getAttendanceByID(id);
            return ResponseEntity.ok(attendance);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Attendance>> getAllAttendances() {
        List<Attendance> attendances = attendanceService.getAllAttendance();
        return ResponseEntity.ok(attendances);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAttendance(@PathVariable Long id, @RequestBody Attendance updatedAttendance) {
        try {
            Attendance attendance = attendanceService.updateAttendanceByID(id, updatedAttendance);
            return ResponseEntity.ok(attendance);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/findAttendances/{id}")
    public ResponseEntity<List<Attendance>> getAttendanceFromLigjerataID(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.getAllAttendencesByLigjerataID(id));
    }


    @PostMapping("/check-in/{id}")
    public ResponseEntity<String> checkInStudent(@PathVariable String id) {
        Student student = studentService.getStudentByUID(id);
        Optional<Ligjerata> ligjerata = ligjerataService.getLigjerataByID(2L);
        Attendance newAttendance = new Attendance();
        newAttendance.setStudent(student);
        newAttendance.setLigjerata(ligjerata.get());

        attendanceService.createAttendance(newAttendance);
//        notificationWebSocketHandler.afterConnectionEstablished();
        notificationWebSocketHandler.notifyFrontend();

        return ResponseEntity.ok("Suii it is probably working");
    }

}
