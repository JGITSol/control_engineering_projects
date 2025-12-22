# Seguimiento de Trayectoria Autónomo: Guía para principiantes
## No mires el parachoques, mira la carretera

---

## **El Problema: Conducción Humana vs Robot**

Cuando conduces, no miras el carril justo delante de tu parachoques.
Si lo hicieras, zigzaguearías como un loco.
**Miras hacia adelante.** Ves venir una curva, y empiezas a girar **antes** de llegar a ella.

**Los robots son tontos.**
- Un simple controlador PID mira el error *ahora mismo*.
- "¡Estoy 1 metro a la izquierda, gira a la derecha!"
- Para cuando gira, está 1 metro a la derecha. **Oscilación.**

Para conducir rápido y suave, hay que enseñar al robot a **Prever el Futuro**.

---

## **Las Soluciones**

### **1. El Controlador Stanley (Geométrico)**
Este es el algoritmo que ganó el **DARPA Grand Challenge** (la primera gran carrera autónoma).
Usa geometría, no solo error.
- **Error Transversal (Cross Track Error - e):** Distancia desde la línea central.
- **Error de Rumbo (Heading Error - psi):** ¿Estamos apuntando en la dirección correcta?
- **Corrección de Velocidad:** A medida que aumenta la velocidad, la ganancia baja efectivamente para evitar temblores.

> **Analogía:** "Si estoy cerca de la línea pero apuntando fuera, GIRA FUERTE. Si estoy lejos pero apuntando hacia ella, GIRA SUAVE."

### **2. Control Predictivo por Modelo (MPC)**
El enfoque "Gran Maestro de Ajedrez".
- **Stanley** reacciona al estado actual.
- **MPC** simula 50 futuros posibles.
    1.  ¿Qué pasa si giro 5 grados?
    2.  ¿Qué pasa si giro 10 grados?
    3.  ¿Qué pasa si giro -5 grados?
- Proyecta la posición del coche 2 segundos en el futuro para cada suposición.
- Elige el camino que:
    - Se mantiene cerca de la línea.
    - No da tirones al volante (Confort).
    - No excede los límites físicos (Física).

---

## **Cómo funciona el simulador**

### **La Pista**
Una spline generada aleatoriamente. Es seguro reiniciar (`Refrescar Página`) si la pista parece loca.

### **Los Controladores**
- **Stanley (Azul):**
    - Mira cómo se comporta en rectas. Sólido.
    - Observa las curvas. Puede cortar la esquina o abrirse dependiendo del ajuste.
- **MPC (Rojo):**
    - Mira las **Líneas Verdes**. Esos son sus "pensamientos". Está pensando a dónde ir.
    - Nota cómo gira **antes** de que empiece la curva. Eso es **Previsión**.

---

## **Claves para entrevistas**

| Concepto | Explicación |
|---|---|
| **Lookahead (Horizonte)** | La distancia que el controlador "ve" por delante. Corto = Nervioso. Largo = Perezoso/Corta curvas. |
| **Modelo Cinemático** | "Modelo de Bicicleta". Fingimos matemáticamente que el coche tiene 2 ruedas (delante/detrás) para simplificar las matemáticas. |
| **Control Óptimo** | MPC encuentra el camino matemáticamente perfecto, sujeto a restricciones (como "No salir de la pista"). |
| **Stanley** | Ley de retroalimentación no lineal robusta. Gran control para conducción normal. |

> **Mundo Real:** Tesla, Waymo y Uber usan TODOS variaciones de MPC para la planificación de trayectorias. Es el estándar de la industria.
