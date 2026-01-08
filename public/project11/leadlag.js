
/**
 * Lead-Lag Compensator Design
 */

// --- System Definitions ---

// Plant: G(s) = 10 / (s * (s + 2))
// Compensator: C(s) = K * (s + z) / (s + p)
// Open Loop: L(s) = C(s)G(s) = 10K(s+z) / (s(s+2)(s+p))

const state = {
    K: 10.0,
    z: 2.0,
    p: 10.0,

    // Derived metrics
    pm: 0,
    wgc: 0,
    overshoot: 0
};

// --- Math & Simulation ---

function getBodeResponse(w) {
    // Open Loop L(j*w)
    // Numerator: 10 * K * (jw + z) 
    //            = 10K*z + j*10K*w

    // Denominator: jw * (jw + 2) * (jw + p)
    //            = jw * ( -w^2 + j2w + jpw + 2p )
    //            = jw * ( (2p - w^2) + j(2w + pw) )
    //            = jw*(2p - w^2) - w(2w + pw)   <-- Note j*j = -1
    //            = -w^2(2+p) + j*w(2p - w^2)

    // Let's use polar form logic for easier Mag/Phase accumulation

    // Mag = |Num| / |Den|
    // Phase = Angle(Num) - Angle(Den)

    // Components:
    // 1. Gain 10*K: Mag=10K, Phase=0
    // 2. Zero (s+z): s=jw -> z+jw. Mag=sqrt(z^2+w^2), Phase=atan2(w, z)
    // 3. Integrator (1/s): Mag=1/w, Phase=-90 deg
    // 4. Plant Pole (s+2): 2+jw. Mag=sqrt(4+w^2), Phase=atan2(w, 2)
    // 5. Comp Pole (s+p): p+jw. Mag=sqrt(p^2+w^2), Phase=atan2(w, p)

    const magN = state.K * 10 * Math.sqrt(state.z * state.z + w * w);
    const angN = Math.atan2(w, state.z); // rad

    const magD1 = w; // Integrator
    const angD1 = Math.PI / 2; // Integrator phase is +90 in denom => -90 total

    const magD2 = Math.sqrt(4 + w * w);
    const angD2 = Math.atan2(w, 2);

    const magD3 = Math.sqrt(state.p * state.p + w * w);
    const angD3 = Math.atan2(w, state.p);

    const mag = magN / (magD1 * magD2 * magD3);
    const phaseRad = angN - (angD1 + angD2 + angD3);

    // Normalize phase to -180...180 or similar
    let phaseDeg = phaseRad * (180 / Math.PI);

    // Unwrap roughly to keep it nice - usually starts at -90 for type 1 and goes down
    while (phaseDeg > 0) phaseDeg -= 360;

    return { magdB: 20 * Math.log10(mag), phase: phaseDeg };
}

function solveStepResponse() {
    // Closed Loop T(s) = L(s) / (1 + L(s))
    // L(s) = Num_L / Den_L
    // T(s) = Num_L / (Den_L + Num_L)

    // L(s) = 10K(s+z) / ( s^3 + (2+p)s^2 + 2p*s )
    // Num_L = 10K s + 10Kz
    // Den_L = s^3 + (2+p)s^2 + 2p*s

    // T(s) Num: 10K s + 10Kz
    // T(s) Den: s^3 + (2+p)s^2 + (2p + 10K)s + 10Kz

    // State Space for simulation:
    // xdot = A x + B u
    // y    = C x + D u

    // Generic Transfer Function to SS (Control Canonical Form):
    // T(s) = (b1 s^2 + b2 s + b3) / (a0 s^3 + a1 s^2 + a2 s + a3) (normalized a0=1)

    const a1 = 2 + state.p;
    const a2 = 2 * state.p + 10 * state.K;
    const a3 = 10 * state.K * state.z;

    const b1 = 0; // s^2 coeff
    const b2 = 10 * state.K; // s coeff
    const b3 = 10 * state.K * state.z; // const coeff

    // CCF Matrices
    // x_dot = [ 0 1 0; 0 0 1; -a3 -a2 -a1 ] x + [0; 0; 1] u
    // y = [ (b3 - a3*b0) (b2 - a2*b0) (b1 - a1*b0) ] x  (assuming b0=0)
    // y = [ b3 b2 b1 ] x

    let x = [0, 0, 0];
    const dt = 0.01;
    const maxT = 5.0;
    const steps = Math.floor(maxT / dt);

    const timeData = [];
    const yData = [];
    let peakY = 0;

    for (let i = 0; i < steps; i++) {
        let t = i * dt;
        let u = 1.0; // Step input

        // Derivatives
        let x0_dot = x[1];
        let x1_dot = x[2];
        let x2_dot = -a3 * x[0] - a2 * x[1] - a1 * x[2] + u;

        // Euler integration
        x[0] += x0_dot * dt;
        x[1] += x1_dot * dt;
        x[2] += x2_dot * dt;

        // Output y = b3*x1 + b2*x2 + b1*x3 (Note: my x is 0-indexed)
        // Correct CCF output mapping for y = [b3, b2, b1] * x_vec
        // Actually, let's double check standard CCF form.
        // A = [0 1 0; 0 0 1; -a3 -a2 -a1]
        // B = [0; 0; 1]
        // C = [b3, b2, b1]

        let y = b3 * x[0] + b2 * x[1] + b1 * x[2];

        timeData.push(t);
        yData.push(y);

        if (y > peakY) peakY = y;
    }

    // Calculate Overshoot
    // Steady state should be 1.0 (since Type 1 system closed loop tracks step)
    // Let's check DC gain T(0).
    // T(0) = (10Kz) / (10Kz) = 1.
    // Yes, steady state is 1.
    let os = 0;
    if (peakY > 1.0) {
        os = (peakY - 1.0) * 100;
    }
    state.overshoot = os;

    return { t: timeData, y: yData };
}

