# Autonomous Path Tracking: A Beginner's Guide
## Don't Look at the Bumper, Look at the Road

---

## **The Problem: Human vs Robot Driving**

When you drive, you don't look at the lane immediately in front of your bumper.
If you did, you would zigzag like crazy.
**You look ahead.** You see a curve coming, and you start turning **before** you hit it.

**Robots are dumb.**
- A simple PID controller looks at the error *right now*.
- "I am 1 meter to the left, turn right!"
- By the time it turns, it's 1 meter to the right. **Oscillation.**

To drive fast and smooth, needed to teach the robot to **Preview the Future**.

---

## **The Solutions**

### **1. The Stanley Controller (Geometric)**
This is the algorithm that won the **DARPA Grand Challenge** (the first big self-driving race).
It uses geometry, not just error.
- **Cross Track Error (e):** Distance from the center line.
- **Heading Error (psi):** Are we pointing the right way?
- **Speed Correction:** As speed increases, the gain effectively drops to prevent shaking.

> **Analogy:** Ideally implies "If I am close to the line but pointing away, TURN HARD. If I am far but pointing towards it, TURN GENTLY."

### **2. Model Predictive Control (MPC)**
The "Chess Grandmaster" approach.
- **Stanley** reacts to the current state.
- **MPC** simulates 50 possible futures.
    1.  What if I steer 5 degrees?
    2.  What if I steer 10 degrees?
    3.  What if I steer -5 degrees?
- It projects the car's position 2 seconds into the future for each guess.
- It picks the path that:
    - Stays close to the line.
    - Doesn't jerk the wheel (Comfort).
    - Doesn't exceed physical limits (Physics).

---

## **How the Simulator Works**

### **The Track**
A randomly generated spline. It's safe to restart (`Refresh Page`) if the track looks insane.

### **The Controllers**
- **Stanley (Blue):**
    - Watch how it performs on straightaways. Solid.
    - Watch curves. It might cut the corner or swing wide depending on tuning.
- **MPC (Red):**
    - Look at the **Green Lines**. Those are its "thoughts". It's thinking about where to go.
    - Notice how it steers **before** the curve starts. That is **Preview**.

---

## **Key Takeaways for Interviews**

| Concept | Explanation |
|---|---|
| **Lookahead** | The distance the controller "sees" ahead. Short = Nervous. Long = Lazy/Cutting corners. |
| **Kinematic Model** | The "Bicycle Model". We mathematically pretend the car has 2 wheels (front/back) to simplify math. |
| **Optimal Control** | MPC finds the mathematically perfect path, subject to constraints (like "Don't flip track limits"). |
| **Stanley** | A robust, non-linear feedback law. Great control for normal driving. |

> **Real World:** Tesla, Waymo, and Uber ALL use variations of MPC for trajectory planning. It is the industry standard.
