package com.example.student_attendance.port;

import com.fazecast.jSerialComm.SerialPort;

import java.io.IOException;
import java.util.Scanner;

public class ArduinoConnection {

    public SerialPort serialPort;
    public volatile boolean threadRunning = false;

    public ArduinoConnection(String arduinoPort, int baudRate) {
        serialPort = SerialPort.getCommPort(arduinoPort);
        // Configure port settings
        serialPort.setComPortParameters(baudRate, 8, 1, 0);
        serialPort.setComPortTimeouts(SerialPort.TIMEOUT_READ_SEMI_BLOCKING, 1000, 0);
    }

    public boolean openConnection() {
        return serialPort.openPort();
    }

    public void closeConnection() {
        if (serialPort.isOpen()) {
            serialPort.closePort();
        }
    }

    public void stopReading(Thread thread) {
        threadRunning = false;
        if (thread != null) {
            try{
                thread.join();
            }catch (Exception e){
                System.out.println("Error in closing thread : " + e.getMessage());
            }
        }
    }

    public boolean isConnected() {
        return serialPort.isOpen();
    }

    public String getData() throws IOException {
        if (!isConnected()) {
            throw new IOException("Serial port is not open bro");
        }

        Scanner scanner = new Scanner(serialPort.getInputStream());
        if (scanner.hasNextLine()) {
            return scanner.nextLine();
        }
        return null;
    }

}
