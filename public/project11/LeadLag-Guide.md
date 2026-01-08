# Lead-Lag Compensator Guide

## Theory
Control system design often takes place in the frequency domain. The goal is to shape the loop gains $L(s) = C(s)P(s)$ to satisfy stability margins.

### Lead Compensator
- **Transfer Function**: $C(s) = K \frac{s+z}{s+p}$ where $z < p$.
- **Effect**: Adds **positive phase** (lead) in the frequency range between $z$ and $p$.
- **Benefit**: Increases **Phase Margin**, which reduces overshoot and improves damping.
- **Cost**: Increases high-frequency gain (noise susceptibility).

### Lag Compensator
- **Transfer Function**: $C(s) = K \frac{s+z}{s+p}$ where $z > p$.
- **Effect**: Attenuates high-frequency gain.
- **Benefit**: Increases low-frequency gain (reducing steady-state error) without destabilizing high frequencies.
- **Cost**: Adds negative phase (lag), which can reduce stability margins if not careful.

## Lab Instructions

### The Plant
The system being controlled is a standard Type 1 plant:
$$ G(s) = \frac{K_p}{s(s+2)} $$
This system is naturally stable but may have poor performance or low stability margins at higher gains.

### Design Goal
1. **Target Phase Margin**: Try to achieve a Phase Margin of **> 45°**.
2. **Procedure**:
   - Adjust **Gain K** to set the crossover frequency (bandwidth). Higher K = faster response but less stable.
   - If PM is low (e.g., < 20°), the step response will be oscillatory.
   - Make it a **Lead Compensator** by moving **Zero (z)** to satisfy $z < \omega_{gc}$ and **Pole (p)** to higher frequency ($p > \omega_{gc}$).
   - Observe how the "Phase Bump" of the compensator lifts the phase curve at the crossover frequency.

### Interactive Features
- **Bode Plot**: Shows the open-loop response. The Phase Margin is calculated where Magnitude crosses 0 dB.
- **Step Response**: Shows the closed-loop time domain behavior. Notice how increasing PM reduces the overshoot peaks.
