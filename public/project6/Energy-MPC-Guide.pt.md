# Arbitragem de Energia MPC: Um Guia para Iniciantes
## Compre barato, venda caro (automaticamente)

---

## **O Problema: A Curva do Pato (The Duck Curve)**

A rede elétrica tem um problema.
- **Tardes ensolaradas:** Energia solar inunda a rede. Preços caem (às vezes para negativo!). Muita energia.
- **Noites:** O sol se põe, todos vão para casa, ligam TV e ar condicionado. A demanda dispara. Preços sobem.

Isso cria um gráfico que parece um pato.
- **A Barriga (12:00):** Preços baixos.
- **A Cabeça (19:00):** Preços altos.

Se você tem uma bateria, pode ganhar dinheiro.
1.  **Carregue** quando a energia for barata (Barriga).
2.  **Descarregue (Venda)** quando for cara (Cabeça).

Mas quando apertar o interruptor?
Se vender muito cedo, perde o pico. Muito tarde, perde a chance.

---

## **A Solução: MPC (Controle Preditivo)**

Um controlador normal vê apenas "Agora".
**MPC** vê o "Futuro".

Ele prevê preços para as próximas 24 horas e resolve o quebra-cabeça:
*"Qual é o plano perfeito de carga/descarga para o dia todo para maximizar o lucro, dadas as limitações da minha bateria?"*

É como jogar xadrez com o mercado de energia.

---

## **Como usar o simulador**

### **1. O Cenário (Curva de Preço)**
- **Normal Day:** Típica "Curva do Pato". Meio-dia barato, noite cara.
- **Negative Prices:** Às vezes há tanto vento que te pagam para usar energia. MPC deve carregar como louco.
- **Volatile:** Picos loucos. Difícil de prever.

### **2. Parâmetros da Bateria**
- **Capacidade:** Quão grande é o seu tanque?
- **Potência Máx:** Quão rápido você pode encher/esvaziar?
    - *Baixa potência* significa que você deve começar a carregar mais cedo para estar pronto à noite.

### **3. Ajuste MPC (Horizonte)**
- **Horizonte de Predição (N):** Quão longe ele olha.
    - **N = 6h:** Vê apenas um pouco à frente. Pode perder o pico da noite.
    - **N = 24h:** Vê o dia todo. Planeja perfeitamente.

---

## **Experimento: O Poder da Previsão**
1.  Defina **Horizonte (N) = 1**.
    - Ele é cego. Reage apenas ao preço atual.
    - Você verá que ele compra/venda caoticamente. Pouco lucro.
2.  Defina **Horizonte (N) = 24**.
    - Ele é um profeta.
    - Começa a carregar exatamente no momento mais barato.
    - Espera pacientemente com a bateria cheia pelo pico absoluto.
    - **O Lucro** será muito maior.

---

## **Pontos Chave para Entrevistas**

| Conceito | Explicação |
|---|---|
| **Arbitragem** | Explorar diferenças de preços. Comprar barato, vender caro. |
| **Restrições** | Bateria não pode ser < 0% ou > 100%. Não pode carregar mais rápido que o cabo permite. MPC obedece estritamente essas regras. |
| **Otimização** | MPC resolve um problema matemático a cada passo de tempo. |
| **Armazenamento na Rede** | O futuro das renováveis. Baterias suavizam a "Curva do Pato". |
