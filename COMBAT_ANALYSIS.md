# Analyse approfondie des règles de combat Mage Knight
## vs. Implémentation actuelle dans l'app

**Date**: 2026-05-02  
**Statut**: Analyse en cours des règles complètes (pages 1-20 du PDF)

---

## I. PHASES D'UN TOUR DE JEU

### Selon les règles (p.4-5):
1. **Une Manche** = jour OU nuit (distinct d'un Tour de jeu)
2. **Un Tour Normal** se compose de deux étapes:
   - Mouvement (optionnel)
   - Action (optionnel)

### Implémentation app:
- ❌ **Pas d'implémentation du concept de Manche (jour/nuit)**
- ❌ **Pas de gestion du Mouvement** (déplacement sur plateau)
- ✓ **Combat traité isolément** (ne représente qu'une partie du "Tour")
- ❌ **Pas de distinction "jour vs nuit"** pour les effets spéciaux

**PROBLÈME CRITIQUE**: L'app gère le combat en isolation. Manquent:
- Le système de Mouvement
- La phase Action/Tactique
- Le contexte de la Manche (jour/nuit)

---

## II. SYSTÈME DE COMBAT

### Selon les règles (p.8-10):

#### Phase d'Attaque (à Distance ET de Siège):
```
L'attaquant lance une ou plusieurs Attaques:
- Attaque à Distance: utilise les cartes de type "Distance"
- Attaque de Siège: utilise les cartes de type "Siège"
- Une Attaque peut combiner plusieurs cartes
- Chaque Attaque a une VALEUR TOTALE (somme des Valeurs)
- Types d'Attaque: Physique, Feu, Glace, Feu Glacé
```

#### Phase de Parade:
```
Le défenseur (Ennemi ou autre joueur) bloque l'Attaque avec:
- Cartes Blessure (valeur = capacité à bloquer)
- Cartes de Parade spécifiques
- Unités avec capacité de défense

Si Valeur Défense ≥ Valeur Attaque → Attaque bloquée
Sinon → Dégâts non-bloqués = Valeur Attaque - Valeur Défense
```

#### Phase d'Assignation des Dégâts:
```
Les dégâts non-bloqués s'appliquent à l'ennemi:
- Dégâts Physiques: assignés à l'Armure
- Dégâts Feu/Glace: appliqués selon les Résistances
- Si Armure insuffisante → Blessures au personnage
```

### Implémentation app (combatAnalysis.js):

#### ✓ Points forts:
1. **Types d'Attaque**: Implémente Physical, Fire, Ice, ColdFire
2. **Calcul basicValue + poweredValue**: ✓ Correct
3. **Résistances**: Détectées, dégâts ÷2 ✓
4. **Immunités**: Détectées, dégâts = 0 ✓
5. **Mode de cartes**: normal, powered, tilt_attack, tilt_block ✓

#### ❌ Points manquants/incomplets:

**1. Distinction Attaque Distance vs Siège**
```
Règle: Les Attaques à Distance ET les Attaques de Siège doivent être 
       traitées différemment (valeurs, modificateurs, etc.)

App: Pas de distinction explicite entre Distance et Siège
     Les cartes n'ont qu'un type, pas de classification Distance/Siège
```
**Impact**: Modération/bonus spécifiques à Distance ou Siège non appliquées

**2. Capacités spéciales des Ennemis**
```
Règles (p.20): Les ennemis ont des "Capacités" qui affectent le combat:
- Brutal: Dégâts doublés (×2)
- Rapide: L'ennemi peut agir avant le joueur
- Armé: L'ennemi a une valeur d'Armure additionnelle
- Résistance au Feu/Glace: Moitié des dégâts
- Immunité: 0 dégâts

Chaque ennemi a une liste de capacités qui changent les règles du combat.

App: Les capacités sont listées, mais PAS appliquées dans les calculs
     Exemple: Ennemi avec "Brutal" → ses dégâts devraient ×2
              mais le code ne le fait pas
```
**Impact CRITIQUE**: Combat calculé incorrectement pour les ennemis avec capacités

**3. Dégâts et Blessures**
```
Règles: 
- Armure (défense): absorbe les dégâts jusqu'à sa valeur max
- Blessure (malus): dépassement de l'Armure
- Valeur de Blessure: chaque Blessure supplémentaire = malus cumulatif

App:
- ✓ Calcule si ennemi meurt (dégâts ≥ armure + blessures existantes)
- ✓ Affiche les blessures totales
- ❌ Ne calcule PAS les Blessures au joueur (seulement à l'ennemi)
- ❌ Pas de système de Soins ou de récupération de Blessures
```

**4. Positions des Ennemis**
```
Règles: Les ennemis sont placés à certaines distances:
- Forteresse: doit traverser les défenses (Parades spéciales)
- En Terrain ouvert: attaque directe possible
- Monasteré: certaines Unités seules, autres bloquées

App: Aucune gestion de la position/placement de l'ennemi
     Attaque directe supposée, pas de contraintes de terrain
```

**5. Blessures du Joueur**
```
Règles: Un Héros blesse peut:
- Perdre des points de Compétence
- Bénéficier de Soins (Cartes Blessure, Unités)
- Modifier ses capacités au tour suivant

App: Aucune gestion des Blessures du Héros (joueur)
     Le système est centré sur les Dégâts de l'ennemi uniquement
```

---

## III. RÉSISTANCES ET IMMUNITÉS

### Selon les règles (p.20 - Résumé):

```
Résistance Physique: Les Attaques Physiques infligent la moitié des dégâts
Résistance au Feu: Les Attaques Feu infligent la moitié des dégâts
Résistance à la Glace: Les Attaques Glace infligent la moitié des dégâts
Résistance Feu à la Glace: Les Attaques Feu Glacé (combo) infligent la moitié

Immunité: L'ennemi est totalement immunisé à ce type d'Attaque (0 dégâts)
```

### Implémentation app:
```javascript
// combatAnalysis.js
if (selectedEnemy.immunities?.includes(typeBase)) return 'immune' // 0
if (selectedEnemy.resistances?.includes(typeBase)) return 'half'  // ÷2
```

✓ **Correctement implémenté** pour les types simples (Physical, Fire, Ice)

❌ **Manque**: ColdFire (Feu Glacé = combo Feu + Glace)
   - Doit vérifier BOTH Fire AND Ice dans resistances
   - Actuellement traité comme un seul type

---

## IV. TYPES DE PARADES ET BLOCAGE

### Selon les règles:
```
Types de Parade:
- Parade Physique: bloque les Attaques Physiques
- Parade Feu: bloque les Attaques Feu
- Parade Glace: bloque les Attaques Glace
- Parade Feu Glacé: bloque les Attaques Feu Glacé

Chaque Parade a une valeur qui détermine combien de dégâts elle bloque.
Les Parades incompatibles avec le type d'Attaque ne bloquent rien.
```

### Implémentation app:

**Cartes joueur** (basicLabel/poweredLabel):
- Attaque Physique, Attaque Feu, Attaque Glace
- Parade Physique, Parade Feu, Parade Glace
- Attaque Feu Glacé, Parade Feu Glacé (?)

✓ **Structure existe**

❌ **Problème**: Pas de logique de compatibilité Attaque/Parade
```javascript
// Ce qui devrait exister:
if (attackType === 'Fire' && defenseType === 'Fire') {
  return 'full_block' // Parade Feu bloque entièrement Attaque Feu
}
if (attackType === 'Fire' && defenseType === 'Physical') {
  return 'no_block' // Parade Physique ne bloque PAS Attaque Feu
}
```

Actuellement, le code suppose que toute défense bloque toute attaque (incorrect).

---

## V. CARTES TACTIQUE ET ACTION AVANCÉE

### Selon les règles (p.4):
```
Offre d'Actions Avancées: Un ensemble de cartes qui proposent:
- Cartes Tactique: Actions spéciales (une seule par tour, max)
- Cartes Blessure: Soins ou blocage
- Cartes de Description de sites: Info supplémentaires

Chaque tour, le joueur choisit UNE carte parmi les Cartes Tactique proposées.
```

### Implémentation app:
❌ **Zéro implémentation**
- Pas de concept de Cartes Tactique
- Pas d'Offre d'Actions Avancées
- Les cartes du Deck sont uniquement des cartes combat

---

## VI. UNITÉS ET COMPÉTENCES

### Selon les règles (p.4-5, p.7):
```
Unités: Artefacts, Blessures, Sorts (3 types)
- Unités Régulières: pioches en début de Manche
- Unités d'Élite: pioches rares, plus puissantes
- Unités Emmêlées: obtenues via Compétence

Compétences: Chaque Héros a 10 Compétences:
- 6 Compétences de base (une par couleur de Mana)
- 4 Compétences spécialisées (selon le Héros)

Les Compétences sont "empilées" et gagnent des niveaux.
```

### Implémentation app:
❌ **Zéro implémentation**
- Pas de système d'Unités (Artefacts, Blessures, Sorts)
- Pas de gestion des Compétences et de leurs niveaux
- Pas d'empilage de Compétences
- Pas de distinction Compétences de base vs spécialisées

---

## VII. MANA ET OFFRE

### Selon les règles (p.3-4):
```
4 couleurs fondamentales de Mana:
- Mana Rouge (Attaque)
- Mana Bleu (Défense/Glace)
- Mana Vert (Nature/Soin)
- Mana Blanc (Magie)

Offre de Sortes: Propose une liste de cartes que le joueur peut acheter/utiliser
Offre de Compétences: Propose les Compétences disponibles

Chaque tour, l'Offre se remanieuse (certaines cartes disparaissent, d'autres arrivent).
```

### Implémentation app:
✓ **Couleurs de cartes**: Red, Blue, Green, White, Purple, Gold (plus que les 4 basiques)
❌ **Pas de concept d'Offre** (les cartes viennent du Deck, pas d'une Offre)
❌ **Pas de concept de Mana** (au sens des mécaniques de Mage Knight)
❌ **Pas de remanieuge d'Offre** entre les tours

---

## VIII. BLESSURES ET SOINS

### Selon les règles (p.10):
```
Lorsqu'un Héros est Blesse: le joueur prend une (ou plusieurs) cartes 
de la poche Blessures et (les lui) ajoute à sa main.

Les cartes Blessure peuvent:
- Être utilisées pour bloquer une Attaque (valeur de Défense)
- Être conservées (et héritées par le Héros au tour suivant)
- Être soignées via certaines Compétences ou Unités

Les Unités Blessées (Artifacts, etc.) ne peuvent pas être réactivées 
jusqu'à ce qu'elles soient soignées.
```

### Implémentation app:
❌ **Complètement absent**
- Pas de cartes Blessure dans le Deck
- Pas de Soins
- Pas d'impact des Blessures sur les cartes suivantes
- Pas de distinction "Unité Blessée" vs "Unie Saine"

---

## IX. INTERACTIONS AVEC LES HABITANTS

### Selon les règles (p.7):
```
Chaque Cité a ses Habitants:
- Chaque Habitant demande un nombre d'Influence défini
- L'Influence est gagnée via certaines cartes
- Recruter un Habitant offre une récompense (Compétence, Mana, etc.)

Types d'Interactions:
- Recruter (Influence)
- Acheter (Mana)
- Placer (sur le plateau)
```

### Implémentation app:
❌ **Zéro implémentation**
- Pas de concept d'Influence
- Pas d'Habitants
- Pas de Cités
- Pas d'interactions Mana/Compétence

---

## X. SCÉNARIOS ET VARIANTES

### Selon les règles (p.12-16 + p.14-18):

**Scénarios principaux**:
1. **La Mission de Reconnaissance**: Durée 3 Manches (2 j + 1 nuit)
2. **Conquête Totale**: Durée 6 Manches (tous les Cités conquis)
3. **Conquête Éclair**: Durée 4 Manches (2 j + 2 nuits)
4. **Coopération Totale**: 2-3 joueurs, durée 6 Manches
5. **Libération des Mines**: Durée 4 Manches (2 j + 2 nuits)
6. **Et 10+ autres scénarios...** (voir pages 15-18)

**Variantes**:
- Solo vs Équipes
- Niveaux de Difficulté
- Plateforme ouvert vs limité

### Implémentation app:
✓ **Liste de scénarios existe** (src/data/scenarios.ts)
✓ **Sélection de scénario possible** (GameSetupPage)
❌ **Mais**: Aucune mécanique de scénario n'est implémentée
   - Pas de durée variable (Manches)
   - Pas de conditions de victoire/défaite
   - Pas de règles spéciales du scénario
   - Pas de variantes

---

## XI. SYSTÈME DE SCORE ET VICTOIRE

### Selon les règles (p.10-11, résumé p.20):

```
Conclusion du Combat:
1. Si le joueur a réussi à vaincre l'ennemi: Victoire
   - Gagne de la Gloire (selon la difficulté de l'ennemi)
   - Peut gagner du Trésor/Artefacts
   - Peut gagner une Compétence

2. Si le joueur n'a pas réussi: Défaite
   - Prend des Blessures (selon les dégâts non-bloqués)
   - Perd de la Réputation (si retraite)
   - Peut être forcé de se retirer

Fin de la Manche:
- Fin du Jour: Passer au jour suivant ou à la Nuit
- Fin du Scénario: Calculer le score final (Gloire, Réputation, etc.)
```

### Implémentation app:
✓ **Affiche verdict**: Victoire/Défaite (VerdictBanner)
❌ **Mais**: Aucun système de Gloire, Réputation, Trésor
   - Combat isolé, pas de contexte de Manche/Scénario
   - Pas de récompenses (Gloire, Artefacts, Compétences)
   - Pas de système de score final
   - Pas de résumé de fin de Manche

---

## RÉSUMÉ EXÉCUTIF

### ✓ Correctement implémenté:
1. ✓ Sélection d'ennemi et affichage des stats
2. ✓ Sélection de cartes et construction de main
3. ✓ Calcul des dégâts (basicValue + poweredValue)
4. ✓ Détection des Résistances et Immunités
5. ✓ Modes de cartes (normal, powered, tilt_attack, tilt_block)
6. ✓ Verdict de combat (Victoire/Défaite)
7. ✓ Affichage des contributions par carte

### ❌ Gravement incomplet ou absent:

**Système de Jeu Complet**:
- [ ] Concept de Manche (jour/nuit) → pas de contexte
- [ ] Phase de Mouvement → zéro implémentation
- [ ] Offres (Cartes Tactique, Unités, Compétences) → zéro
- [ ] Unités (Artefacts, Blessures, Sorts) → zéro
- [ ] Compétences et niveaux → zéro
- [ ] Mana → limité aux couleurs de cartes
- [ ] Habitants et Influence → zéro

**Système de Combat Détaillé**:
- [ ] Capacités d'ennemis (Brutal, Rapide, etc.) → listées mais pas appliquées
- [ ] Distinction Attaque Distance vs Siège → confundues
- [ ] Compatibilité Attaque/Parade (types) → pas vérifiée
- [ ] Blessures du joueur → complètement absent
- [ ] Soins → zéro
- [ ] Positions/terrains → zéro

**Scénarios et Score**:
- [ ] Mécanique des scénarios (durée, règles spéciales) → zéro
- [ ] Gloire et Réputation → zéro
- [ ] Trésor et Artefacts → zéro
- [ ] Conditions de victoire/défaite du scénario → zéro
- [ ] Score final → zéro

---

## CONCLUSION

**L'app implémente actuellement: un calculateur de combat isolé**

Ce n'est PAS un assistant de jeu complet pour Mage Knight, mais plutôt:
- Un outil pour calculer le résultat d'un combat spécifique
- Utile pour les joueurs qui veulent tester une combinaison de cartes
- Insuffisant pour jouer à un scénario complet

**Pour être un véritable "Companion", il faudrait ajouter**:
1. Système de Manche et Jour/Nuit
2. Gestion du Plateau et Mouvements
3. Capacités d'ennemis appliquées
4. Blessures du joueur et Soins
5. Unités et Compétences
6. Scénarios complets avec conditions
7. Système de Gloire et Réputation
8. Mode "Guide interactif" pour les règles

---

## RECOMMANDATIONS PRIORITAIRES

Si tu veux améliorer l'app pour couvrir les règles complètement:

1. **Court terme** (impacts directs sur le combat):
   - Appliquer les Capacités d'ennemis (Brutal ×2, etc.)
   - Vérifier la compatibilité type Attaque/Parade
   - Fixer le ColdFire (Feu Glacé)
   - Ajouter un système de Blessures du joueur

2. **Moyen terme** (systèmes de jeu):
   - Manche (jour/nuit) et tours multiples
   - Mouvements et positions
   - Unités et Compétences basiques

3. **Long terme** (expérience complète):
   - Scénarios avec conditions
   - Gloire et Réputation
   - Système d'Offre (Cartes Tactique, etc.)
