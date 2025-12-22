# Péndulo Invertido y LQR: Guía para principiantes
## El arte de equilibrar el caos

---

## **El Problema: El reto de la escoba**

Intenta mantener una escoba en equilibrio vertical sobre tu palma.
- Si se inclina ligeramente a la **izquierda**, debes mover tu mano a la **izquierda** (¡y rápido!) para ponerte debajo.
- Si te mueves demasiado lento, se cae.
- Si te mueves demasiado rápido, la lanzas hacia el otro lado.

Este es un **Sistema Inestable**.
- **Sistema Estable:** Una pelota en un cuenco. Si la empujas, vuelve.
- **Sistema Inestable:** Una pelota en una colina. Si la empujas, se va.

Para mantener la escoba arriba, necesitas **Control Activo** cada milisegundo.

---

## **La Estrategia de Control: LQR**

PID es genial para cosas simples (como mantener velocidad).
Pero equilibrar una escoba implica:
1.  **Posición del Carrito** (Mantenerse en la habitación)
2.  **Velocidad del Carrito** (No chocar)
3.  **Ángulo del Péndulo** (No caerse)
4.  **Velocidad Angular del Péndulo** (No girar)

PID lucha para hacer malabares con 4 cosas a la vez.
Entra **LQR (Regulador Lineal Cuadrático)**.

### **Cómo funciona LQR**
Usa una "Función de Costo" (J) matemática para decidir el movimiento perfecto.
Equilibra dos deseos codiciosos:
1.  **Costo de Estado (Q):** "Quiero que el error sea CERO."
2.  **Costo de Control (R):** "Quiero ser PEREZOSO (ahorrar energía)."

> **Analogía:**
> LQR es como un genio perezoso. Calcula el *esfuerzo mínimo exacto* necesario para mantener la escoba vertical sin correr a 100 mph.

---

## **Cómo usar el simulador**

### **1. La Física**
- **Masa del Carrito (M):** Carrito pesado = Más difícil de acelerar.
- **Longitud del Péndulo (l):** Palo largo = Cae más lento (Fácil). Palo corto = Cae al instante (Difícil).

### **2. Ajustando LQR (Q y R)**
- **Q_pos (x):** ¿Cuánto te importa quedarte en el centro?
    - Q_pos alto = Correrá de vuelta al centro (agresivo).
- **Q_angle (theta):** ¿Cuánto te importa estar vertical?
    - **CRÍTICO.** Debe ser alto, o se cae.
- **R (Costo de Control):** ¿Qué tan caro es el combustible?
    - R alto = Movimientos suaves y gentiles.
    - R bajo = Movimientos bruscos y violentos.

### **3. Experimentos**
1.  **El Controlador "Perezoso":** Pon **R = 10**. Se moverá demasiado lento y el péndulo caerá.
2.  **El Controlador "Nervioso":** Pon **R = 0.01**. Vibrará locamente para mantenerse perfectamente vertical.
3.  **La Perturbación:** Haz clic en **"Add Disturbance"**. Esto patea el carrito. Mira a LQR luchar para recuperarse.

---

## **Claves para entrevistas**

| Concepto | Explicación |
|---|---|
| **LQR** | Método de control óptimo para sistemas multivariables (MIMO). |
| **Espacio de Estados** | Representar el sistema como un vector de números (x, dx, theta, dtheta). |
| **Polos** | En Teoría de Control, "Polos Inestables" significa que el sistema explota. LQR mueve estos polos a la región estable. |
| **Función de Costo** | La fórmula matemática que LQR minimiza: `Suma(Error^2 + Esfuerzo^2)`. |

> **Mundo Real:** Los cohetes equilibrándose durante el despegue usan esta lógica. Los Segways usan esta lógica.

---

## **¿Por qué es difícil?**
Porque el sistema es **No Lineal**.
LQR asume que el mundo es lineal (simple).
- Si el ángulo se hace demasiado grande (> 20 grados), la asunción lineal falla, y LQR **se rinde**.
- Intenta poner `Initial Angle` a 45 grados. Mira cómo falla.

**Ese es el límite del Control Lineal.**
