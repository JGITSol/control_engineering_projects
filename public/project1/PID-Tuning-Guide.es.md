# Autoajuste PID: Guía para principiantes
## Cómo controlar cualquier cosa (sin estrellarse)

---

## **El Problema: El dilema de Ricitos de Oro**

Imagina que conduces un coche y quieres mantenerte exactamente a **60 mph**.

- **¿Demasiado lento?** Pisas el acelerador.
- **¿Demasiado rápido?** Sueltas (o frenas).

Pero nunca es tan simple:
1.  **Si pisas demasiado fuerte:** Te disparas a 80 mph (Sobreimpulso) ✗
2.  **Si pisas demasiado suave:** Tardas 5 minutos en alcanzar la velocidad (Lento) ✗
3.  **Si corriges con pánico:** Oscilas entre 50 y 70 mph (Inestabilidad) ✗

**El Reto:** ¿Cómo llegamos a 60 mph RÁPIDO, sin pasarnos, y nos mantenemos ahí suavemente?
**La Solución:** El controlador PID.

---

## **¿Qué es PID? (Las matemáticas hechas posibles)**

PID significa **Proporcional-Integral-Derivativo**. Son tres amigos discutiendo sobre cómo conducir el coche.

### **P - Proporcional (El Presente)**
> *"¡Estamos lejos! ¡Ve más rápido!"*

- **Lógica:** `Salida = Kp * Error`
- Cuanto mayor es el error, más fuerte empuja.
- **Problema:** A medida que te acercas, el error se hace pequeño, así que deja de empujar *antes* de llegar. Es perezoso. Deja un "Error de estado estacionario".

### **I - Integral (El Pasado)**
> *"¡Hemos ido lento demasiado tiempo! ¡Empuja más!"*

- **Lógica:** `Salida = Ki * Suma(Error)`
- Mira la *historia* del error. Si has ido a 59 mph durante un minuto, "I" se molesta y empuja el gas cada vez más fuerte hasta que llegas a 60.
- **Problema:** Crea inercia. Empuja tan fuerte que para cuando llegas a 60, sigues acelerando y te pasas a 65.

### **D - Derivativo (El Futuro)**
> *"¡Wow, nos acercamos demasiado rápido! ¡Frena!"*

- **Lógica:** `Salida = Kd * Tasa de Cambio`
- Mira la *velocidad* de corrección. Si el velocímetro se dispara, "D" aplica los frenos para evitar pasarse.
- **Problema:** Es nervioso. Si el sensor tiene ruido, "D" se vuelve loco.

---

## **La Magia del Autoajuste**

Sintonizar un controlador PID (encontrar números para P, I y D) es un arte.
**El Autoajuste** es un robot artista.

### **Cómo funciona Ziegler-Nichols (El método del relé):**
1.  **Apagar PID.**
2.  **Iniciar Relé:**
    - Si velocidad < 60, GAS A FONDO.
    - Si velocidad > 60, FRENO A FONDO.
3.  **Observar la Oscilación:** Como gas/freno a fondo es extremo, el coche oscilará alrededor de 60 mph.
4.  **Medir la Oscilación:**
    - **\( T_u \)** (Periodo Último): Tiempo entre picos.
    - **\( K_u \)** (Ganancia Última): Cuán violenta es la oscilación.
5.  **Calcular PID:** Basado en \( T_u \) y \( K_u \), el algoritmo usa "proporciones perfectas" conocidas para darte un controlador estable.

---

## **Cómo usar el simulador**

### **Paso 1: Configura tu coche (Proceso)**
- **Ganancia (K):** ¿Qué tan potente es el motor? (K alto = Coche deportivo, K bajo = Camión)
- **Constante de Tiempo (Tau):** ¿Qué tan pesado es el coche? (Tau alto = Pesado/Lento en reaccionar)
- **Tiempo Muerto (Theta):** ¿Retraso entre pedal y motor? (El retraso "Oh no")

### **Paso 2: Elige tu estrategia de ajuste**
- **Ziegler-Nichols:** El clásico. Rápido, pero puede pasarse un poco.
- **Cohen-Coon:** Mejor si tu coche tiene mucho lag (alto tiempo muerto).

### **Paso 3: Auto-Tune y Conducir**
- Haz clic en **"Auto-Tune & Simulate"**.
- Mira el **Test de Relé** (la oscilación) primero.
- Ve cómo el **Control PID** toma el mando.

### **Qué buscar (Métricas)**
- **Sobreimpulso (Overshoot) %:** ¿Pasamos de 60 mph? (Meta: < 10%)
- **Tiempo de asentamiento (Settling Time):** ¿Cuánto tardamos en estabilizarnos? (Meta: Lo más rápido posible)
- **Tiempo de subida (Rise Time):** ¿Qué tan rápido salimos?

---

## **Claves para entrevistas**

| Concepto | Explicación |
|---|---|
| **Término P** | Empuja basado en la distancia actual. Bueno pero deja huecos. |
| **Término I** | Empuja basado en el retraso temporal. Arregla el hueco/desplazamiento. |
| **Término D** | Frena basado en la velocidad. Evita choques/pasarse. |
| **Ajuste por Relé** | Forzar oscilación para medir los límites de frecuencia natural del sistema. |
| **Tiempo Muerto** | El peor enemigo del control. El retraso antes de que pase nada. |

> **Analogía:** P es el volante, I es la corrección de gas para colinas, D son los frenos para curvas.

---

## **Prueba este reto**
1.  Pon **Tiempo Muerto** a **2.0s** (Lag enorme).
2.  Prueba **Ziegler-Nichols**. ¿Oscila?
3.  Prueba **Cohen-Coon**. ¿Es mejor? (Pista: Debería serlo).
