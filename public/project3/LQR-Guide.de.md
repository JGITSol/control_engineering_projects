# Invertiertes Pendel & LQR: Ein Leitfaden für Anfänger
## Die Kunst, das Chaos zu balancieren

---

## **Das Problem: Die Besenstiel-Herausforderung**

Versuche, einen Besen senkrecht auf deiner Handfläche zu balancieren.
- Wenn er leicht nach **links** kippt, musst du deine Hand nach **links** bewegen (und zwar schnell!), um darunter zu kommen.
- Wenn du dich zu langsam bewegst, fällt er.
- Wenn du dich zu schnell bewegst, schleuderst du ihn in die andere Richtung.

Das ist ein **Instabiles System**.
- **Stabiles System:** Eine Kugel in einer Schüssel. Wenn du sie schubst, rollt sie zurück.
- **Instabiles System:** Eine Kugel auf einem Hügel. Wenn du sie schubst, ist sie weg.

Um den Besen oben zu halten, brauchst du jede Millisekunde **Aktive Regelung**.

---

## **Die Regelungsstrategie: LQR**

PID ist großartig für einfache Dinge (wie Geschwindigkeit halten).
Aber einen Besen zu balancieren beinhaltet:
1.  **Wagenposition** (Im Raum bleiben)
2.  **Wagengeschwindigkeit** (Nicht crashen)
3.  **Pendelwinkel** (Nicht fallen)
4.  **Pendelwinkelgeschwindigkeit** (Nicht drehen)

PID hat Mühe, 4 Dinge gleichzeitig zu jonglieren.
Hier kommt **LQR (Linear Quadratic Regulator)** - Linear-quadratischer Regler.

### **Wie LQR funktioniert**
Er verwendet eine mathematische "Kostenfunktion" (J), um den perfekten Schritt zu entscheiden.
Er balanciert zwei gierige Wünsche:
1.  **Zustandskosten (Q):** "Ich will, dass der Fehler NULL ist."
2.  **Regelungskosten (R):** "Ich will FAUL sein (Energie sparen)."

> **Analogie:**
> LQR ist wie ein faules Genie. Er berechnet den *exakten minimalen Aufwand*, der nötig ist, um den Besen aufrecht zu halten, ohne 100 mph zu rennen.

---

## **So benutzt du den Simulator**

### **1. Die Physik**
- **Wagenmasse (M):** Schwerer Wagen = Schwerer zu beschleunigen.
- **Pendellänge (l):** Langer Stab = Fällt langsamer (Einfacher). Kurzer Stab = Fällt sofort (Schwerer).

### **2. LQR Einstellen (Q und R)**
- **Q_pos (x):** Wie wichtig ist es dir, in der Mitte zu bleiben?
    - Hohes Q_pos = Er wird zur Mitte zurückrasen (aggressiv).
- **Q_angle (theta):** Wie wichtig ist es dir, aufrecht zu sein?
    - **KRITISCH.** Muss hoch sein, sonst fällt er.
- **R (Regelungskosten):** Wie teuer ist Treibstoff?
    - Hohes R = Glatte, sanfte Bewegungen.
    - Niedriges R = Ruckartige, heftige Bewegungen.

### **3. Experimente**
1.  **Der "Faule" Regler:** Setze **R = 10**. Er bewegt sich zu langsam und das Pendel fällt.
2.  **Der "Nervöse" Regler:** Setze **R = 0.01**. Er vibriert verrückt, um perfekt vertikal zu bleiben.
3.  **Die Störung:** Klicke auf **"Add Disturbance"**. Das tritt den Wagen. Sieh zu, wie LQR kämpft, um sich zu erholen.

---

## **Wichtige Erkenntnisse für Vorstellungsgespräche**

| Konzept | Erklärung |
|---|---|
| **LQR** | Optimale Regelungsmethode für Mehrgrößensysteme (MIMO). |
| **Zustandsraum** | Darstellung des Systems als Vektor von Zahlen (x, dx, theta, dtheta). |
| **Pole** | In der Regelungstheorie bedeuten "Instabile Pole", dass das System explodiert. LQR verschiebt diese Pole in den stabilen Bereich. |
| **Kostenfunktion** | Die mathematische Formel, die LQR minimiert: `Summe(Fehler^2 + Aufwand^2)`. |

> **Echte Welt:** Raketen, die beim Start balancieren, nutzen diese Logik. Segways nutzen diese Logik.

---

## **Warum ist das schwer?**
Weil das System **Nicht-Linear** ist.
LQR nimmt an, dass die Welt linear (einfach) ist.
- Wenn der Winkel zu groß wird (> 20 Grad), versagt die lineare Annahme und LQR **gibt auf**.
- Versuche `Initial Angle` auf 45 Grad zu setzen. Sieh zu, wie er versagt.

**Das ist die Grenze der Linearen Regelung.**
