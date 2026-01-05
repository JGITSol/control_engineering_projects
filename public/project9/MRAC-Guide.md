# MRAC: The Chamaeleon of Control
## Model Reference Adaptive Control

---

## **The Scenario**

You are flying a plane. Suddenly, **ice forms on the wings**.
- The aerodynamics change instantly.
- The plane becomes heavy and sluggish.
- Your normal pilot inputs don't work as expected.

**Standard Control**: You might crash. The controller is fixed and tuned for a "Clean Plane", not an "Icy Plane".
**Adaptive Control**: The autopilot "feels" the sluggishness and thinks: *"Hey, I'm pulling up but we aren't rising fast enough. I need to pull HARDER than usual."* It effectively **re-tunes itself in real-time**.

---

## **How MRAC Works**

1.  **Reference Model**: A mathematical ideal. This is how we *wish* the system behaved (e.g., a perfect, snappy F-16 fighter jet).
2.  **The Plant**: The real, messy system (e.g., the icy plane) with unknown or changing parameters.
3.  **Adaptation Law**:
    - We compare the **Reference Output** (\( y_m \)) vs **Plant Output** (\( y \)).
    - If they differ, we change the **Controller Gains** in real-time to minimize the error.

### The Math (Simplified)

We use the **MIT Rule** (gradient descent) to update the parameters.

\[ \frac{d\theta}{dt} = -\gamma \cdot e \cdot u_{model} \]

Where:
- \( \theta \) (Theta): The Adaptive Controller Gain. This is what changes.
- \( \gamma \) (Gamma): **Adaptation Rate**. High = Fast learning; Low = Smooth learning.
- \( e = y - y_m \): **Tracking Error** (Difference between Real and Ideal).

---

## **In This Lab**

You will oversee an **Adaptive Cruise Control**.

1.  **Change the Plant**: Use the slider to increase "Actual Plant Gain" (simulate the car getting heavier or engine losing power).
    - Watch the **Green Line** (Real Car) lag behind the **Gray Line** (Reference Model).
2.  **Watch Adaptation**:
    - See the **Adaptive Gain (Theta)** (Orange Line) automatically climb up or down.
    - As it changes, the Green Line will catch up to the Gray Line, even though you didn't touch the code!
3.  **Inject Disturbance**:
    - Click **"Inject Disturbance"** to simulate a sudden wind gust or bump. Watch how the controller reacts (or doesn't) compared to the reference model.
4.  **Tuning**:
    - **High Gamma**: Fast learning (but might oscillate/overshoot).
    - **Low Gamma**: Slow learning (safe but sluggish).
