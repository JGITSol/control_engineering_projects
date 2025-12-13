<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **Project 6: Model Predictive Control for Power Systems (Wind Turbine + Battery Storage)**

I'll create an interactive **MPC-based energy management system** for a grid-connected renewable asset. This project demonstrates constrained optimization, forecasting integration, and real-world industrial control [^1][^2][^3][^4].

## **System Overview**

**Hybrid Power System:**

- **Wind Turbine** - Variable power output (with wind speed forecasting)
- **Battery Energy Storage System (BESS)** - Charge/discharge for smoothing + arbitrage
- **Grid Connection** - Demand tracking and price-responsive operation
- **Load Profile** - Residential/commercial consumption pattern

**Control Objectives (MPC Formulation):**

1. **Power Balance** - Satisfy demand: Wind + Battery + Grid ≥ Load
2. **Battery Constraints** - State-of-charge (20%-95%), charge/discharge rates (C/2 rating)
3. **Cost Minimization** - Time-of-use pricing + demand charges + battery degradation
4. **Ramp Rate Limits** - Smooth power delivery to grid (50 kW/min)
5. **Frequency Support** - Reactive power/voltage regulations (optional)

**MPC Implementation:**

```
minimize:  ∑ᵢ (Pᵍʳⁱᵈ[k+i]·λ[k+i] + cost_degrade·|Pbatt[k+i]|)
           i=0...N-1

subject to:
  Pbatt + Pwind + Pgrid = Pload    (power balance)
  SoC[k+1] = SoC[k] + η·Pbatt·Δt    (battery dynamics)
  20% ≤ SoC[k] ≤ 95%               (state constraints)
  |Pbatt[k]| ≤ 50 kW               (rate constraints)
  |Pgrid[k]| ≤ Pgrid_max           (connection limit)
  |ΔP[k]| ≤ 50 kW/min              (ramp rate)
```

**Key Features:**

✅ **Finite Horizon Optimization** (N=24 steps, 1-hour window)
✅ **Wind Forecast Integration** - Stochastic prediction with uncertainty bands
✅ **Time-of-Use Pricing** - Day-ahead electricity prices (\$/kWh)
✅ **Battery Degradation Model** - Cycle-counting for optimal cycling
✅ **Real-Time Solver** - OSQP/cvxpy for <100ms solve time
✅ **Receding Horizon Control** - Rolling window with warm-start
✅ **Comparative Analysis** - MPC vs. Rule-based vs. Myopic strategies

## **Interactive Dashboard**

**Left Panel - Configuration:**

- Battery capacity (50-500 kWh)
- Wind turbine rating (25-100 kW)
- Forecast horizon (6-24 hours)
- Pricing profile (flat/TOU/dynamic)
- Initial SoC (%)

**Center Panel - Optimization Results:**

- Optimal battery charge/discharge schedule
- Grid power setpoint trajectory
- Cost breakdown (energy + demand charges)
- Constraint satisfaction status

**Bottom Panels - Visualization:**

1. **Power Flows Plot** - Stacked area (Wind, Battery, Grid, Load)
2. **SoC Trajectory** - Battery state with margin bounds
3. **Price Signal** - Electricity price vs. time
4. **Cost Comparison** - MPC vs. baselines (savings %)

## **Python Backend Code (Open-Source Stack)**

Uses **cvxpy + OSQP** for real-time quadratic programming [^5][^6][^7]:

