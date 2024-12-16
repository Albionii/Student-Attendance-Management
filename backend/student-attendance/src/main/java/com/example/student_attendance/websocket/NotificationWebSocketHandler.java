package com.example.student_attendance.websocket;

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
        // Broadcast a message to all connected clients
        System.out.println("test test bubii");
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
}

