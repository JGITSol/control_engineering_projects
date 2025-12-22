# Arbitraje Energético MPC: Guía para principiantes
## Comprar barato, vender caro (automáticamente)

---

## **El Problema: La Curva del Pato (The Duck Curve)**

La red eléctrica tiene un problema.
- **Tardes soleadas:** La energía solar inunda la red. Los precios caen (¡a veces a negativo!). Hay demasiada energía.
- **Noches:** El sol se pone, todos vuelven a casa, encienden TV y aire acondicionado. La demanda se dispara. Los precios suben.

Esto crea un gráfico que parece un pato.
- **La Barriga (12:00):** Precios bajos.
- **La Cabeza (19:00):** Precios altos.

Si tienes una batería, puedes ganar dinero.
1.  **Carga** cuando la energía es barata (Barriga).
2.  **Descarga (Vende)** cuando es cara (Cabeza).

¿Pero cuándo pulsar el interruptor?
Si vendes muy pronto, te pierdes el pico. Muy tarde, pierdes la oportunidad.

---

## **La Solución: MPC (Control Predictivo)**

Un controlador normal solo ve "Ahora".
**MPC** ve el "Futuro".

Pronostica precios para las próximas 24 horas y resuelve el puzzle:
*"¿Cuál es el plan de carga/descarga perfecto para todo el día para maximizar el beneficio, dadas las limitaciones de mi batería?"*

Es como jugar al ajedrez con el mercado energético.

---

## **Cómo usar el simulador**

### **1. El Escenario (Curva de Precios)**
- **Normal Day:** Típica "Curva del Pato". Mediodía barato, noche cara.
- **Negative Prices:** A veces hay tanto viento que te pagan por usar energía. MPC debería cargar como loco.
- **Volatile:** Picos locos. Difícil de predecir.

### **2. Parámetros de Batería**
- **Capacidad:** ¿Qué tan grande es tu tanque?
- **Potencia Máx:** ¿Qué tan rápido puedes llenar/vaciar?
    - *Baja potencia* significa que debes empezar a cargar antes para estar listo para la noche.

### **3. Ajuste MPC (Horizonte)**
- **Horizonte de Predicción (N):** Qué tan lejos mira.
    - **N = 6h:** Ve un poco por delante. Puede perderse el pico de la noche.
    - **N = 24h:** Ve todo el día. Planifica perfectamente.

---

## **Experimento: El Poder de la Predicción**
1.  Pon **Horizonte (N) = 1**.
    - Es ciego. Solo reacciona al precio actual.
    - Verás que compra/vende caóticamente. Poco beneficio.
2.  Pon **Horizonte (N) = 24**.
    - Es un profeta.
    - Empieza a cargar exactamente en el momento más barato.
    - Espera pacientemente con la batería llena al pico absoluto.
    - **El Beneficio** será mucho mayor.

---

## **Claves para entrevistas**

| Concepto | Explicación |
|---|---|
| **Arbitraje** | Explotar diferencias de precios. Comprar barato, vender caro. |
| **Restricciones** | La batería no puede estar < 0% o > 100%. No puedes cargar más rápido de lo que permite el cable. MPC respeta estrictamente estas reglas. |
| **Optimización** | MPC resuelve un problema matemático en cada paso de tiempo. |
| **Almacenamiento en Red** | El futuro de las renovables. Las baterías suavizan la "Curva del Pato". |
