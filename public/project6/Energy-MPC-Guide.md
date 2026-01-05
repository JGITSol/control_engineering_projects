# Energy MPC: A Beginner's Guide
## Buy Low, Sell High (Automatically)

---

## **The Problem: The Duck Curve**

Renewable energy is annoying.
- **Solar:** High at noon, Zero at night.
- **Wind:** Blows whenever it wants.
- **Demand:** People use energy when they wake up and when they get home (Morning/Evening peaks).

The **Grid** needs stability. Supply MUST equal Demand, or lights go out.
We use **Batteries** to fix this.
**The Trick:** When do you charge? When do you discharge?

- If you charge when energy is expensive: **You lose money.**
- If you discharge when nobody needs it: **You waste capacity.**

---

## **The Solution: Economic MPC**

Model Predictive Control (MPC) isn't just for cars. It's for **Money**.
In this project, the controller is an Investment Banker.

### **The Inputs**
1.  **Forecast:** "I predict wind will blow heavily at 3 PM."
2.  **Price:** "Energy is cheap ($0.05) at 3 PM, but expensive ($0.30) at 7 PM."
3.  **Battery:** "I am 20% full."

### **The Logic (Optimization)**
The controller solves a puzzle:
*"Find the schedule of charging/discharging for the next 24 hours that results in the MAXIMUM PROFIT."*

### The Math
We want to **Maximize Profit** \( J \):

\[ J = \sum_{k=0}^{N-1} \left( P_{price}(k) \cdot P_{discharge}(k) - P_{cost}(k) \cdot P_{charge}(k) \right) \]

**Subject to Constraints:**
1.  **Battery Dynamics**:
    \[ SoC[k+1] = SoC[k] + \eta \cdot (P_{charge}[k] - P_{discharge}[k]) \cdot \Delta t \]
2.  **Capacity Limits**:
    \[ SoC_{min} \le SoC[k] \le SoC_{max} \]
3.  **Power Limits**:
    \[ 0 \le P_{charge} \le P_{max} \]

**Example Plan:**
- **1 PM - 4 PM:** Wind is high, Price is low. **CHARGE** the battery.
- **5 PM - 8 PM:** Sun sets, Price skyrockets. **DISCHARGE** (Sell) energy to the grid.
- **Result:** You bought free wind, sold expensive electrons. Profit.

---

## **Dynamic Programming (The Brain)**
Because this problem is complex (constraints, limits), we use **Dynamic Programming**.
It works backwards from midnight.
- "To have $100 profit at midnight, I needed $80 at 11 PM..."
- It builds a "Map of Optimal Moves" for every possible battery level.

---

## **How to Use the Simulator**

### **1. The Dashboard**
- **Top Chart:** Wind Power (Green) vs Grid Price (Yellow).
- **Bottom Chart:** Battery SoC (Blue).

### **2. Watch the Optimization**
- Click **"Run Optimizer"**.
- Watch it plan the day.
- Notice:
    - It **Charges** when the Yellow Line (Price) is low.
    - It **Discharges** when the Yellow Line is peaks.
    - It **Never** lets the battery go below 20% or above 90% (Health Limits).

---

## **Key Takeaways for Interviews**

| Concept | Explanation |
|---|---|
| **Arbitrage** | Taking advantage of price differences. Buy cheap, sell expensive. |
| **Peak Shaving** | Using battery power to lower the demand on the grid during peak hours. |
| **Constraints** | Physical limits. "Battery cannot hold > 100kWh". MPC respects this perfectly. |
| **Horizon** | How far ahead we look. 24 hours is standard for Day-Ahead Markets. |

> **Real World:** Every massive battery farm (Tesla Megapack) runs this logic to pay for itself.
