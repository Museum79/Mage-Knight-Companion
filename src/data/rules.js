export const MAGE_KNIGHT_RULES = {
  setup: {
    title: 'Mise en place et composants',
    content: `
MISE EN PLACE ET COMPOSANTS

Composants principaux :
- Tuiles de terrain hexagonales (carte modulaire)
- Cartes de héros (Arythea, Goldyx, Norowas, Tovak)
- Cartes action (deck de départ de 16 cartes par héros)
- Cristaux de mana (rouge, bleu, vert, blanc, doré, noir)
- Dés de mana (indiquent le mana disponible ce tour)
- Tokens de blessure, de réputation, de commandement
- Cartes unité (unités recrutables)
- Cartes sort
- Cartes avancée (améliorations du deck)
- Tuiles ennemi (campements, villes, donjons, tours)
- Plateau de réputation et piste de mana
- Jetons de contrôle de ville

Mise en place de la carte :
- Placer la tuile de départ au centre
- Chaque joueur place son héros sur la tuile de départ
- Révéler les tuiles adjacentes selon le scénario
- Peupler les lieux (campements, villes, etc.) avec les ennemis correspondants selon le niveau de difficulté

Préparation du deck de héros :
- Commencer avec les 16 cartes de base du héros choisi
- Mélanger le deck
- Piocher 5 cartes en main
- Placer les cristaux de départ selon le héros (généralement 1 rouge + 1 blanc ou similaire)

Dés de mana :
- Au début de chaque round, lancer tous les dés de mana non utilisés
- Les couleurs obtenues sont disponibles pour tous les joueurs ce tour
- Le dé doré = joker (n'importe quelle couleur non noire)
- Le dé noir = mana noir (utilisé pour la magie noire ou les sorts de nuit)

Héros disponibles :
- Arythea : spécialiste du combat au corps à corps, cartes rouges offensives
- Goldyx : magie et mobilité, cartes bleues et vertes polyvalentes
- Norowas : diplomatie et commandement, cartes blanches, bonus d'influence
- Tovak : guerrier brut, cartes rouges/vertes très offensives
    `,
  },

  turn: {
    title: 'Tour de jeu et actions',
    content: `
TOUR DE JEU ET ACTIONS

Structure d'un round :
1. Phase de mana (lancer les dés de mana)
2. Tours des joueurs (dans l'ordre du tour, chacun joue toutes ses actions)
3. Fin du round (avancer le marqueur jour/nuit, recalculer l'ordre du tour)

Tour d'un joueur :
Un joueur effectue autant d'actions qu'il veut dans n'importe quel ordre, puis passe.
Chaque action consiste généralement à jouer une ou plusieurs cartes.

Types d'actions possibles :
- Se déplacer (cartes Move)
- Explorer (révéler une nouvelle tuile de terrain)
- Interagir avec un lieu (village, monastère, mine, etc.)
- Attaquer un ennemi
- Recruter une unité
- Apprendre un sort
- Acheter une avancée dans une ville conquise
- Se reposer (défausser des blessures contre des cartes)
- Piller un lieu
- Utiliser une capacité spéciale de carte ou de héros

Jouer des cartes :
- Mode de base : utiliser la valeur et le type imprimés en bas de la carte
- Mode puissant (powered) : dépenser un cristal de mana de la couleur correspondante pour utiliser la valeur supérieure imprimée en haut

Cartes jouées comme jokers :
- N'importe quelle carte peut être jouée pour 1 point de Move, Attack, Block, ou Influence (mode de base uniquement, sans dépenser de mana)
- Cette règle est utile en fin de tour pour compléter un move ou une attaque

Fin du tour d'un joueur :
- Défausser toutes les cartes jouées
- Piocher jusqu'à avoir 5 cartes en main (ou moins si deck épuisé)
- Si le deck est vide : mélanger la défausse pour former un nouveau deck et continuer à piocher
- Les unités blessées restent en jeu jusqu'au repos

Les blessures :
- Une blessure est une carte qui entre dans la main et remplace une carte normale
- Une blessure ne peut être jouée que pour 1 point de n'importe quel type (uniquement en dernier recours)
- Les blessures ne peuvent être retirées qu'en se reposant dans un village ou monastère, ou via certaines cartes
- En fin de partie : -1 PV par blessure en main ou dans le deck

Ordre du tour :
- L'ordre initial est défini au départ (généralement aléatoire)
- Après chaque round, l'ordre peut changer selon les jetons d'initiative
- Le joueur qui passe en premier ce round joue en dernier au prochain round
    `,
  },

  movement: {
    title: 'Déplacement et terrain',
    content: `
DÉPLACEMENT ET TERRAIN

Types de terrain et coût en Move :
- Plaine (vert clair) : 2 Move
- Forêt : 3 Move (2 le jour dans certains scénarios)
- Colline : 3 Move
- Marais : 4 Move (inaccessible la nuit sauf capacité spéciale)
- Montagne : 5 Move (inaccessible la nuit sauf capacité spéciale)
- Lac/Mer : infranchissable (sauf tuile de bateau ou capacité spéciale)
- Désert : 3 Move
- Toundra : 2 Move (coût réduit à 1 la nuit pour certains sorts)

Règles de déplacement :
- Le Move est cumulable sur plusieurs cartes dans un même tour
- On doit finir son déplacement sur une case avant de la déclarer complète
- On ne peut pas traverser une case sans s'y arrêter (sauf capacité spéciale "Flying")
- Le terrain de la case de DESTINATION détermine le coût, pas la case de départ
- Un mouvement doit être entièrement résolu avant d'effectuer une autre action

Exploration :
- Quand on entre dans une case vide adjacente à une tuile non révélée, on peut explorer
- Révéler et placer la nouvelle tuile de terrain selon les règles du scénario
- Peupler les lieux selon les instructions du scénario (campements, villes, etc.)
- L'exploration ne coûte pas de Move supplémentaire

Lieux interactifs :
- Village : se reposer (retirer blessures), acheter des cristaux (coûte de l'Influence)
- Monastère : se reposer, apprendre des sorts basiques (coûte de l'Influence)
- Tour de mage : apprendre des sorts avancés (coûte plus d'Influence)
- Campement de monstres : peut être attaqué pour gagner des points et des récompenses
- Ville : recruter des unités, acheter des avancées (nécessite d'avoir conquis la ville)
- Donjon/Tombeau : combats spéciaux avec récompenses importantes
- Mines : source de cristaux de mana (coûte de l'Influence ou se conquiert)
- Ancien lieu de pouvoir : effets spéciaux variés selon le scénario

Entrée fortifiée :
- Entrer dans un lieu gardé (camp, donjon) déclenche un combat obligatoire
- On ne peut pas simplement traverser un lieu gardé
    `,
  },

  combat: {
    title: 'Combat (règles détaillées)',
    content: `
COMBAT — RÈGLES DÉTAILLÉES

Structure d'un combat :
Un combat se déroule en plusieurs phases dans un ordre précis et IMMUABLE.

Phase 1 — Siège à distance (Ranged Attack) :
- Optionnel. Le joueur peut attaquer avec des cartes/sorts à distance AVANT que l'ennemi n'agisse.
- Si l'attaque à distance tue l'ennemi, le combat se termine sans dégâts pour le joueur.
- L'ennemi ne peut pas bloquer les attaques à distance.
- EXCEPTION : les ennemis Fortified (fortifiés) sont immunisés aux attaques à distance, sauf si le joueur a la capacité "Siege".
- Les cartes "Ranged Attack" ou les sorts avec effet à distance sont utilisables ici.

Phase 2 — Blocage (Block) :
- L'ennemi attaque avec sa valeur d'attaque.
- Le joueur doit DÉCIDER avant de jouer ses cartes s'il veut bloquer ou non.
- Pour bloquer, le joueur joue des cartes Block dont la somme >= valeur d'attaque de l'ennemi.
- RÈGLE CRUCIALE : un blocage partiel = blocage RATÉ (aucun effet, le joueur prend TOUS les dégâts).
- Si le joueur ne bloque pas ou rate le blocage : il prend autant de blessures que la valeur d'attaque.
- Les blessures excédantes sont reçues en main (et bloquent la pioche de nouvelles cartes à hauteur du nombre de blessures reçues).

Types de dégâts ennemis et comment les bloquer :
- Physical : bloqué par Physical, Fire, ou Ice
- Fire : bloqué UNIQUEMENT par Fire ou ColdFire
- Ice : bloqué UNIQUEMENT par Ice ou ColdFire
- ColdFire : bloqué par n'importe quel type de blocage
- Poison : le joueur reçoit des blessures normales + effets de poison (effets selon capacité)

Phase 3 — Attaque (Attack) :
- Le joueur joue des cartes Attack dont la somme >= armure de l'ennemi pour le tuer.
- Si la somme est insuffisante, l'ennemi n'est pas blessé du tout — il faut atteindre le seuil complet.
- Si l'ennemi est tué : le joueur gagne les récompenses (points de victoire, cristaux, réputation).
- IMPORTANT : si l'ennemi n'est pas tué lors de l'attaque principale, il reste et attaquera à nouveau au prochain tour si le héros reste sur place.

Résistances des ennemis (s'appliquent à l'ATTAQUE du joueur, pas au blocage) :
- Résistant au Feu : les attaques Fire comptent pour moitié (arrondi à l'inférieur)
- Résistant à la Glace : idem pour Ice
- Résistant au Physical : idem pour Physical
- Immunisé au Feu : les attaques Fire ne comptent pas du tout
- Immunisé à la Glace : idem pour Ice
- ColdFire ignore toutes les résistances (sauf immunité ColdFire spécifique)

Fortification :
- Ennemis Fortified : armure DOUBLÉE et immunisé aux attaques à distance.
- Pour attaquer un ennemi fortifié à distance, il faut la capacité spéciale "Siege Attack".
- Les ennemis dans des villes sont souvent fortifiés par défaut.

Capacités spéciales d'ennemis :
- Swift (Rapide) : l'ennemi attaque AVANT que le joueur puisse bloquer à distance (skip phase 1)
- Brutal : les blessures non bloquées comptent double
- Paralyze : les blessures subies empêchent de jouer certaines cartes
- Ranged : l'ennemi peut attaquer à distance avant le joueur
- Poison : les blessures reçues contaminent (effets additionnels)

Plusieurs ennemis dans un même combat :
Option A — Combat groupé : toutes les attaques s'additionnent, toutes les armures s'additionnent. Un seul set de blocage/attaque.
Option B — Combat individuel : combattre chaque ennemi séparément, l'un après l'autre, avec les mêmes cartes.
Le joueur choisit avant de commencer.

Unités au combat :
- Les unités recrutées peuvent participer au combat à la place (ou en plus) des cartes
- Chaque unité a ses propres valeurs d'attaque, de blocage, et parfois des capacités spéciales
- Les unités peuvent être blessées : une unité blessée est retournée (ses valeurs sont généralement divisées)
- Une unité blessée à nouveau est détruite (retirée du jeu)
- Les unités de niveau supérieur nécessitent des jetons de commandement pour être activées

Récompenses de combat :
- Points de réputation (positive ou négative selon le type d'ennemi)
- Cristaux de mana (selon l'ennemi)
- Points de victoire en fin de partie
- Parfois : jetons de commandement (pour recruter des unités d'élite)
    `,
  },

  magic: {
    title: 'Magie et sorts',
    content: `
MAGIE ET SORTS

Acquisition des sorts :
- Apprendre un sort dans un monastère, une tour de mage, ou via certaines capacités de héros
- Les sorts font partie du deck et sont piochés comme des cartes normales
- Nombre maximum de sorts : limité par la réputation du héros (voir piste de réputation)
- Plus la réputation est haute, plus on peut conserver de sorts dans le deck

Utilisation des sorts :
- Les sorts nécessitent du mana de la couleur correspondante pour être lancés
- Le mana vient des dés de mana (pool partagé) ou des cristaux personnels
- Un sort lancé est défaussé comme une carte normale

Modes jour et nuit pour les sorts :
- Mode jour : les sorts de couleur normale fonctionnent à pleine puissance
- Mode nuit : seuls les sorts noirs ou rouges fonctionnent normalement
- Pour lancer un sort bleu, vert ou blanc la nuit : dépenser un mana noir supplémentaire
- Certains sorts ont des effets spéciaux la nuit (amplifiés ou différents)

Types de sorts par couleur :
- Sorts de feu (rouge) : dégâts de type Fire, brûlures, attaques puissantes — fonctionnent jour et nuit
- Sorts de glace (bleu) : dégâts de type Ice, ralentissement, blocage amélioré — jour seulement (ou +noir la nuit)
- Sorts de nature (vert) : déplacement amélioré, guérison de blessures, exploration — jour seulement
- Sorts de lumière (blanc) : soins, boucliers, influence accrue — jour seulement
- Sorts noirs : très puissants mais nécessitent du mana noir — fonctionnent jour et nuit
- Sorts dorés : sorts rares ultra-puissants, certains fonctionnent en toutes circonstances

Mana :
- Cristaux personnels : source de mana personnelle non partagée. Utilisables à n'importe quel moment du tour. Ne se vident pas entre les tours.
- Dés de mana (pool commun) : partagés entre tous les joueurs. Disponibles pour le round en cours uniquement. Prendre un dé le retire du pool pour ce round.
- Prendre un dé de mana depuis le pool pour le convertir en cristal est possible mais coûte 1 point de réputation négative.

Source de mana la nuit :
- Les dés de mana de nuit produisent uniquement du mana noir et rouge
- Les cristaux personnels restent utilisables normalement (toutes couleurs)
    `,
  },

  units: {
    title: 'Unités et recrutement',
    content: `
UNITÉS ET RECRUTEMENT

Recrutement d'unités :
- Les unités se recrutent dans les villages (unités régulières) ou les villes conquises (unités d'élite)
- Le recrutement coûte de l'Influence (indiqué sur la carte unité)
- Certaines unités nécessitent également des jetons de commandement ("Command tokens")
- On peut avoir un nombre maximum d'unités actives = niveau de commandement du héros

Niveaux de commandement :
- Le héros commence avec un certain nombre de jetons de commandement
- Certaines avancées et capacités augmentent le commandement disponible
- Les unités d'élite (plus puissantes) nécessitent plus de jetons de commandement

Types d'unités communes :
- Archers : attaque à distance (physique), peuvent agir en phase Ranged
- Infanterie : attaque physique et blocage physique solides
- Cavalerie : attaque physique élevée, souvent avec capacité de charge
- Mages : attaque magique (Fire ou Ice), peuvent bloquer les attaques magiques
- Guérisseurs : peuvent retirer des blessures du héros
- Berserk : attaque très haute mais pas de blocage

Utilisation des unités en combat :
- Les unités peuvent attaquer ou bloquer à la place des cartes du héros
- Une unité ne peut généralement faire qu'UNE action par combat (attaquer OU bloquer, pas les deux, sauf exception)
- Certaines unités ont la capacité "Readied" (prêtes) : elles peuvent attaquer ET bloquer dans le même combat
- Les unités sont "dépensées" après utilisation (retournées face cachée) jusqu'au prochain tour

État des unités :
- Unité prête : face visible, peut participer au combat
- Unité épuisée : retournée après utilisation, récupère au début du prochain tour du héros
- Unité blessée : après avoir subi une attaque sans blocage suffisant, l'unité est retournée avec ses valeurs réduites
- Unité détruite : blessée une seconde fois, elle est éliminée définitivement

Avantage des unités :
- Les blessures subies par les unités ne vont pas dans la main du héros (protection précieuse)
- Certaines unités ont des capacités spéciales uniques (Siege, Flying, etc.)
    `,
  },

  dayNight: {
    title: 'Nuit et jour',
    content: `
NUIT ET JOUR

Cycle jour/nuit :
- La partie alterne entre phases de jour et phases de nuit
- Le marqueur de round avance à chaque fin de round
- Le nombre de rounds par phase dépend du scénario (généralement 3 rounds de jour puis 1-2 de nuit)

Effets de la nuit :
- Certains terrains deviennent inaccessibles : Marais et Montagne sont infranchissables la nuit (sauf capacité spéciale)
- Les dés de mana de jour ne sont plus disponibles — remplacés par des dés de nuit (noir + rouge uniquement)
- Les ennemis nocturnes apparaissent dans certains lieux (généralement plus puissants)
- Certaines cartes et sorts ont des effets amplifiés la nuit
- La magie noire (mana noir) est plus facilement accessible la nuit

Effets du jour :
- Tous les terrains sont accessibles selon leur coût normal
- Dés de mana complets disponibles (toutes les couleurs)
- Ennemis diurnes actifs dans les lieux de jour

Transition jour/nuit :
- Tous les dés de mana sont relancés lors de la transition
- Les cristaux personnels ne sont pas affectés par le changement
- Certains lieux changent d'occupants (ennemis de jour remplacés par ennemis de nuit ou vice-versa)

Stratégie nuit/jour :
- La nuit favorise les héros avec des cristaux rouges ou noirs en stock
- Planifier les gros combats le jour pour avoir accès à toutes les couleurs de mana
- Certains sorts noirs sont délibérément conservés pour être utilisés la nuit
    `,
  },

  scenarios: {
    title: 'Scénarios et modes de jeu',
    content: `
SCÉNARIOS ET MODES DE JEU

Modes de jeu principaux :

1. Conquest (Conquête solo/coopératif) :
- Objectif : explorer la carte, conquérir des villes, accumuler des points
- Durée : définie par le scénario (nombre de rounds)
- Solo ou coopératif (les joueurs travaillent ensemble)

2. Full Cooperative (Coopératif total) :
- Les joueurs partagent les objectifs et gagnent ou perdent ensemble
- Pas de compétition entre joueurs

3. Competitive (Compétitif) :
- Chaque joueur joue pour lui-même
- La victoire va au joueur avec le plus de points de victoire

Conditions de fin de partie (selon scénario) :
- Après un nombre défini de rounds
- Quand le dernier round de nuit est terminé
- Quand un objectif spécifique est accompli (ex : conquérir toutes les villes)

Niveaux de difficulté :
- La difficulté est réglée en choisissant le niveau des ennemis qui peuplent la carte
- Ennemis niveau 1 (vert) : faibles, début de partie ou pour débutants
- Ennemis niveau 2 (orange) : modérés
- Ennemis niveau 3 (rouge) : puissants, pour joueurs expérimentés
- Ennemis de ville (violet) : très puissants, gardent les villes

Objectifs bonus selon scénario :
- Conquérir des villes spécifiques dans un ordre donné
- Explorer un pourcentage de la carte
- Vaincre un certain nombre d'ennemis d'un type particulier
- Atteindre un niveau de réputation cible
    `,
  },

  endgame: {
    title: 'Fin de partie et scoring',
    content: `
FIN DE PARTIE ET SCORING

Fin de partie :
- La partie se termine selon les conditions du scénario choisi
- Généralement : après un certain nombre de rounds, ou quand un objectif est accompli

Calcul des points de victoire (PV) :
1. Points pour les ennemis vaincus (valeur indiquée sur chaque tuile ennemi)
2. Points pour les villes conquises (selon le niveau de la ville)
3. Points pour les donjons et tombeaux explorés
4. Points de réputation (convertis selon l'échelle de réputation)
5. Points pour les sorts possédés en fin de partie
6. Points pour les avancées (cartes améliorées) dans le deck
7. Points pour les cristaux en fin de partie (selon le scénario)
8. Bonus de scénario (objectifs spéciaux accomplis)
9. Malus : -1 PV par blessure en main ou dans le deck à la fin

Réputation :
- La piste de réputation va de -7 à +7
- Valeur de la réputation en PV : -3 (très mauvaise) à +5 (excellente)
- Actions qui augmentent la réputation : vaincre des ennemis "Brutaux", libérer des lieux
- Actions qui diminuent la réputation : attaquer des lieux pacifiques, brûler des villages, convertir des dés en cristaux

Bris d'égalité :
1. Le joueur ayant le plus de PV de réputation gagne
2. Puis le joueur ayant le moins de blessures
3. Puis le joueur avec le plus de cristaux
4. Puis le joueur avec le plus de sorts et avancées

Niveaux de héros :
- Au cours de la partie, le héros peut gagner des niveaux en accomplissant des objectifs
- Chaque niveau octroie une capacité permanente ou un bonus de statistiques
- Les niveaux contribuent souvent aux points de victoire finaux
    `,
  },
}

export const FULL_RULES_TEXT = Object.values(MAGE_KNIGHT_RULES)
  .map(section => `=== ${section.title} ===\n${section.content}`)
  .join('\n\n')
