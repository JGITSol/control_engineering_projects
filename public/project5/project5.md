<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# project5

Project 5 is an open‑source **Autonomous Vehicle Lateral Control Lab**: a 2D simulator with a kinematic bicycle model, Stanley lateral controller, and an MPC-based path follower to compare classical and optimal controllers for lane keeping and trajectory tracking [^1][^2][^3][^4][^5].

## Project scope

- Implement a **kinematic bicycle model** (vehicle state: $x, y, \psi, v$) with realistic steering and curvature limits for highway‑style motion. [^6][^7]
- Support importing **waypoints or centerlines** and generating smooth reference paths (splines or clothoids) plus curvature profiles. [^6][^7]
- Provide two lateral controllers:
    - **Stanley controller** for geometric path tracking based on lateral and heading error [^1][^8][^4].
    - **MPC lateral controller** that optimizes steering over a finite horizon subject to constraints [^2][^6][^9].


## Control features

- Stanley implementation with configurable gain, look‑ahead, and speed adaptation, following the standard formula using lateral error, heading error, and velocity‑dependent correction [^1][^8][^4][^5].
- MPC based on a linearized bicycle model in discrete time, solved with an open‑source QP/optimizer (e.g., OSQP, cvxpy) to minimize lateral deviation, heading error, and steering effort under bounds on steering angle and rate [^2][^10][^11].
- Optional **hybrid strategy** (feedforward curvature + Stanley/MPC feedback), reflecting current research where MPC and Stanley are combined in layered architectures [^12][^13][^14].


## Simulator \& visualization

- 2D scene showing lane markings, vehicle footprint, and trajectory traces for reference vs actual path. [^6][^15]
- Plots of key signals: lateral error vs time, heading error, steering angle, and curvature. [^16][^6]
- Scenario presets: straight lane, constant‑radius curve, S‑curve, lane‑change trajectory; each scenario can be replayed with both controllers for side‑by‑side comparison. [^17][^9]


## Evaluation metrics

- Compute tracking metrics: RMS lateral error, maximum deviation, and cross‑track error distribution, plus yaw/heading error statistics [^16][^3].
- Evaluate comfort and feasibility via steering rate, curvature, and violation counts of constraints (e.g., max steering, lane boundaries) [^16][^6].
- Export run summaries (JSON/CSV) so results can be used in Jupyter for deeper analysis or comparison across tuning configurations. [^2][^11]


## Tech stack (open source only)

- Core dynamics and controllers in **Python** (NumPy, SciPy) or **TypeScript** for browser‑only implementation. [^2][^11]
- Optimization via **cvxpy+OSQP** or a lightweight custom QP for real‑time MPC. [^2][^11]
- Frontend visualization with HTML5 canvas or a minimal web framework, mirroring your previous PID and MIMO tools for a consistent portfolio.
<span style="display:none">[^18][^19][^20]</span>

<div align="center">⁂</div>

[^1]: https://www.mathworks.com/help/driving/ref/lateralcontrollerstanley.html

[^2]: https://github.com/yahsiuhsieh/model-predictive-control

[^3]: https://github.com/nazringr/Path-Tracking-Control-of-an-Autonomous-Vehicle-using-Model-Predictive-Control-and-PID-Controller

[^4]: https://github.com/qiaoxu123/Self-Driving-Cars/blob/master/Part1-Introduction_to_Self-Driving_Cars/Module6-Vehicle_Lateral_Control/module-6-vehicle-lateral-control.md

[^5]: https://github.com/winstxnhdw/FullStanleyController

[^6]: https://ww2.mathworks.cn/matlabcentral/fileexchange/84320-vehicle-path-tracking-using-model-predictive-control-mpc?s_tid=FX_rc2_behav

[^7]: https://forces.embotech.com/documentation/examples/high_level_path_tracking_legacy/index.html

[^8]: https://ai.stanford.edu/~gabeh/papers/hoffmann_stanley_control07.pdf

[^9]: https://www.mathworks.com/help/mpc/ug/lane-keeping-assist-system-using-model-predictive-control.html

[^10]: https://github.com/VenkatNarayanan11/Autonomous_Lane_keeping_using_Model_predictive_control

[^11]: https://github.com/mcarfagno/mpc_python

[^12]: https://www.nature.com/articles/s41598-024-69858-7

[^13]: https://arxiv.org/html/2408.15152v1

[^14]: https://journals.sagepub.com/doi/pdf/10.1177/00202940231165257

[^15]: https://www.youtube.com/watch?v=SzEg_C-XJ14

[^16]: https://www.sciencedirect.com/science/article/pii/S1367578823000743

[^17]: https://arxiv.org/html/2403.19633v1

[^18]: https://www.youtube.com/watch?v=FHQFya0-JBs

[^19]: https://academic.oup.com/jcde/advance-article/doi/10.1093/jcde/qwaf107/8292657

[^20]: https://github.com/sumukhpatil/Model-Predictive-Controller