function calculateMetrics() {
    // Find Phase Margin
    // Iterate freq to find gain crossover (Mag = 0dB)
    let w_c = 0;
    let pm = 0;

    // coarse search 0.1 to 100
    // Actually we can implement a simple bisector or linear scan
    // since magnitude is monotonic usually for simple systems, but maybe not with resonance.
    // Let's just scan

    let minMag = 100;
    let w_cross = 0.1;

    for (let w = 0.1; w < 100; w *= 1.05) {
        let res = getBodeResponse(w);
        if (Math.abs(res.magdB) < Math.abs(minMag)) {
            minMag = res.magdB;
            w_cross = w;
        }
    }

    // Refine around w_cross
    for (let w = w_cross * 0.8; w < w_cross * 1.2; w += w_cross * 0.01) {
        let res = getBodeResponse(w);
        if (Math.abs(res.magdB) < 0.1) {
            // Close enough
            w_c = w;
            pm = 180 + res.phase;
            break;
        }
    }

    // Unwrap PM
    while (pm < 0) pm += 360;
    while (pm > 360) pm -= 360; // Usually PM is between 0 and 90

    state.wgc = w_c;
    state.pm = pm;
}

// --- Charts ---

let bodeChart, stepChart;

function initCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    // Bode Chart
    const ctx1 = document.getElementById('bodeChart').getContext('2d');
    bodeChart = new Chart(ctx1, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Magnitude (dB)',
                    data: [],
                    borderColor: '#38bdf8',
                    yAxisID: 'y'
                },
                {
                    label: 'Phase (deg)',
                    data: [],
                    borderColor: '#f472b6',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'logarithmic',
                    min: 0.1,
                    max: 100,
                    grid: { color: gridColor },
                    title: { display: true, text: 'Frequency (rad/s)' }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    grid: { color: gridColor },
                    title: { display: true, text: 'Magnitude (dB)' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    min: -270,
                    max: 90,
                    grid: { drawOnChartArea: false },
                    title: { display: true, text: 'Phase (deg)' }
                }
            }
        }
    });

    // Step Chart
    const ctx2 = document.getElementById('stepChart').getContext('2d');
    stepChart = new Chart(ctx2, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Step Response',
                data: [],
                borderColor: '#22c55e',
                borderWidth: 2,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    title: { display: true, text: 'Time (s)' },
                    grid: { color: gridColor }
                },
                y: {
                    grid: { color: gridColor }
                }
            }
        }
    });
}

function updateSim() {
    // 1. Calculate Bode Data
    const freqDataMag = [];
    const freqDataPhase = [];

    for (let w = 0.1; w <= 100; w *= 1.1) {
        let res = getBodeResponse(w);
        freqDataMag.push({ x: w, y: res.magdB });
        freqDataPhase.push({ x: w, y: res.phase });
    }

    bodeChart.data.datasets[0].data = freqDataMag;
    bodeChart.data.datasets[1].data = freqDataPhase;
    bodeChart.update();

    // 2. Calculate Step Data
    const stepRes = solveStepResponse();
    const stepData = stepRes.t.map((t, i) => ({ x: t, y: stepRes.y[i] }));

    stepChart.data.datasets[0].data = stepData;
    stepChart.update();

    // 3. Metrics
    calculateMetrics();
    document.getElementById('metricPM').textContent = state.pm.toFixed(1) + '°';
    document.getElementById('metricWgc').textContent = state.wgc.toFixed(2) + ' rad/s';
    document.getElementById('metricOS').textContent = state.overshoot.toFixed(1) + '%';

    // Hint update
    const hint = document.getElementById('typeHint');
    if (Math.abs(state.z - state.p) < 0.1) hint.textContent = "Neutral";
    else if (state.z < state.p) hint.textContent = "Lead (Adds Phase)";
    else hint.textContent = "Lag (Reduces Phase)";
}

// UI Bindings
const sK = document.getElementById('sliderK');
const sZ = document.getElementById('sliderZ');
const sP = document.getElementById('sliderP');

[sK, sZ, sP].forEach(el => {
    el.addEventListener('input', () => {
        state.K = parseFloat(sK.value);
        state.z = parseFloat(sZ.value);
        state.p = parseFloat(sP.value);

        document.getElementById('valK').textContent = state.K.toFixed(1);
        document.getElementById('valZ').textContent = state.z.toFixed(1);
        document.getElementById('valP').textContent = state.p.toFixed(1);

        updateSim();
    });
});

// Init
initCharts();
updateSim();
