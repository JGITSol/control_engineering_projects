# Arbitrage Énergétique MPC : Guide pour débutants
## Acheter bas, vendre haut (automatiquement)

---

## **Le Problème : La courbe du canard (The Duck Curve)**

Le réseau électrique a un problème.
- **Après-midi ensoleillés :** Le solaire inonde le réseau. Les prix chutent (parfois en négatif !). Trop d'énergie.
- **Soirées :** Le soleil se couche, tout le monde rentre, allume la télé et la clim. La demande explose. Les prix s'envolent.

Cela crée un graphique qui ressemble à un canard.
- **Le Ventre (12h00) :** Prix bas.
- **La Tête (19h00) :** Prix élevés.

Si vous avez une batterie, vous pouvez gagner de l'argent.
1.  **Chargez** quand l'énergie est bon marché (Ventre).
2.  **Déchargez (Vendez)** quand elle est chère (Tête).

Mais quand appuyer sur l'interrupteur ?
Si vous vendez trop tôt, vous ratez le pic. Trop tard, vous ratez l'occasion.

---

## **La Solution : MPC (Commande Prédictive)**

Un contrôleur normal voit seulement "Maintenant".
**MPC** voit le "Futur".

Il prédit les prix pour les 24 prochaines heures et résout le puzzle :
*"Quel est le plan de charge/décharge parfait pour toute la journée pour maximiser le profit, compte tenu des limites de ma batterie ?"*

C'est comme jouer aux échecs avec le marché de l'énergie.

---

## **Comment utiliser le simulateur**

### **1. Le Scénario (Courbe de Prix)**
- **Normal Day :** Typique "Courbe du Canard". Midi pas cher, soir cher.
- **Negative Prices :** Parfois il y a tellement de vent qu'on vous paie pour consommer. MPC devrait charger comme un fou.
- **Volatile :** Des pics fous. Difficile à prédire.

### **2. Paramètres de Batterie**
- **Capacité :** Quelle taille a votre réservoir ?
- **Puissance Max :** À quelle vitesse pouvez-vous remplir/vider ?
    - *Faible puissance* signifie que vous devez commencer à charger plus tôt pour être prêt le soir.

### **3. Réglage MPC (Horizon)**
- **Horizon de Prédiction (N) :** Jusqu'où il regarde.
    - **N = 6h :** Voit juste un peu devant. Peut rater le pic du soir.
    - **N = 24h :** Voit toute la journée. Planifie parfaitement.

---

## **Expérience : Le Pouvoir de la Prédiction**
1.  Réglez **Horizon (N) = 1**.
    - Il est aveugle. Réagit juste au prix actuel.
    - Vous verrez qu'il achète/vend de façon chaotique. Faible profit.
2.  Réglez **Horizon (N) = 24**.
    - C'est un prophète.
    - Il commence à charger exactement au moment le moins cher.
    - Il attend patiemment avec une batterie pleine le pic absolu.
    - **Le Profit** sera beaucoup plus élevé.

---

## **Points clés pour les entretiens**

| Concept | Explication |
|---|---|
| **Arbitrage** | Exploiter les différences de prix. Acheter bas, vendre haut. |
| **Contraintes** | La batterie ne peut être < 0% ou > 100%. Impossible de charger plus vite que le câble ne le permet. MPC respecte strictement ces règles. |
| **Optimisation** | MPC résout un problème mathématique à chaque pas de temps. |
| **Stockage Réseau** | L'avenir des renouvelables. Les batteries lissent la "Courbe du Canard". |
