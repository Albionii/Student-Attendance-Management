package com.example.student_attendance;

import org.springframework.boot.CommandLineRunner;
import org.springframework.web.client.RestTemplate;
import com.fazecast.jSerialComm.SerialPort;

public class NfcScannerApplication implements CommandLineRunner {

    private String portName;
    private int baudRate;

    public static SerialPort serialPort;

    public NfcScannerApplication(String portName, int baudRate) {
        this.portName = portName;
        this.baudRate = baudRate;
    }


    @Override
    public void run(String... args) {
        // Open the serial port
        serialPort = SerialPort.getCommPort(portName);
        serialPort.setBaudRate(baudRate);

        if (!serialPort.openPort()) {
            System.out.println("Failed to open serial port");
            return;
        }

        System.out.println("Serial port opened. Waiting for NFC scans...");

        StringBuilder uidBuilder = new StringBuilder();
        RestTemplate restTemplate = new RestTemplate();
        String postUrl = "http://localhost:8080/attendance/check-in/"; // Replace with your POST endpoint

        // Listen to the serial port
        serialPort.addDataListener(new com.fazecast.jSerialComm.SerialPortDataListener() {
            @Override
            public int getListeningEvents() {
                return SerialPort.LISTENING_EVENT_DATA_AVAILABLE;
            }

            @Override
            public void serialEvent(com.fazecast.jSerialComm.SerialPortEvent event) {
                if (event.getEventType() != SerialPort.LISTENING_EVENT_DATA_AVAILABLE) {
                    return;
                }

                byte[] readBuffer = new byte[serialPort.bytesAvailable()];
                int numRead = serialPort.readBytes(readBuffer, readBuffer.length);

                if (numRead > 0) {
                    for (byte b : readBuffer) {
                        char c = (char) b;
                        if (c == '\n' || c == '\r') {
                            if (!uidBuilder.isEmpty()) {
                                String uid = uidBuilder.toString().trim();
                                System.out.println("Scanned UID: " + uid);

                                //? Send POST request to the controller
                                try {
                                    restTemplate.postForObject(postUrl+uid, null, String.class);
                                } catch (Exception e) {
                                    System.err.println("Failed to send UID: " + e.getMessage());
                                }

                                uidBuilder.setLength(0);
                            }
                        } else {
                            uidBuilder.append(c);
                        }
                    }
                }
            }
        });
    }
}
