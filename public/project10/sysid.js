
/**
 * System Identification (RLS) Sandbox
 */

// --- RLS Algorithm ---
class RLS {
    constructor(numParams, lambda) {
        this.n = numParams; // Number of parameters to estimate
        this.lambda = lambda; // Forgetting factor
        this.theta = new Array(this.n).fill(0); // Estimated parameters [a, b]

        // P matrix (Covariance), init with large diagonal
        this.P = [];
        for (let i = 0; i < this.n; i++) {
            let row = new Array(this.n).fill(0);
            row[i] = 1000;
            this.P.push(row);
        }
    }

    update(y, phi) {
        // y: scalar output
        // phi: vector (array) regressor [ -y[k-1], u[k-1] ]

        // Calculate Gain K = (P * phi) / (lambda + phi' * P * phi)
        // 1. P * phi
        let Pphi = [0, 0];
        Pphi[0] = this.P[0][0] * phi[0] + this.P[0][1] * phi[1];
        Pphi[1] = this.P[1][0] * phi[0] + this.P[1][1] * phi[1];

        // 2. phi' * P * phi + lambda
        let denom = this.lambda + (phi[0] * Pphi[0] + phi[1] * Pphi[1]);

        // 3. K
        let K = [Pphi[0] / denom, Pphi[1] / denom];

        // Prediction Error
        // y_hat = phi' * theta
        let y_hat = phi[0] * this.theta[0] + phi[1] * this.theta[1];
        let e = y - y_hat;

        // Update Theta
        // theta = theta + K * e
        this.theta[0] += K[0] * e;
        this.theta[1] += K[1] * e;

        // Update P Matrix
        // P = (P - K * phi' * P) / lambda
        // Term: K * phi' = | K0*phi0  K0*phi1 |
        //                  | K1*phi0  K1*phi1 |

        // K * (phi' * P) -> K * (P * phi)' since P is symmetric P*phi is same vector
        // cleaner: P_new = (P - K * (phi^T * P)) / lambda
        // actually standard form: P = (I - K*phi^T) * P / lambda

        // Let's do term T = K * phi^T
        let T = [
            [K[0] * phi[0], K[0] * phi[1]],
            [K[1] * phi[0], K[1] * phi[1]]
        ];

        // (I - T)
        let I_T = [
            [1 - T[0][0], -T[0][1]],
            [-T[1][0], 1 - T[1][1]]
        ];

        // New P = (I_T * P) / lambda
        let P_new = [
            [0, 0],
            [0, 0]
        ];

        P_new[0][0] = (I_T[0][0] * this.P[0][0] + I_T[0][1] * this.P[1][0]) / this.lambda;
        P_new[0][1] = (I_T[0][0] * this.P[0][1] + I_T[0][1] * this.P[1][1]) / this.lambda;
        P_new[1][0] = (I_T[1][0] * this.P[0][0] + I_T[1][1] * this.P[1][0]) / this.lambda;
        P_new[1][1] = (I_T[1][0] * this.P[0][1] + I_T[1][1] * this.P[1][1]) / this.lambda;

        this.P = P_new;

        return {
            y_hat: y_hat,
            theta: [...this.theta] // return copy
        };
    }

    reset(lambda) {
        this.lambda = lambda;
        this.theta = [0, 0];
        this.P = [[1000, 0], [0, 1000]];
    }
}

// --- Simulation State ---
const state = {
    // True Plant: y[k] = -a*y[k-1] + b*u[k-1]
    a: 0.8,
    b: 1.5,
    y: 0,
    u: 0,
    y_prev: 0,
    u_prev: 0,

    // Noise
    noiseLevel: 0.05,

    // Input
    inputType: 'prbs',
    time: 0,

    rls: new RLS(2, 0.98) // Estimating 2 params: a (actually -a in regressor usually, let's align model)
};

// Aligning model for RLS:
// y[k] = A * (-y[k-1]) + B * u[k-1]
// So theta[0] should converge to A, theta[1] to B.
// Regressor phi = [-y[k-1], u[k-1]]

// --- Charts ---
let timeChart, paramChart;
const maxPoints = 200;
const dataLabels = [];
const dataY = [];
const dataYHat = [];
const dataA = [];
const dataB = [];
const dataTrueA = [];
const dataTrueB = [];

function initCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    // Time Chart
    const ctx1 = document.getElementById('timeChart').getContext('2d');
    timeChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: dataLabels,
            datasets: [
                {
                    label: 'Actual Output (y)',
                    data: dataY,
                    borderColor: '#22c55e',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.1
                },
                {
                    label: 'Estimated (ŷ)',
                    data: dataYHat,
                    borderColor: '#f59e0b',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                x: { display: false },
                y: {
                    grid: { color: gridColor },
                    title: { display: true, text: 'Amplitude' }
                }
            }
        }
    });

    // Param Chart
    const ctx2 = document.getElementById('paramChart').getContext('2d');
    paramChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: dataLabels,
            datasets: [
                {
                    label: 'True a',
                    data: dataTrueA,
                    borderColor: 'rgba(56, 189, 248, 0.5)', // Light blue transparent
                    borderWidth: 1,
                    pointRadius: 0,
                    borderDash: [2, 2]
                },
                {
                    label: 'Est â',
                    data: dataA,
                    borderColor: '#38bdf8', // Blue
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'True b',
                    data: dataTrueB,
                    borderColor: 'rgba(244, 114, 182, 0.5)', // Pink transparent
                    borderWidth: 1,
                    pointRadius: 0,
                    borderDash: [2, 2]
                },
                {
                    label: 'Est b̂',
                    data: dataB,
                    borderColor: '#f472b6', // Pink
                    borderWidth: 2,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                x: { display: false },
                y: {
                    grid: { color: gridColor },
                    title: { display: true, text: 'Magnitude' }
                }
            }
        }
    });
}

