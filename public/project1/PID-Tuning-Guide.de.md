# PID-Autotuning: Ein Leitfaden für Anfänger
## Wie man alles regelt (ohne Absturz)

---

## **Das Problem: Das Goldlöckchen-Dilemma**

Stell dir vor, du fährst ein Auto und möchtest genau **60 mph** halten.

- **Zu langsam?** Du gibst Gas.
- **Zu schnell?** Du lässt los (oder bremsen).

Aber es ist nie so einfach:
1.  **Drückst du zu fest:** Schießt du auf 80 mph hoch (Überschwingen) ✗
2.  **Drückst du zu sanft:** Dauert es 5 Minuten, um auf Geschwindigkeit zu kommen (Träge) ✗
3.  **Panik-Korrektur:** Du pendelst zwischen 50 und 70 mph (Instabilität) ✗

**Die Herausforderung:** Wie kommen wir SCHNELL auf 60 mph, ohne darüber hinauszuschießen, und bleiben dort sanft?
**Die Lösung:** Der PID-Regler.

---

## **Was ist PID? (Die Mathematik dahinter)**

PID steht für **Proportional-Integral-Derivative**. Es sind drei Freunde, die darüber streiten, wie man das Auto fährt.

### **P - Proportional (Die Gegenwart)**
> *"Wir sind weit weg! Fahr schneller!"*

- **Logik:** `Ausgang = Kp * Fehler`
- Je größer der Fehler, desto härter drückt er.
- **Problem:** Wenn du näher kommst, wird der Fehler klein, also hört er auf zu drücken, *bevor* du ankommst. Er ist faul. Er hinterlässt einen "Bleibenden Regelfehler".

### **I - Integral (Die Vergangenheit)**
> *"Wir sind schon zu lange langsam! Drück fester!"*

- **Logik:** `Ausgang = Ki * Summe(Fehler)`
- Es betrachtet die *Geschichte* des Fehlers. Wenn du eine Minute lang 59 mph gefahren bist, wird "I" genervt und drückt das Gas immer lauter, bis du 60 erreichst.
- **Problem:** Es erzeugt Schwung. Es drückt so fest, dass du, wenn du 60 erreichst, immer noch beschleunigst und auf 65 überschießt.

### **D - Derivative (Die Zukunft)**
> *"Whoa, wir nähern uns zu schnell! Langsam!"*

- **Logik:** `Ausgang = Kd * Änderungsrate`
- Es betrachtet die *Geschwindigkeit* der Korrektur. Wenn der Tacho hochschnellt, tritt "D" auf die Bremse, um ein Überschwingen zu verhindern.
- **Problem:** Es ist nervös. Wenn der Sensor rauscht, flippt "D" aus.

---

## **Die Magie des Autotunings**

Einen PID-Regler einzustellen (Zahlen für P, I und D zu finden) ist eine Kunst.
**Autotuning** ist ein Roboter-Künstler.

### **Wie Ziegler-Nichols (Die Relais-Methode) funktioniert:**
1.  **PID ausschalten.**
2.  **Relais starten:**
    - Wenn Geschwindigkeit < 60, VOLLGAS.
    - Wenn Geschwindigkeit > 60, VOLLBREMSUNG.
3.  **Die Oszillation beobachten:** Da Vollgas/Vollbremsung extrem ist, wird das Auto um 60 mph pendeln (wackeln).
4.  **Das Wackeln messen:**
    - **\( T_u \)** (Kritische Periode): Zeit zwischen den Spitzen.
    - **\( K_u \)** (Kritische Verstärkung): Wie heftig das Wackeln ist.
5.  **PID berechnen:** Basierend auf \( T_u \) und \( K_u \) setzt der Algorithmus bekannte "perfekte Verhältnisse" ein, um dir einen stabilen Regler zu geben.

---

## **So benutzt du den Simulator**

### **Schritt 1: Konfiguriere dein Auto (Prozess)**
- **Verstärkung (K):** Wie stark ist der Motor? (Hohes K = Sportwagen, Niedriges K = LKW)
- **Zeitkonstante (Tau):** Wie schwer ist das Auto? (Hohes Tau = Schwer/Träge)
- **Totzeit (Theta):** Verzögerung zwischen Pedal und Motor? (Die "Oh nein"-Verzögerung)

### **Schritt 2: Wähle deine Tuning-Strategie**
- **Ziegler-Nichols:** Der Klassiker. Schnell, könnte aber etwas überschwingen.
- **Cohen-Coon:** Besser, wenn dein Auto ein riesiges Turboloch hat (hohe Totzeit).

### **Schritt 3: Auto-Tune & Fahren**
- Klicke auf **"Auto-Tune & Simulate"**.
- Beobachte zuerst den **Relais-Test** (das Wackeln).
- Sieh zu, wie die **PID-Regelung** übernimmt.

### **Worauf du achten solltest (Metriken)**
- **Überschwingen (Overshoot) %:** Sind wir über 60 mph gegangen? (Ziel: < 10%)
- **Einschwingzeit (Settling Time):** Wie lange bis wir stabil blieben? (Ziel: So schnell wie möglich)
- **Anstiegszeit (Rise Time):** Wie schnell vom Start weg?

---

## **Wichtige Erkenntnisse für Vorstellungsgespräche**

| Konzept | Erklärung |
|---|---|
| **P-Anteil** | Drückt basierend auf der aktuellen Entfernung. Gut, lässt aber Lücken. |
| **I-Anteil** | Drückt basierend auf Zeitverzögerung. Behebt die Lücke/den Versatz. |
| **D-Anteil** | Bremst basierend auf Geschwindigkeit. Verhindert Crash/Überschwingen. |
| **Relais-Tuning** | Erzwingen von Oszillationen, um die natürlichen Frequenzgrenzen des Systems zu messen. |
| **Totzeit** | Der schlimmste Feind der Regelung. Die Zeitverzögerung, bevor irgendetwas passiert. |

> **Analogie:** P ist das Lenkrad, I ist die Gaskorrektur für Hügel, D sind die Bremsen für Kurven.

---

## **Probier diese Herausforderung**
1.  Setze **Totzeit** auf **2.0s** (Riesige Verzögerung).
2.  Versuche **Ziegler-Nichols**. Wackelt es?
3.  Versuche **Cohen-Coon**. Ist es besser? (Hinweis: Sollte es sein).
