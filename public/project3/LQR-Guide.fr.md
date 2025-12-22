# Pendule Inversé & LQR : Guide pour débutants
## L'art d'équilibrer le chaos

---

## **Le Problème : Le défi du balai**

Essayez de tenir un balai en équilibre vertical sur votre paume.
- S'il penche légèrement à **gauche**, vous devez bouger votre main à **gauche** (et vite !) pour passer dessous.
- Si vous bougez trop lentement, il tombe.
- Si vous bougez trop vite, vous le projetez de l'autre côté.

C'est un **Système Instable**.
- **Système Stable :** Une balle dans un bol. Si vous la poussez, elle revient.
- **Système Instable :** Une balle sur une colline. Si vous la poussez, elle est partie.

Pour garder le balai en l'air, vous avez besoin d'un **Contrôle Actif** à chaque milliseconde.

---

## **La Stratégie de Contrôle : LQR**

Le PID est super pour les choses simples (comme maintenir la vitesse).
Mais équilibrer un balai implique :
1.  **Position du chariot** (Rester dans la pièce)
2.  **Vitesse du chariot** (Ne pas s'écraser)
3.  **Angle du pendule** (Ne pas tomber)
4.  **Vitesse angulaire du pendule** (Ne pas tourner)

Le PID a du mal à jongler avec 4 choses à la fois.
Entrez **LQR (Linear Quadratic Regulator)** - Régulateur Linéaire Quadratique.

### **Comment fonctionne LQR**
Il utilise une "Fonction de Coût" (J) mathématique pour décider du mouvement parfait.
Il équilibre deux désirs avides :
1.  **Coût d'État (Q) :** "Je veux que l'erreur soit ZÉRO."
2.  **Coût de Contrôle (R) :** "Je veux être PARESSEUX (économiser l'énergie)."

> **Analogie :**
> LQR est comme un génie paresseux. Il calcule l'*effort minimum exact* nécessaire pour garder le balai droit sans courir à 100 mph.

---

## **Comment utiliser le simulateur**

### **1. La Physique**
- **Masse du Chariot (M) :** Chariot lourd = Plus dur à accélérer.
- **Longueur du Pendule (l) :** Long bâton = Tombe plus lentement (Facile). Court bâton = Tombe instantanément (Difficile).

### **2. Réglage LQR (Q et R)**
- **Q_pos (x) :** À quel point voulez-vous rester au centre ?
    - Q_pos élevé = Il va foncer vers le centre (agressif).
- **Q_angle (theta) :** À quel point voulez-vous être vertical ?
    - **CRITIQUE.** Doit être élevé, sinon il tombe.
- **R (Coût de Contrôle) :** C'est cher le carburant ?
    - R élevé = Mouvements fluides, doux.
    - R bas = Mouvements saccadés, violents.

### **3. Expériences**
1.  **Le Contrôleur "Paresseux" :** Mettez **R = 10**. Il bougera trop lentement et le pendule tombera.
2.  **Le Contrôleur "Nerveux" :** Mettez **R = 0.01**. Il vibrera follement pour rester parfaitement vertical.
3.  **La Perturbation :** Cliquez sur **"Add Disturbance"**. Cela donne un coup au chariot. Regardez LQR se battre pour récupérer.

---

## **Points clés pour les entretiens**

| Concept | Explication |
|---|---|
| **LQR** | Méthode de contrôle optimale pour les systèmes multi-variables (MIMO). |
| **Espace d'État** | Représenter le système comme un vecteur de nombres (x, dx, theta, dtheta). |
| **Pôles** | En théorie du contrôle, "Pôles Instables" signifie que le système explose. LQR déplace ces pôles vers la région stable. |
| **Fonction de Coût** | La formule mathématique que LQR minimise : `Somme(Erreur^2 + Effort^2)`. |

> **Monde Réel :** Les fusées en équilibre au décollage utilisent cette logique. Les Segways utilisent cette logique.

---

## **Pourquoi est-ce difficile ?**
Parce que le système est **Non-Linéaire**.
LQR suppose que le monde est linéaire (simple).
- Si l'angle devient trop grand (> 20 deg), l'hypothèse linéaire échoue, et LQR **abandonne**.
- Essayez de mettre `Initial Angle` à 45 deg. Regardez-le échouer.

**C'est la limite du Contrôle Linéaire.**
