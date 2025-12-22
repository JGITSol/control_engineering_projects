# Autonomiczne Śledzenie Toru: Przewodnik dla początkujących
## Nie patrz na zderzak, patrz na drogę

---

## **Problem: Jazda Człowieka vs Robota**

Kiedy prowadzisz samochód, nie patrzysz na pas bezpośrednio przed zderzakiem.
Gdybyś tak robił, jechałbyś zygzakiem jak szalony.
**Patrzysz przed siebie.** Widzisz nadchodzący zakręt i zaczynasz skręcać **zanim** w niego wjedziesz.

**Roboty są głupie.**
- Prosty regulator PID patrzy na błąd *w tej chwili*.
- "Jestem 1 metr po lewej, skręć w prawo!"
- Zanim skręci, jest 1 metr po prawej. **Oscylacja.**

Aby jechać szybko i płynnie, trzeba nauczyć robota **Przewidywać Przyszłość**.

---

## **Rozwiązania**

### **1. Regulator Stanley (Geometryczny)**
To algorytm, który wygrał **DARPA Grand Challenge** (pierwszy wielki wyścig autonomiczny).
Używa geometrii, a nie tylko błędu.
- **Błąd poprzeczny (Cross Track Error - e):** Odległość od linii środkowej.
- **Błąd kursu (Heading Error - psi):** Czy jesteśmy skierowani we właściwą stronę?
- **Korekta prędkości:** Wraz ze wzrostem prędkości, wzmocnienie efektywnie spada, aby zapobiec drganiom.

> **Analogia:** "Jeśli jestem blisko linii, ale skierowany na zewnątrz, SKRĘĆ MOCNO. Jeśli jestem daleko, ale skierowany w jej stronę, SKRĘĆ DELIKATNIE."

### **2. Sterowanie Predykcyjne (MPC)**
Podejście "Mistrza Szachowego".
- **Stanley** reaguje na obecny stan.
- **MPC** symuluje 50 możliwych przyszłości.
    1.  Co jeśli skręcę o 5 stopni?
    2.  Co jeśli skręcę o 10 stopni?
    3.  Co jeśli skręcę o -5 stopni?
- Projektuje pozycję samochodu na 2 sekundy w przyszłość dla każdego przypuszczenia.
- Wybiera ścieżkę, która:
    - Trzyma się blisko linii.
    - Nie szarpie kierownicą (Komfort).
    - Nie przekracza granic fizycznych (Fizyka).

---

## **Jak działa symulator**

### **Tor**
Losowo generowany splajn. Można bezpiecznie zrestartować (`Odśwież stronę`), jeśli tor wygląda szalenie.

### **Sterowniki**
- **Stanley (Niebieski):**
    - Zobacz jak radzi sobie na prostych. Solidny.
    - Obserwuj zakręty. Może ścinać zakręt lub wyjeżdżać szeroko w zależności od strojenia.
- **MPC (Czerwony):**
    - Patrz na **Zielone Linie**. To jego "myśli". Zastanawia się, gdzie jechać.
    - Zauważ, jak skręca **zanim** zacznie się zakręt. To jest **Przewidywanie**.

---

## **Kluczowe wnioski na rozmowy kwalifikacyjne**

| Pojęcie | Wyjaśnienie |
|---|---|
| **Lookahead (Horyzont predykcji)** | Dystans, który sterownik "widzi" do przodu. Krótki = Nerwowy. Długi = Leniwy/Ścinanie zakrętów. |
| **Model Kinematyczny** | "Model Roweru". Matematycznie udajemy, że samochód ma 2 koła (przód/tył), aby uprościć obliczenia. |
| **Sterowanie Optymalne** | MPC znajduje matematycznie idealną ścieżkę, z uwzględnieniem ograniczeń (np. "Nie wypadnij z toru"). |
| **Stanley** | Robusto, nieliniowe prawo sprzężenia zwrotnego. Świetne sterowanie do normalnej jazdy. |

> **Świat Rzeczywisty:** Tesla, Waymo i Uber - WSZYSCY używają wariacji MPC do planowania trajektorii. To standard przemysłowy.