function generateInput(t) {
    switch (state.inputType) {
        case 'step': return t > 10 ? 1.0 : 0.0;
        case 'square': return (Math.floor(t / 50) % 2 === 0) ? 1.0 : -1.0;
        case 'prbs':
            // Simple random binary
            return (Math.random() > 0.5) ? 1.0 : -1.0;
        default: return 0;
    }
}

function loop() {
    // 1. Generate Input
    state.u = generateInput(state.time);

    // 2. Simulate True Plant
    // y[k] = -a * y[k-1] + b * u[k-1] + noise
    // But we defined parameter 'a' as positive usually in UI (pole location).
    // If pole is at 0.8, then y[k] = 0.8 y[k-1]. 
    // Wait, let's stick to standard discrete form: y[k] + a1 y[k-1] = b1 u[k-1]
    // If pole is at p, then (z - p) = 0 => z = p.
    // So y[k] - p*y[k-1] = ... => y[k] = p*y[k-1] ... 
    // So coefficient is +a if 'a' is the pole.

    // True equation used: y[k] = a * y[k-1] + b * u[k-1]
    // Note: RLS model needs to match this structure.

    let noise = (Math.random() - 0.5) * 2 * state.noiseLevel;
    state.y = state.a * state.y_prev + state.b * state.u_prev + noise;

    // 3. RLS Estimation
    // Regressor phi = [ y[k-1], u[k-1] ]
    // Theta = [ a_est, b_est ]
    // Note: previous logic assumed -y[k-1]. Let's fix phi to match our plant model.
    // If model is y = a*y_prev + b*u_prev
    // Then phi = [y_prev, u_prev]

    let phi = [state.y_prev, state.u_prev];
    let res = state.rls.update(state.y, phi); // Recursive Update

    // 4. Store Data
    dataLabels.push(state.time);
    dataY.push(state.y);
    dataYHat.push(res.y_hat); // This is 'a priori' or 'a posteriori'? update returns updated theta, let's use posteriori estimate if we want clean
    // Actually standard RLS output is usually prediction error based. 
    // But let's plot what the model *thinks* y is given past data.

    dataA.push(res.theta[0]);
    dataB.push(res.theta[1]);
    dataTrueA.push(state.a);
    dataTrueB.push(state.b);

    if (dataLabels.length > maxPoints) {
        dataLabels.shift();
        dataY.shift();
        dataYHat.shift();
        dataA.shift();
        dataB.shift();
        dataTrueA.shift();
        dataTrueB.shift();
    }

    // 5. Update State
    state.y_prev = state.y;
    state.u_prev = state.u;
    state.time++;

    // 6. Update UI
    document.getElementById('dispA').textContent = res.theta[0].toFixed(3);
    document.getElementById('dispB').textContent = res.theta[1].toFixed(3);

    // 7. Update Charts (every 2 frames for performance)
    if (state.time % 2 === 0) {
        timeChart.update();
        paramChart.update();
    }
}

// --- UI Binding ---
document.getElementById('sliderA').addEventListener('input', e => {
    state.a = parseFloat(e.target.value);
    document.getElementById('valA').textContent = state.a.toFixed(2);
});
document.getElementById('sliderB').addEventListener('input', e => {
    state.b = parseFloat(e.target.value);
    document.getElementById('valB').textContent = state.b.toFixed(1);
});
document.getElementById('sliderNoise').addEventListener('input', e => {
    state.noiseLevel = parseFloat(e.target.value);
    document.getElementById('valNoise').textContent = state.noiseLevel.toFixed(2);
});
document.getElementById('sliderLambda').addEventListener('input', e => {
    let l = parseFloat(e.target.value);
    state.rls.lambda = l;
    document.getElementById('valLambda').textContent = l.toFixed(3);
});
document.getElementById('selectInput').addEventListener('change', e => {
    state.inputType = e.target.value;
});
document.getElementById('btnReset').addEventListener('click', () => {
    state.time = 0;
    state.y = 0; state.y_prev = 0;
    state.u = 0; state.u_prev = 0;
    dataLabels.length = 0; dataY.length = 0; dataYHat.length = 0;
    dataA.length = 0; dataB.length = 0;
    dataTrueA.length = 0; dataTrueB.length = 0;

    // Reset RLS
    state.rls.reset(parseFloat(document.getElementById('sliderLambda').value));
});

// Start
initCharts();
setInterval(loop, 50); // 20Hz
