# Suivi de Trajectoire Autonome : Guide pour débutants
## Ne regardez pas le pare-chocs, regardez la route

---

## **Le Problème : Conduite Humaine vs Robot**

Quand vous conduisez, vous ne regardez pas la voie juste devant votre pare-chocs.
Si vous le faisiez, vous zigzagueriez comme un fou.
**Vous regardez devant.** Vous voyez un virage arriver, et vous commencez à tourner **avant** de l'atteindre.

**Les robots sont stupides.**
- Un simple contrôleur PID regarde l'erreur *maintenant*.
- "Je suis à 1 mètre à gauche, tourne à droite !"
- Le temps qu'il tourne, il est à 1 mètre à droite. **Oscillation.**

Pour conduire vite et en douceur, il faut apprendre au robot à **Prévoir le Futur**.

---

## **Les Solutions**

### **1. Le Contrôleur Stanley (Géométrique)**
C'est l'algorithme qui a gagné le **DARPA Grand Challenge** (la première grande course autonome).
Il utilise la géométrie, pas juste l'erreur.
- **Erreur de Trajectoire (Cross Track Error - e) :** Distance de la ligne centrale.
- **Erreur de Cap (Heading Error - psi) :** Pointons-nous dans la bonne direction ?
- **Correction de Vitesse :** À mesure que la vitesse augmente, le gain diminue effectivement pour éviter de trembler.

> **Analogie :** "Si je suis près de la ligne mais que je pointe ailleurs, TOURNE FORT. Si je suis loin mais que je pointe vers elle, TOURNE DOUCEMENT."

### **2. Commande Prédictive (MPC)**
L'approche "Grand Maître d'Échecs".
- **Stanley** réagit à l'état actuel.
- **MPC** simule 50 futurs possibles.
    1.  Et si je tourne de 5 degrés ?
    2.  Et si je tourne de 10 degrés ?
    3.  Et si je tourne de -5 degrés ?
- Il projette la position de la voiture 2 secondes dans le futur pour chaque hypothèse.
- Il choisit le chemin qui :
    - Reste près de la ligne.
    - Ne donne pas d'à-coups (Confort).
    - Ne dépasse pas les limites physiques (Physique).

---

## **Comment fonctionne le simulateur**

### **La Piste**
Une spline générée aléatoirement. Vous pouvez redémarrer (`Actualiser la page`) sans risque si la piste semble folle.

### **Les Contrôleurs**
- **Stanley (Bleu) :**
    - Regardez comment il performe sur les lignes droites. Solide.
    - Observez les virages. Il peut couper la corde ou s'élargir selon le réglage.
- **MPC (Rouge) :**
    - Regardez les **Lignes Vertes**. Ce sont ses "pensées". Il réfléchit où aller.
    - Remarquez comment il tourne **avant** le début du virage. C'est la **Prévision**.

---

## **Points clés pour les entretiens**

| Concept | Explication |
|---|---|
| **Lookahead (Horizon de prévision)** | La distance que le contrôleur "voit" devant. Court = Nerveux. Long = Paresseux/Coupe les virages. |
| **Modèle Cinématique** | "Modèle Bicyclette". On fait semblant mathématiquement que la voiture a 2 roues (avant/arrière) pour simplifier les calculs. |
| **Contrôle Optimal** | MPC trouve le chemin mathématiquement parfait, sous contraintes (comme "Ne pas sortir de la piste"). |
| **Stanley** | Loi de rétroaction non-linéaire robuste. Super contrôle pour la conduite normale. |

> **Monde Réel :** Tesla, Waymo et Uber utilisent TOUS des variations de MPC pour la planification de trajectoire. C'est le standard de l'industrie.
