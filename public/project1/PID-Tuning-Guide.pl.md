# Auto-strojenie PID: Przewodnik dla początkujących
## Jak sterować czymkolwiek (bez rozbijania się)

---

## **Problem: Dylemat Złotowłosej**

Wyobraź sobie, że prowadzisz samochód i chcesz utrzymać dokładnie **60 mph (ok. 96 km/h)**.

- **Za wolno?** Dodajesz gazu.
- **Za szybko?** Puszczasz gaz (lub hamujesz).

Ale to nigdy nie jest takie proste:
1.  **Jeśli wciśniesz za mocno:** Przyspieszysz do 80 mph (Preregulowanie) ✗
2.  **Jeśli wciśniesz za słabo:** Rozpędzanie zajmie 5 minut (Ospałość) ✗
3.  **Jeśli będziesz panikować:** Będziesz oscylować między 50 a 70 mph (Niestabilność) ✗

**Wyzwanie:** Jak osiągnąć 60 mph SZYBKO, bez przekraczania prędkości i utrzymać ją płynnie?
**Rozwiązanie:** Regulator PID.

---

## **Czym jest PID? (Matematyka, która to umożliwia)**

PID to skrót od **Proporcjonalno-Całkująco-Różniczkujący** (Proportional-Integral-Derivative). To trzej przyjaciele kłócący się o to, jak prowadzić samochód.

### **P - Proporcjonalny (Teraźniejszość)**
> *"Daleka droga przed nami! Jedź szybciej!"*

- **Logika:** `Wyjście = Kp * Błąd`
- Im większy błąd, tym mocniej naciska.
- **Problem:** Gdy zbliżasz się do celu, błąd maleje, więc przestaje naciskać *zanim* dojedziesz. Jest leniwy. Pozostawia "Uchyb ustalony".

### **I - Całkujący (Przeszłość)**
> *"Jedziemy za wolno już zbyt długo! Dociśnij!"*

- **Logika:** `Wyjście = Ki * Suma(Błędu)`
- Patrzy na *historię* błędu. Jeśli jedziesz 59 mph przez minutę, "I" irytuje się i coraz mocniej naciska gaz, aż osiągniesz 60.
- **Problem:** Tworzy pęd. Naciska tak mocno, że gdy osiągniesz 60, wciąż przyspieszasz i przelatujesz do 65.

### **D - Różniczkujący (Przyszłość)**
> *"Woah, zbliżamy się za szybko! Zwolnij!"*

- **Logika:** `Wyjście = Kd * Tempo zmian`
- Patrzy na *prędkość* korekty. Jeśli prędkościomierz szybko rośnie, "D" naciska hamulec, aby zapobiec przeregulowaniu.
- **Problem:** Jest nerwowy. Jeśli czujnik szumi, "D" wariuje.

---

## **Magia Auto-strojenia (Auto-Tuning)**

Strojenie regulatora PID (szukanie liczb dla P, I oraz D) to sztuka.
**Auto-strojenie** to robot-artysta.

### **Jak działa Ziegler-Nichols (Metoda Przekaźnikowa):**
1.  **Wyłącz PID.**
2.  **Uruchom Przekaźnik (Relay):**
    - Jeśli prędkość < 60, PEŁNY GAZ.
    - Jeśli prędkość > 60, PEŁNY HAMULEC.
3.  **Obserwuj Oscylacje:** Ponieważ pełny gaz/hamulec to ekstrema, samochód będzie oscylować (chybotać się) wokół 60 mph.
4.  **Zmierz Chybotanie:**
    - **\( T_u \)** (Okres krytyczny): Czas między szczytami.
    - **\( K_u \)** (Wzmocnienie krytyczne): Jak gwałtowne jest chybotanie.
5.  **Oblicz PID:** Na podstawie \( T_u \) i \( K_u \) algorytm podstawia znane "idealne proporcje", aby dać ci stabilny regulator.

---

## **Jak używać symulatora**

### **Krok 1: Skonfiguruj swój samochód (Proces)**
- **Wzmocnienie (K):** Jak potężny jest silnik? (Wysokie K = Samochód sportowy, Niskie K = Ciężarówka)
- **Stała Czasowa (Tau):** Jak ciężki jest samochód? (Wysokie Tau = Ciężki/Wolno reagujący)
- **Czas Martwy (Theta):** Opóźnienie między pedałem a silnikiem? (Opóźnienie "O nie")

### **Krok 2: Wybierz strategię strojenia**
- **Ziegler-Nichols:** Klasyk. Szybki, ale może nieco przeregulować.
- **Cohen-Coon:** Lepszy, jeśli samochód ma dużą "turbodziurę" (duży czas martwy).

### **Krok 3: Auto-strojenie i Jazda**
- Kliknij **"Auto-Tune & Simulate"**.
- Najpierw obserwuj **Test Przekaźnikowy** (chybotanie).
- Zobacz jak **Sterowanie PID** przejmuje kontrolę.

### **Na co zwracać uwagę (Wskaźniki)**
- **Przeregulowanie (Overshoot) %:** Czy przekroczyliśmy 60 mph? (Cel: < 10%)
- **Czas regulacji (Settling Time):** Jak długo zajęło ustabilizowanie? (Cel: Jak najszybciej)
- **Czas narastania (Rise Time):** Jak szybko wystartował?

---

## **Kluczowe wnioski na rozmowy kwalifikacyjne**

| Pojęcie | Wyjaśnienie |
|---|---|
| **Człon P** | Pcha na podstawie obecnego dystansu. Dobry, ale zostawia luki. |
| **Człon I** | Pcha na podstawie opóźnienia w czasie. Naprawia lukę/uchyb. |
| **Człon D** | Hamuje na podstawie prędkości. Zapobiega rozbiciu/przeregulowaniu. |
| **Strojenie Przekaźnikowe** | Wymuszanie oscylacji w celu zmierzenia naturalnych limitów częstotliwości systemu. |
| **Czas Martwy** | Najgorszy wróg sterowania. Opóźnienie zanim cokolwiek się stanie. |

> **Analogia:** P to kierownica, I to korekta gazu na wzniesienia, D to hamulce na zakrętach.

---

## **Spróbuj tego wyzwania**
1.  Ustaw **Czas Martwy** na **2.0s** (Ogromny lag).
2.  Wypróbuj **Ziegler-Nichols**. Czy oscyluje?
3.  Wypróbuj **Cohen-Coon**. Czy jest lepiej? (Wskazówka: Powinno być).
