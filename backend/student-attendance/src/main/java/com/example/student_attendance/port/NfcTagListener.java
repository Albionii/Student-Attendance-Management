package com.example.student_attendance.port;

public interface NfcTagListener {
    void onTagScanned(String id);
}
