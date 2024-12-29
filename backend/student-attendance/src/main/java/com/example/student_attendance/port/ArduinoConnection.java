package com.example.student_attendance.port;

import com.fazecast.jSerialComm.SerialPort;

import java.io.IOException;
import java.util.Scanner;

public class ArduinoConnection extends Thread {

    private final SerialPort serialPort;
    private volatile boolean threadRunning = false;
    private NfcTagListener nfcTagListener; // Listener for scanned data

    public ArduinoConnection(String arduinoPort, int baudRate) {

        serialPort = SerialPort.getCommPort(arduinoPort);
        // Configure port settings
        serialPort.setComPortParameters(baudRate, 8, 1, 0);
        serialPort.setComPortTimeouts(SerialPort.TIMEOUT_READ_SEMI_BLOCKING, 1000, 0);
    }

    public void setDataListener(NfcTagListener listener) {
        this.nfcTagListener = listener;
    }

    public boolean openConnection() {
        return serialPort.openPort();
    }

    public void closeConnection() {
        if (serialPort.isOpen()) {
            serialPort.closePort();
        }
    }

    public void stopReading() {
        threadRunning = false;
        try {
            this.join();
        } catch (Exception e) {
            System.out.println("Error in stopping thread: " + e.getMessage());
        }
    }

    public boolean isConnected() {
        return serialPort.isOpen();
    }

    @Override
    public void run() {
        if (!openConnection()) {
            System.out.println("Failed to open the portal.");
            return;
        }

        System.out.println("Serial portal has been opened!");
        threadRunning = true;

        try (Scanner scanner = new Scanner(serialPort.getInputStream())) {
            while (threadRunning) {
                if (scanner.hasNextLine()) {
                    String data = scanner.nextLine();
                    System.out.println("UID: " + data);

                    // Notify the listener with the received data
                    if (nfcTagListener != null) {
                        nfcTagListener.onTagScanned(data);
                    }
                }
                Thread.sleep(200); // Small delay to reduce CPU usage
            }
        } catch (Exception e) {
            System.out.println("Error in thread: " + e.getMessage());
        } finally {
            closeConnection();
            System.out.println("Serial connection closed.");
        }
    }
}
