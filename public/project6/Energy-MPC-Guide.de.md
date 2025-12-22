# Energie-Arbitrage MPC: Ein Leitfaden für Anfänger
## Billig kaufen, teuer verkaufen (automatisch)

---

## **Das Problem: Die Entenkurve (The Duck Curve)**

Das Stromnetz hat ein Problem.
- **Sonnige Nachmittage:** Solarstrom flutet das Netz. Preise fallen (manchmal ins Negative!). Zu viel Energie.
- **Abende:** Die Sonne geht unter, alle kommen heim, schalten TV und Klimaanlage an. Nachfrage explodiert. Preise schießen hoch.

Das erzeugt einen Graphen, der wie eine Ente aussieht.
- **Der Bauch (12:00):** Niedrige Preise.
- **Der Kopf (19:00):** Hohe Preise.

Wenn du eine Batterie hast, kannst du Geld verdienen.
1.  **Laden**, wenn Energie billig ist (Bauch).
2.  **Entladen (Verkaufen)**, wenn sie teuer ist (Kopf).

Aber wann genau den Schalter umlegen?
Verkaufst du zu früh, verpasst du die Spitze. Zu spät, verpasst du die Chance.

---

## **Die Lösung: MPC (Model Predictive Control)**

Ein normaler Regler sieht nur "Jetzt".
**MPC** sieht die "Zukunft".

Er prognostiziert Preise für die nächsten 24 Stunden und löst das Rätsel:
*"Was ist der perfekte Lade-/Entladeplan für den ganzen Tag, um den Gewinn zu maximieren, unter Berücksichtigung meiner Batteriegrenzen?"*

Das ist wie Schachspielen mit dem Energiemarkt.

---

## **So benutzt du den Simulator**

### **1. Das Szenario (Preiskurve)**
- **Normal Day:** Typische "Entenkurve". Mittag billig, Abend teuer.
- **Negative Prices:** Manchmal gibt es so viel Wind, dass man dich fürs Verbrauchen bezahlt. MPC sollte wie verrückt laden.
- **Volatile:** Verrückte Spitzen. Schwer vorherzusagen.

### **2. Batterie-Parameter**
- **Kapazität:** Wie groß ist dein Tank?
- **Max Leistung:** Wie schnell kannst du füllen/leeren?
    - *Geringe Leistung* bedeutet, du musst früher anfangen zu laden, um abends bereit zu sein.

### **3. MPC Einstellung (Horizont)**
- **Prädiktionshorizont (N):** Wie weit er vorausblickt.
    - **N = 6h:** Sieht nur kurz voraus. Könnte die Abendspitze verpassen.
    - **N = 24h:** Sieht den ganzen Tag. Plant perfekt.

---

## **Experiment: Die Macht der Vorhersage**
1.  Setze **Horizont (N) = 1**.
    - Er ist blind. Reagiert nur auf den aktuellen Preis.
    - Du wirst sehen, er kauft/verkauft chaotisch. Wenig Gewinn.
2.  Setze **Horizont (N) = 24**.
    - Er ist ein Prophet.
    - Er fängt genau im billigsten Moment an zu laden.
    - Er wartet geduldig mit voller Batterie auf die absolute Preisspitze.
    - **Der Gewinn** wird viel höher sein.

---

## **Wichtige Erkenntnisse für Vorstellungsgespräche**

| Konzept | Erklärung |
|---|---|
| **Arbitrage** | Preisunterschiede ausnutzen. Billig kaufen, teuer verkaufen. |
| **Beschränkungen** | Batterie kann nicht < 0% oder > 100% sein. Laden nicht schneller als das Kabel erlaubt. MPC befolgt diese Regeln strikt. |
| **Optimierung** | MPC löst in jedem Zeitschritt ein mathematisches Problem. |
| **Netzspeicher** | Die Zukunft der Erneuerbaren. Batterien glätten die "Entenkurve". |
