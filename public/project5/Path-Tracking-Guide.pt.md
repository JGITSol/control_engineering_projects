# Rastreamento Autônomo de Trajetória: Um Guia para Iniciantes
## Não olhe para o para-choque, olhe para a estrada

---

## **O Problema: Direção Humana vs Robô**

Quando você dirige, você não olha para a faixa imediatamente na frente do seu para-choque.
Se fizesse isso, você ziguezaguearia como um louco.
**Você olha para frente.** Você vê uma curva chegando e começa a virar **antes** de atingi-la.

**Robôs são estúpidos.**
- Um controlador PID simples olha para o erro *agora*.
- "Estou 1 metro à esquerda, vire à direita!"
- Quando ele vira, está 1 metro à direita. **Oscilação.**

Para dirigir rápido e suave, foi necessário ensinar o robô a **Prever o Futuro**.

---

## **As Soluções**

### **1. O Controlador Stanley (Geométrico)**
Este é o algoritmo que venceu o **DARPA Grand Challenge** (a primeira grande corrida autônoma).
Ele usa geometria, não apenas erro.
- **Erro Transversal (Cross Track Error - e):** Distância da linha central.
- **Erro de Rumo (Heading Error - psi):** Estamos apontando para o caminho certo?
- **Correção de Velocidade:** À medida que a velocidade aumenta, o ganho cai efetivamente para evitar tremores.

> **Analogia:** "Se estou perto da linha mas apontando para fora, VIRE FORTE. Se estou longe mas apontando para ela, VIRE SUAVE."

### **2. Controle Preditivo por Modelo (MPC)**
A abordagem "Grande Mestre de Xadrez".
- **Stanley** reage ao estado atual.
- **MPC** simula 50 futuros possíveis.
    1.  E se eu virar 5 graus?
    2.  E se eu virar 10 graus?
    3.  E se eu virar -5 graus?
- Ele projeta a posição do carro 2 segundos no futuro para cada palpite.
- Ele escolhe o caminho que:
    - Fica perto da linha.
    - Não dá trancos na direção (Conforto).
    - Não excede limites físicos (Física).

---

## **Como funciona o simulador**

### **A Pista**
Uma spline gerada aleatoriamente. É seguro reiniciar (`Atualizar Página`) se a pista parecer louca.

### **Os Controladores**
- **Stanley (Azul):**
    - Veja como ele se sai nas retas. Sólido.
    - Observe as curvas. Ele pode cortar a curva ou abrir demais dependendo do ajuste.
- **MPC (Vermelho):**
    - Olhe para as **Linhas Verdes**. Esses são seus "pensamentos". Ele está pensando para onde ir.
    - Note como ele vira **antes** da curva começar. Isso é **Previsão**.

---

## **Pontos Chave para Entrevistas**

| Conceito | Explicação |
|---|---|
| **Lookahead (Horizonte)** | A distância que o controlador "vê" à frente. Curto = Nervoso. Longo = Preguiçoso/Corta curvas. |
| **Modelo Cinemático** | "Modelo de Bicicleta". Fingimos matematicamente que o carro tem 2 rodas (frente/trás) para simplificar a matemática. |
| **Controle Ótimo** | MPC encontra o caminho matematicamente perfeito, sujeito a restrições (como "Não sair da pista"). |
| **Stanley** | Lei de feedback não-linear robusta. Ótimo controle para direção normal. |

> **Mundo Real:** Tesla, Waymo e Uber, TODOS usam variações de MPC para planejamento de trajetória. É o padrão da indústria.
