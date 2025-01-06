package com.example.student_attendance;

import com.example.student_attendance.controller.AttendanceController;
import com.example.student_attendance.port.ArduinoConnection;
import com.example.student_attendance.service.AttendanceService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
public class StudentAttendanceSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentAttendanceSystemApplication.class, args);
		new NfcScannerApplication("COM5", 9600).run();
	}
}
