#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN 7
#define SS_PIN 10
#define CONTROL_PIN_RED 3 // Pin to be controlled
#define CONTROL_PIN_GREEN 4 // Pin to be controlled

MFRC522 nfc(SS_PIN, RST_PIN);

void setup() {
    Serial.begin(9600);  
    SPI.begin();         
    nfc.PCD_Init();      
    pinMode(CONTROL_PIN_RED, OUTPUT); 
    pinMode(CONTROL_PIN_GREEN, OUTPUT); 
    digitalWrite(CONTROL_PIN_RED, LOW);
    digitalWrite(CONTROL_PIN_GREEN, LOW);
}

void loop() {
    if (nfc.PICC_IsNewCardPresent() && nfc.PICC_ReadCardSerial()) {
        String uid = "";
        for (byte i = 0; i < nfc.uid.size; i++) {
            uid += String(nfc.uid.uidByte[i], HEX);
        }
        
        // Send UID over Serial
        Serial.println(uid);
        nfc.PICC_HaltA(); // Halt the card
    }

    // This is the code for reading from backend if a student is not in database.    
    if (Serial.available() > 0) {
        char command = Serial.read(); 

        if (command == '0') {
            digitalWrite(CONTROL_PIN_RED, HIGH); // Set pin HIGH

            delay(2000); // Keep HIGH for 2 seconds

            digitalWrite(CONTROL_PIN_RED, LOW); 
        }
        else if (command == '1') {
            digitalWrite(CONTROL_PIN_GREEN, HIGH); // Set pin HIGH

            delay(2000); // Keep HIGH for 2 seconds

            digitalWrite(CONTROL_PIN_GREEN, LOW); 
          
        }
         else {
            Serial.println("Invalid command received: " + String(command));
        }
    }

    delay(200);
}
