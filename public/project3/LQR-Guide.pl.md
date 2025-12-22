# Wahadło odwrócone i LQR: Przewodnik dla początkujących
## Sztuka balansowania chaosem

---

## **Problem: Wyzwanie z miotłą**

Spróbuj utrzymać miotłę pionowo na dłoni.
- Jeśli przechyli się lekko w **lewo**, musisz przesunąć rękę w **lewo** (i to szybko!), żeby znaleźć się pod nią.
- Jeśli zareagujesz za wolno, spadnie.
- Jeśli zareagujesz za szybko, odrzucisz ją w drugą stronę.

To jest **Układ Niestabilny**.
- **Układ Stabilny:** Piłka w misce. Jeśli ją popchniesz, wróci.
- **Układ Niestabilny:** Piłka na szczycie wzgórza. Jeśli ją popchniesz, przepadła.

Aby utrzymać miotłę w górze, potrzebujesz **Aktywnego Sterowania** w każdej milisekundzie.

---

## **Strategia Sterowania: LQR**

PID jest świetny do prostych rzeczy (jak utrzymywanie prędkości).
Ale balansowanie miotłą wymaga kontroli nad:
1.  **Pozycją wózka** (Zostań w pokoju)
2.  **Prędkością wózka** (Nie rozbij się)
3.  **Kątem wahadła** (Nie upadnij)
4.  **Prędkością kątową wahadła** (Nie wiruj)

PID ma trudności z żonglowaniem 4 rzeczami naraz.
Wchodzi **LQR (Linear Quadratic Regulator)** - Liniowy Regulator Kwadratowy.

### **Jak działa LQR**
Używa matematycznej "Funkcji Kosztu" (J), aby zdecydować o idealnym ruchu.
Balansuje dwa chciwe pragnienia:
1.  **Koszt Stanu (Q):** "Chcę, aby błąd wynosił ZERO."
2.  **Koszt Sterowania (R):** "Chcę być LENIWY (oszczędzać energię)."

> **Analogia:**
> LQR jest jak leniwy geniusz. Oblicza *dokładny minimalny wysiłek* potrzebny do utrzymania miotły w pionie bez biegania 100 km/h.

---

## **Jak używać symulatora**

### **1. Fizyka**
- **Masa wózka (M):** Ciężki wózek = Trudniej przyspieszyć.
- **Długość wahadła (l):** Długi kij = Spada wolniej (Łatwiej). Krótki kij = Spada natychmiast (Trudniej).

### **2. Strojenie LQR (Q i R)**
- **Q_pos (x):** Jak bardzo zależy ci na pozostaniu w centrum?
    - Wysokie Q_pos = Będzie pędzić z powrotem do środka (agresywnie).
- **Q_angle (theta):** Jak bardzo zależy ci na pionie?
    - **KRYTYCZNE.** Musi być wysokie, inaczej spadnie.
- **R (Koszt sterowania):** Jak drogie jest paliwo?
    - Wysokie R = Płynne, delikatne ruchy.
    - Niskie R = Szarpane, gwałtowne ruchy.

### **3. Eksperymenty**
1.  **"Leniwy" Regulator:** Ustaw **R = 10**. Będzie ruszał się za wolno i wahadło spadnie.
2.  **"Nerwowy" Regulator:** Ustaw **R = 0.01**. Będzie wibrował szaleńczo, by utrzymać idealny pion.
3.  **Zakłócenie:** Kliknij **"Add Disturbance"**. To kopnie wózek. Obserwuj jak LQR walczy, by odzyskać równowagę.

---

## **Kluczowe wnioski na rozmowy kwalifikacyjne**

| Pojęcie | Wyjaśnienie |
|---|---|
| **LQR** | Optymalna metoda sterowania dla systemów wielowymiarowych (MIMO). |
| **Przestrzeń Stanu** | Reprezentacja systemu jako wektora liczb (x, dx, theta, dtheta). |
| **Bieguny** | W teorii sterowania "Niestabilne Bieguny" oznaczają, że system wybucha. LQR przesuwa te bieguny w stabilny obszar. |
| **Funkcja Kosztu** | Wzór matematyczny, który LQR minimalizuje: `Suma(Błąd^2 + Wysiłek^2)`. |

> **Świat rzeczywisty:** Rakiety balansujące podczas startu używają tej logiki. Segwaye używają tej logiki.

---

## **Dlaczego to jest trudne?**
Ponieważ system jest **Nieliniowy**.
LQR zakłada, że świat jest liniowy (prosty).
- Jeśli kąt stanie się zbyt duży (> 20 stopni), założenie liniowości upada i LQR **poddaje się**.
- Spróbuj ustawić `Initial Angle` na 45 stopni. Zobacz jak upada.

**To jest granica Sterowania Liniowego.**
