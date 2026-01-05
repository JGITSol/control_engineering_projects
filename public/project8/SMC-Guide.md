# Sliding Mode Control: Riding the Edge

## Brutally Effective Robust Control

---

## **The Concept**

Imagine you are trying to slide a coin along a specific crack in a table.
- If the coin is to the **left** of the crack, you push it hard **right**.
- If the coin is to the **right** of the crack, you push it hard **left**.

If you push fast enough, the coin will "chatter" back and forth across the crack but effectively stay **on** the crack.
This crack is the **Sliding Surface**. This method is incredibly **robust** because it works even if the table is slightly tilted or sticky—as long as your push is strong enough.

---

## **The Math (Simplified)**

We define a **Sliding Surface** \( s(t) \). Our goal is to drive the system to this surface and keep it there.

\[ s = \dot{e} + \lambda e \]

where:
- \( e = r - y \) is the **Tracking Error** (Target - Actual).
- \( \dot{e} \) is the **Rate of Change of Error**.
- \( \lambda \) (Lambda) is a tuning parameter that determines how fast the error decays once we are on the surface.

### Control Law
The control input \( u \) switches its sign based on which side of the surface we are on:

\[ u = -K \cdot \text{sign}(s) \]

- **If \( s > 0 \)**: We are "above" the surface, so we apply negative large force \(-K\).
- **If \( s < 0 \)**: We are "below" the surface, take applies positive large force \(+K\).

---

## **Key Phases**

1.  **Reaching Phase**: The controller forces the system state towards \( s=0 \). It doesn't matter what the system dynamics are; as long as \( K \) is large enough, the "push" will overcome natural dynamics and disturbances.
2.  **Sliding Phase**: Once on \( s=0 \), the system "slides" along the line towards the target (Error = 0). The dynamics are now determined by \( \lambda \), effectively following the differential equation \( \dot{e} + \lambda e = 0 \).

---

## **In This Lab**

You can experiment with the system response on the **Phase Plane**:
- **X-axis**: Error (\( e \))
- **Y-axis**: Change in Error (\( \dot{e} \))

### Instructions:
1.  **Watch the Trajectory**: See how the point hits the **Blue Line** (Sliding Surface) and then sticks to it like a magnet until it reaches the center (0,0).
2.  **Impulse the System**: Click the **"Apply Impulse"** button to simulate a sudden kick or disturbance. Watch how the controller immediately fights back to return to the sliding surface.
3.  **Chattering**: Notice the high-frequency vibration? That's the result of switching back and forth instantly. Real actuators hate this, which is why we often use a "boundary layer" (soft switching) in practice.
4.  **Gain (K)**: Increase K to reach the surface faster. If K is too low, the system might not be strong enough to overcome disturbances.
