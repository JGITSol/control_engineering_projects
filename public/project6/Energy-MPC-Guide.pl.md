# Arbitraż Energetyczny MPC: Przewodnik dla początkujących
## Kupuj tanio, sprzedawaj drogo (automatycznie)

---

## **Problem: Krzywa Kaczki (The Duck Curve)**

Sieć energetyczna ma problem.
- **Słoneczne popołudnia:** Energia słoneczna zalewa sieć. Ceny spadają (czasem do ujemnych wartości!). Jest za dużo energii.
- **Wieczory:** Słońce zachodzi, wszyscy wracają do domu, włączają TV i klimatyzację. Popyt rośnie. Ceny szybują w górę.

To tworzy wykres przypominający kaczkę.
- **Brzuch (12:00):** Niskie ceny.
- **Głowa (19:00):** Wysokie ceny.

Jeśli masz baterię, możesz na tym zarobić.
1.  **Ładuj**, gdy energia jest tania (Brzuch).
2.  **Rozładowuj (Sprzedawaj)**, gdy jest droga (Głowa).

Ale kiedy dokładnie włączyć przełącznik?
Jeśli sprzedasz za wcześnie, przegapisz szczyt cen. Jeśli za późno, przegapisz okazję.

---

## **Rozwiązanie: MPC (Model Predictive Control)**

Zwykły sterownik widzi tylko "Teraz".
**MPC (Sterowanie Predykcyjne)** widzi "Przyszłość".

Prognozuje ceny na 24 godziny do przodu i rozwiązuje zagadkę:
*"Jaki jest idealny plan ładowania/rozładowania na cały dzień, aby zmaksymalizować zysk, biorąc pod uwagę ograniczenia mojej baterii?"*

To jak gra w szachy z rynkiem energii.

---

## **Jak używać symulatora**

### **1. Scenariusz (Krzywa Cenowa)**
- **Normal Day:** Typowa "Krzywa Kaczki". Tanie południe, drogi wieczór.
- **Negative Prices:** Czasem wiatru jest tak dużo, że płacą ci za zużycie energii. MPC powinno ładować jak szalone.
- **Volatile:** Szalone skoki cen. Trudne do przewidzenia.

### **2. Parametry Baterii**
- **Pojemność (Capacity):** Jak duży jest twój magazyn?
- **Moc (Max Power):** Jak szybko możesz napełniać/opróżniać magazyn?
    - *Mała moc* oznacza, że musisz zacząć ładować wcześniej, aby zdążyć przed wieczorem.

### **3. Strojenie MPC (Horyzont)**
- **Horyzont Predykcji (N):** Jak daleko w przyszłość patrzy.
    - **N = 6h:** Widzi tylko trochę do przodu. Może przegapić wieczorny szczyt.
    - **N = 24h:** Widzi cały dzień. Planuje idealnie.

---

## **Eksperyment: Siła Przewidywania**
1.  Ustaw **Horyzont (N) = 1**.
    - Jest ślepy. Reaguje tylko na obecną cenę.
    - Zobaczysz, że kupuje/sprzedaje chaotycznie. Zarabia mało pieniędzy.
2.  Ustaw **Horyzont (N) = 24**.
    - Jest prorokiem.
    - Zaczyna ładować dokładnie w najtańszym momencie.
    - Czeka cierpliwie z pełną baterią na absolutny szczyt cenowy.
    - **Zysk** (Profit) będzie znacznie wyższy.

---

## **Kluczowe wnioski na rozmowy kwalifikacyjne**

| Pojęcie | Wyjaśnienie |
|---|---|
| **Arbitraż** | Wykorzystywanie różnic cenowych. Kupuj tanio, sprzedawaj drogo. |
| **Ograniczenia (Constraints)** | Bateria nie może mieć < 0% ani > 100%. Nie możesz ładować szybciej niż pozwala kabel. MPC twardo przestrzega tych zasad. |
| **Optymalizacja** | MPC rozwiązuje problem matematyczny (Programowanie Kwadratowe/Liniowe) w każdym kroku czasowym. |
| **Grid Storage** | Przyszłość energii odnawialnej. Baterie wygładzają "Krzywą Kaczki". |
