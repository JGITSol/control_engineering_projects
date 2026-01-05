# MRAC: The Chamaeleon of Control
## Model Reference Adaptive Control

---

## **The Scenario**
You are flying a plane. Suddenly, **ice forms on the wings**.
- The aerodynamics change instantly.
- The plane becomes heavy and sluggish.
- Your normal pilot inputs don't work as expected.

**Standard Control**: You crash. The controller is tuned for a "Clean Plane", not an "Icy Plane".
**Adaptive Control**: The autopilot thinks: *"Hey, I'm pulling up but we aren't rising fast enough. I need to pull HARDER than usual."*

---

## **How MRAC Works**

1.  **Reference Model**: A mathematical dream. This is how we *wish* the system behaved (e.g., a perfect, snappy F-16 fighter jet).
2.  **The Plant**: The real, messy system (e.g., the icy plane).
3.  **Adaptation Law**:
    - We compare the **Reference Output** vs **Plant Output**.
    - If they differ, we change the **Controller Gains** in real-time.
    - using the "MIT Rule" or Lyapunov theory to ensure we converge.

\[ \frac{d\theta}{dt} = -\gamma \cdot e \cdot u_{model} \]
Where:
- \( \theta \): Controller parameter (Adaptive Gain).
- \( \gamma \): Adaptation Rate (Learning speed).
- \( e \): Tracking Error.

---

## **In This Lab**
You will oversee an **Adaptive Cruise Control**.

1.  **Change the Plant**: Use the slider to increase "Car Weight" (simulate towing a trailer).
    - Watch the **Green Line** (Real Car) lag behind the **Gray Line** (Reference Model).
2.  **Watch Adaptation**:
    - See the **Adaptive Gain** (Orange Line) slowly climb up.
    - As it increases, the Green Line will catch up to the Gray Line.
3.  **Tuning**:
    - High **Gamma** = Fast learning (but might oscillate).
    - Low **Gamma** = Slow learning (safe but sluggish).