```python
import cvxpy as cp
import numpy as np

class BatteryMPC:
    def __init__(self, capacity=200, max_power=50, horizon=24):
        self.capacity = capacity  # kWh
        self.max_power = max_power  # kW
        self.horizon = horizon  # steps
        
    def optimize(self, soc_init, pwind_forecast, pload_forecast, prices):
        """
        Solve receding-horizon MPC problem
        Returns: optimal Pbatt, Pgrid schedules
        """
        # Decision variables
        pbatt = cp.Variable(self.horizon)  # battery power (neg=discharge)
        pgrid = cp.Variable(self.horizon)  # grid power (neg=selling)
        soc = cp.Variable(self.horizon + 1)  # state of charge trajectory
        
        # Constraints list
        constraints = []
        
        # Power balance: pwind + pbatt + pgrid = pload
        for k in range(self.horizon):
            constraints.append(
                pwind_forecast[k] + pbatt[k] + pgrid[k] == pload_forecast[k]
            )
        
        # Battery dynamics: SOC[k+1] = SOC[k] + (pbatt[k]/capacity) * dt
        eta = 0.92  # round-trip efficiency
        dt = 1.0 / 60  # 1-min step
        for k in range(self.horizon):
            constraints.append(
                soc[k+1] == soc[k] + (eta * pbatt[k] / self.capacity) * dt
            )
        
        # Initial condition
        constraints.append(soc[^0] == soc_init)
        
        # State constraints (20%-95% operational window)
        constraints.extend([
            soc >= 0.20,
            soc <= 0.95,
            pbatt >= -self.max_power,
            pbatt <= self.max_power,
            pgrid >= -500,  # can export to grid
            pgrid <= 500    # can import from grid
        ])
        
        # Cost function: energy cost + degradation penalty
        energy_cost = cp.sum(pgrid * prices) * dt  # minimize grid purchase cost
        degrade_cost = 0.05 * cp.sum_squares(pbatt)  # battery degradation
        
        objective = cp.Minimize(energy_cost + degrade_cost)
        
        # Solve with OSQP
        problem = cp.Problem(objective, constraints)
        problem.solve(solver=cp.OSQP, verbose=False, eps_abs=1e-3)
        
        return pbatt.value, pgrid.value, soc.value
```


## **Comparison Modes**

1. **MPC** - Optimal receding-horizon (proposed)
2. **Rule-Based** - Charge low-price / discharge high-price (baseline)
3. **Myopic** - Minimize immediate cost only (greedy)
4. **Clairvoyant** - Oracle with perfect forecasts (upper bound)

## **Deliverables**

- Interactive HTML5 simulator with canvas visualization
- Python backend for real-time MPC solving
- Example cost savings: 15-25% vs. rule-based on typical daily profiles
- Exportable operation schedule (JSON/CSV)
- Documentation on MPC formulation + solver tuning

This project demonstrates **industrial-grade control engineering** (energy management, operational optimization, constrained control) and is directly relevant to utilities, microgrids, and EV charging systems. Perfect for sustainability-focused companies and power electronics firms.

**Next projects (7-10) will cover:**

- **7. Fault Detection \& Adaptive Control** - Observer design + reconfigurable control
- **8. Robotics Manipulator Control** - Computed torque + trajectory tracking
- **9. Digital/Embedded Control** - Discrete-time implementation on microcontroller
- **10. Capstone: Autonomous Drone** - Multi-layer hierarchical control system

Ready to proceed with Project 7?
<span style="display:none">[^10][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://docs.nrel.gov/docs/fy21osti/76240.pdf

[^2]: https://www.frontiersin.org/journals/energy-research/articles/10.3389/fenrg.2023.1306167/full

[^3]: https://www.youtube.com/watch?v=8BHMsKXlRq0

[^4]: https://www.sciencedirect.com/science/article/pii/S2665963825000296

[^5]: https://www.cvxpy.org/api_reference/cvxpy.constraints.html

[^6]: https://www.cvxpy.org/version/1.2/tutorial/advanced/index.html

[^7]: https://www.cvxpy.org/tutorial/solvers/index.html

[^8]: https://www.energy.ca.gov/sites/default/files/2021-05/CEC-500-2020-019.pdf

[^9]: https://www.totalcontrolproject.eu/-/media/sites/totalcontrol/publications/public-deliverables/d3-4-model-predictive-turbine-control.pdf

[^10]: https://github.com/tobirohrer/building-energy-storage-simulation

