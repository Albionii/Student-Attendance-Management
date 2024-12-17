#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN 7
#define SS_PIN 10

MFRC522 nfc(SS_PIN, RST_PIN);

void setup() {
    Serial.begin(9600);  // Start serial communication
    SPI.begin();         // Initialize SPI
    nfc.PCD_Init();      // Initialize NFC reader
    // Serial.println("NFC Reader ready.");
}

void loop() {
    if (nfc.PICC_IsNewCardPresent() && nfc.PICC_ReadCardSerial()) {
        String uid = "";
        for (byte i = 0; i < nfc.uid.size; i++) {
            uid += String(nfc.uid.uidByte[i], HEX);
        }
        
        // Send UID over Serial
        Serial.println(uid);
        
        nfc.PICC_HaltA();
    }
    delay(200); 
}
