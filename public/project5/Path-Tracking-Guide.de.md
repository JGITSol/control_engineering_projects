# Autonomes Pfad-Tracking: Ein Leitfaden für Anfänger
## Schau nicht auf die Stoßstange, schau auf die Straße

---

## **Das Problem: Menschliches vs. Roboter-Fahren**

Wenn du fährst, schaust du nicht auf die Spur direkt vor deiner Stoßstange.
Wenn du das tun würdest, würdest du wie verrückt Zickzack fahren.
**Du schaust voraus.** Du siehst eine Kurve kommen und fängst an zu lenken, **bevor** du sie triffst.

**Roboter sind dumm.**
- Ein einfacher PID-Regler schaut auf den Fehler *jetzt gerade*.
- "Ich bin 1 Meter zu weit links, lenk nach rechts!"
- Bis er lenkt, ist er 1 Meter zu weit rechts. **Oszillation.**

Um schnell und sanft zu fahren, muss man dem Roboter beibringen, die **Zukunft vorherzusehen**.

---

## **Die Lösungen**

### **1. Der Stanley-Regler (Geometrisch)**
Das ist der Algorithmus, der die **DARPA Grand Challenge** (das erste große autonome Rennen) gewonnen hat.
Er nutzt Geometrie, nicht nur Fehler.
- **Querabweichung (Cross Track Error - e):** Abstand von der Mittellinie.
- **Kursfehler (Heading Error - psi):** Zeigen wir in die richtige Richtung?
- **Geschwindigkeitskorrektur:** Wenn die Geschwindigkeit steigt, sinkt die Verstärkung effektiv, um Wackeln zu verhindern.

> **Analogie:** "Wenn ich nah an der Linie bin, aber weg zeige, LENK HART. Wenn ich weit weg bin, aber zu ihr zeige, LENK SANFT."

### **2. Model Predictive Control (MPC)**
Der "Schachgroßmeister"-Ansatz.
- **Stanley** reagiert auf den aktuellen Zustand.
- **MPC** simuliert 50 mögliche Zukünfte.
    1.  Was, wenn ich 5 Grad lenke?
    2.  Was, wenn ich 10 Grad lenke?
    3.  Was, wenn ich -5 Grad lenke?
- Er projiziert die Position des Autos für jede Vermutung 2 Sekunden in die Zukunft.
- Er wählt den Pfad, der:
    - Nah an der Linie bleibt.
    - Nicht am Lenkrad reißt (Komfort).
    - Physikalische Grenzen nicht überschreitet (Physik).

---

## **Wie der Simulator funktioniert**

### **Die Strecke**
Ein zufällig generierter Spline. Es ist sicher, neu zu starten (`Seite aktualisieren`), wenn die Strecke verrückt aussieht.

### **Die Regler**
- **Stanley (Blau):**
    - Schau, wie er auf Geraden fährt. Solide.
    - Beobachte Kurven. Er könnte die Kurve schneiden oder weit rauskommen, je nach Einstellung.
- **MPC (Rot):**
    - Schau auf die **Grünen Linien**. Das sind seine "Gedanken". Er überlegt, wo er hinfahren soll.
    - Beachte, wie er lenkt, **bevor** die Kurve beginnt. Das ist **Vorausschau**.

---

## **Wichtige Erkenntnisse für Vorstellungsgespräche**

| Konzept | Erklärung |
|---|---|
| **Lookahead (Vorausschau)** | Die Distanz, die der Regler voraus "sieht". Kurz = Nervös. Lang = Faul/Kurven schneiden. |
| **Kinematisches Modell** | "Fahrradmodell". Wir tun mathematisch so, als hätte das Auto 2 Räder (vorne/hinten), um die Mathe zu vereinfachen. |
| **Optimale Regelung** | MPC findet den mathematisch perfekten Pfad, unter Berücksichtigung von Einschränkungen (wie "Nicht von der Strecke fliegen"). |
| **Stanley** | Robustes, nicht-lineares Rückkopplungsgesetz. Tolle Regelung für normales Fahren. |

> **Echte Welt:** Tesla, Waymo und Uber nutzen ALLE Variationen von MPC für die Bahnplanung. Es ist der Industriestandard.
