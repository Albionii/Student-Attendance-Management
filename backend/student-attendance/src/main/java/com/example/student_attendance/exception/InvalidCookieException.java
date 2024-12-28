package com.example.student_attendance.exception;


public class InvalidCookieException extends RuntimeException {
    public InvalidCookieException(String message) {
        super(message);
    }
}
