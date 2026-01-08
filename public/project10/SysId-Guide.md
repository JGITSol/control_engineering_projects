# System Identification Guide

## What is System Identification?
System Identification is the process of building mathematical models of dynamical systems from measured data. In many real-world scenarios, we don't know the exact physics or parameters of a system (like a motor's exact friction coefficient or a chemical reactor's thermal capacity). Instead, we inject inputs, measure outputs, and use algorithms to estimate the governing equations.

## Recursive Least Squares (RLS)
This lab uses **Recursive Least Squares (RLS)**, one of the most popular online identification algorithms. Unlike "batch" methods that process all data at once, RLS updates parameter estimates with every new data sample, allowing it to track changing systems in real-time.

### The Model
We simulate a linear Single-Input Single-Output (SISO) discrete system (ARX Model):

$$ y(k) = a \cdot y(k-1) + b \cdot u(k-1) + \text{noise} $$

Where:
- $y(k)$ is the current output.
- $u(k-1)$ is the previous input.
- $a, b$ are the unknown parameters we want to find.

### The Algorithm
The RLS algorithm minimizes the sum of squared prediction errors. At each step $k$:

1. **Predict**: Calculate what we expect $y(k)$ to be based on current estimates $\hat{\theta}$.
   $$ \hat{y}(k) = \phi(k)^T \hat{\theta}(k-1) $$
2. **Error**: Compare to actual measured $y(k)$.
   $$ e(k) = y(k) - \hat{y}(k) $$
3. **Gain**: Compute filter gain $K(k)$ based on covariance $P$.
4. **Update**: Correct estimates.
   $$ \hat{\theta}(k) = \hat{\theta}(k-1) + K(k) e(k) $$
5. **Covariance**: Update the confidence matrix $P$ (inverse of correlation matrix).

### Key Parameters
- **Forgetting Factor ($\lambda$)**: Determines how fast old data is "forgotten".
    - $\lambda = 1.0$: Infinite memory (standard LS). Good for constant parameters, converges to average.
    - $\lambda < 1.0$ (e.g., 0.98): Exponential forgetting. Better for tracking time-varying parameters but can be sensitive to noise.
- **Excitation**: To identify a system, the input $u(k)$ must be "rich" enough. A constant input (Step) is often insufficient to distinguish between dynamics. **PRBS** (Pseudo-Random Binary Sequence) is excellent for identification as it excites many frequencies.

## Lab Instructions
1. **Start with PRBS**: Select PRBS input. This provides the best excitation.
2. **Watch Convergence**: Observe how $\hat{a}$ and $\hat{b}$ converge to the True Pole and True Gain values.
3. **Add Noise**: Increase noise. Note how estimates become jittery but should still oscillate around the true values.
4. **Change Plant**: Move the "True Pole" slider while the sim is running. Watch RLS track the change.
5. **Tune Lambda**: Lower $\lambda$ to make tracking faster, but notice the increased noise in the estimates.
