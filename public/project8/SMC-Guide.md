# Sliding Mode Control: Riding the Edge
## Brutally Effective Robust Control

---

## **The Concept**
Imagine you are trying to slide a coin along a specific crack in a table.
- If the coin is to the **left** of the crack, you push it hard **right**.
- If the coin is to the **right** of the crack, you push it hard **left**.

If you push fast enough, the coin will "chatter" back and forth across the crack but effectively stay **on** the crack.
This crack is the **Sliding Surface**.

---

## **The Math (Simplified)**
We define a variable \( s \) (the "distance" from the surface):
\[ s = \dot{e} + \lambda e \]
Where \( e \) is the error (Target - Actual).

- If \( s = 0 \), we are on the surface.
- The control law is simple but aggressive:
\[ u = -K \cdot \text{sign}(s) \]

---

## **Key Phases**
1.  **Reaching Phase**: The controller forces the system state towards \( s=0 \). It doesn't matter what the system dynamics are; the "push" is stronger.
2.  **Sliding Phase**: Once on \( s=0 \), the system "slides" along the line towards the target (Error = 0). The dynamics are now determined by the surface slope, not the original system!

---

## **In This Lab**
You will see a **Phase Plane**:
- **X-axis**: Error (\( e \))
- **Y-axis**: Change in Error (\( \dot{e} \))

1.  **Watch the Trajectory**: See how the point hits the **Blue Line** (Sliding Surface) and then sticks to it like a magnet until it reaches the center (0,0).
2.  **Chattering**: Notice the high-frequency vibration? That's the result of switching back and forth instantly. Real actuators hate this.
3.  **Gain (K)**: Increase K to reach the surface faster. If K is too low, the system might drift away (Unstable).
