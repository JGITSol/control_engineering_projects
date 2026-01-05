# Kalman Filter: Seeing Through the Noise
## The GPS of Control Theory

---

## **The Problem: The World is Noisy**

Imagine you are tracking a rocket. 
- You want to know its **exact** position.
- But your radar is old and shaky. It says "100m", then "105m", then "99m".
- You know physics: rockets don't teleport. They move smoothly.

**The Dilemma:**
- If you trust the radar 100%, you get a jittery path.
- If you ignore the radar and just trust your math, you might drift away if the wind blows.

**The Solution:**
The **Kalman Filter** finds the perfect balance between:
1.  **Prediction** (What physics says should happen).
2.  **Measurement** (What the sensor sees).

---

### **The Math (Formal)**

The filter operates in a loop:

1.  **Prediction (Time Update)**:
    \[ \hat{x}_{k|k-1} = F \hat{x}_{k-1|k-1} + B u_k \]
    \[ P_{k|k-1} = F P_{k-1|k-1} F^T + Q \]

2.  **Correction (Measurement Update)**:
    - **Compute Gain**:
      \[ K_k = P_{k|k-1} H^T (H P_{k|k-1} H^T + R)^{-1} \]
    - **Update State**:
      \[ \hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k (z_k - H \hat{x}_{k|k-1}) \]
    - **Update Uncertainty**:
      \[ P_{k|k} = (I - K_k H) P_{k|k-1} \]

Where:
- \( Q \): Process Noise Covariance (Real world jitters).
- \( R \): Measurement Noise Covariance (Sensor jitters).
- \( P \): Error Covariance (Our confidence).

### **Intuition (Scalar Case)**
\[ K = \frac{\text{Uncertainty}_{pred}}{\text{Uncertainty}_{pred} + \text{Uncertainty}_{sensor}} \]

- **If Sensor is precise (Low R):** \( K \to 1 \). Trust the sensor.
- **If Sensor is noisy (High R):** \( K \to 0 \). Trust the prediction.

---

## **How it Works (Step-by-Step)**

1.  **Predict**: "Based on velocity, the rocket should be at 102m."
2.  **Uncertainty**: "I'm 90% sure of this."
3.  **Measure**: Radar says "108m".
4.  **Compare**: "Whoa, that's different."
5.  **Update**: "Radar is noisy, so I'll only move my estimate a little bit towards 108m. Let's say 103m."

---

## **In This Lab**

You will simulate a simple 1D tracker (like a thermometer or a vehicle position).

### **Controls**
- **Process Noise (Q)**: How jittery is the actual system? (e.g., wind gusts).
- **Measurement Noise (R)**: How bad is your sensor?
- **Gain**: Watch how the **Kalman Gain** adapts automatically.

### **Experiments**
1.  **High Measurement Noise (R)**: Crank it up. See how the "Estimate" (Green) becomes smooth and ignores the noisy "Dots" (Red).
2.  **High Process Noise (Q)**: Make the system erratic. See how the filter reacts faster (High K) to keep up.
