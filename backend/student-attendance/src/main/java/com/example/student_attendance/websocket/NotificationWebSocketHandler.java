package com.example.student_attendance.websocket;

import com.example.student_attendance.NfcScannerApplication;
import com.fazecast.jSerialComm.SerialPort;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;

import java.util.ArrayList;
import java.util.List;

@Component
public class NotificationWebSocketHandler extends TextWebSocketHandler {

    private List<WebSocketSession> sessions = new ArrayList<>();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        // Handle incoming messages from clients (if needed)
    }

    public void notifyFrontend() {
        try {
            for (WebSocketSession session : sessions) {
                session.sendMessage(new TextMessage("student-created"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }


    public void sendCommandToArduino(boolean pinHigh) {
        if (!NfcScannerApplication.serialPort.isOpen()) {
            if (!NfcScannerApplication.serialPort.openPort()) {
                System.out.println("Failed to open serial port.");
                return;
            }
        }

        byte commandInByte = (byte) (pinHigh ? '1' : '0');
        synchronized (NfcScannerApplication.serialPort) {
            NfcScannerApplication.serialPort.writeBytes(new byte[]{commandInByte}, 1);
        }
    }
}

