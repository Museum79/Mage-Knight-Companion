# Mage Knight Companion — CLAUDE.md

## Contexte du projet

Application web companion pour le jeu de société **Mage Knight Board Game** (WizKids).
Elle s'adresse à un groupe de joueurs qui ont besoin d'un assistant de règles intelligent et d'un outil d'aide au combat, sans friction technique (pas de compte à créer, pas de clé API à gérer).

---

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| Style | Tailwind CSS v3 |
| Routing | React Router v6 |
| State | Zustand |
| Backend (proxy API) | Vercel Serverless Functions (dossier `/api`) |
| IA | Google Gemini 1.5 Flash (via proxy Vercel) |
| Déploiement | Vercel (free tier) |

> **Pourquoi Vercel Serverless ?** La clé API Gemini doit rester côté serveur. Les fonctions `/api` de Vercel permettent de proxifier les appels Gemini sans exposer la clé, sans backend séparé, et gratuitement.

---

## Architecture

```
mage-knight-companion/
├── api/                        # Vercel Serverless Functions
│   └── chat.ts                 # Proxy vers Gemini API
├── public/
├── src/
│   ├── assets/                 # Images, vidéos, fonts
│   ├── components/
│   │   ├── ui/                 # Composants réutilisables (Modal, ConfirmDialog, TabBar, ColorTabBar)
│   │   │   ├── Button.jsx      # Variantes : primary, secondary, ghost, destructive
│   │   │   ├── Card.jsx        # Carte générique avec sémantique
│   │   │   ├── Badge.jsx       # Étiquettes avec variantes
│   │   │   ├── Input.jsx       # Input text avec focus states
│   │   │   ├── Textarea.jsx    # Textarea pour les inputs longs
│   │   │   ├── Modal.jsx       # Modal générique (sm, md, lg)
│   │   │   ├── ConfirmDialog.jsx # Confirmation avec variante destructive
│   │   │   ├── TabBar.jsx      # Onglets génériques avec badges
│   │   │   └── ColorTabBar.jsx # Onglets de couleur (wrapper de TabBar)
│   │   ├── chat/               # Composants du chat IA Oracle
│   │   │   ├── OracleAvatar.jsx     # Avatar de l'oracle avec pulse
│   │   │   ├── MessageBubble.jsx    # Bulle de message avec parsing
│   │   │   ├── LoadingBubble.jsx    # Indicateur de chargement animé
│   │   │   ├── EmptyState.jsx       # État initial avec suggestions
│   │   │   └── index.js             # Barrel export
│   │   └── combat/             # Composants de l'assistant combat
│   │       ├── enemies/
│   │       ├── cards/
│   │       ├── steps/
│   │       └── resolution/
│   ├── data/                   # Constantes et données
│   │   ├── heroes.js           # Liste des héros avec images et couleurs
│   │   ├── enemies.ts          # Ennemis avec stats et capacités
│   │   ├── cards.ts            # Cartes disponibles par héros
│   │   ├── scenarios.ts        # Scénarios de jeu
│   │   ├── rules.ts            # Règles structurées (pour le chat IA)
│   │   └── combatConstants.js  # Types et constantes de combat
│   ├── hooks/                  # Custom hooks React
│   │   ├── useDisclosure.js    # État ouvert/fermé pour modals
│   │   ├── useHandState.js     # Gestion de la main de combat
│   │   └── useScrollToBottom.js # Auto-scroll vers les nouveaux messages
│   ├── pages/
│   │   ├── HomePage.jsx        # Accueil avec sélection héros
│   │   ├── GameSetupPage.jsx   # Setup : scénario + héros (avec swipe carousel)
│   │   ├── RulesPage.jsx       # Chat avec l'IA Oracle
│   │   ├── DeckPage.jsx        # Gestion du deck
│   │   └── CombatPage.jsx      # Assistant combat
│   ├── store/                  # Zustand stores
│   │   ├── gameStore.ts        # État global du jeu
│   │   └── chatStore.ts        # Historique du chat
│   ├── types/                  # Types TypeScript
│   ├── index.css               # Tailwind + design tokens sémantiques + keyframes
│   ├── App.jsx
│   └── main.jsx
├── .env.local                  # GEMINI_API_KEY (ne jamais committer)
├── .env.example                # Template sans valeurs sensibles
├── .gitignore
├── vercel.json
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Design System

### Tokens sémantiques (Tailwind CSS v4 @theme)

Définis dans `src/index.css`, les tokens sémantiques remplacent les hex literals et facilitent les changements globaux :

#### Surfaces
```css
--color-surface-base:   var(--color-slate-950)    /* Fond principal très sombre */
--color-surface-raised: var(--color-slate-900)    /* Panneaux surélevés */
--color-surface-panel:  var(--color-slate-800)    /* Éléments de surface */
```

#### Texte
```css
--color-text-primary:   var(--color-parchment-100) /* Texte principal */
--color-text-secondary: var(--color-slate-300)     /* Texte secondaire */
--color-text-muted:     var(--color-slate-500)     /* Texte désactivé/hint */
```

#### Bordures
```css
--color-border-subtle:  var(--color-slate-700)  /* Bordures discrètes */
--color-border-control: var(--color-slate-600)  /* Bordures de contrôles */
```

#### Accent
```css
--color-accent:         var(--color-gold-400)   /* Accent principal (CTAs, highlight) */
--color-accent-text:    var(--color-gold-300)   /* Texte accent */
--color-accent-muted:   var(--color-gold-600)   /* Accent désaturé */
```

**Usage** : Tous les composants UI utilisent ces tokens au lieu de classes Tailwind brutes. Ex. : `bg-surface-raised text-text-primary` au lieu de `bg-slate-900 text-slate-100`.

### Composants UI réutilisables

Situés dans `src/components/ui/`, ces composants forment la base de l'UI :

- **Button** : variantes `primary` (amber), `secondary` (slate), `ghost` (transparent), `destructive` (red)
- **Card** : conteneur avec bordure, fond et padding sémantiques
- **Badge** : étiquettes avec variantes `default`, `outline`, `destructive`
- **Input / Textarea** : champs avec focus states et tokens
- **Modal** : overlay + panel centré, tailles `sm` (max-w-sm), `md` (max-w-2xl), `lg` (max-w-5xl)
- **ConfirmDialog** : wrapper Modal pour les confirmations (avec variante `destructive`)
- **TabBar** : onglets génériques, accepte `tabs: [{id, label, accent?, badge?}]`
- **ColorTabBar** : wrapper spécialisé pour les onglets de couleur (cartes, éléments)

### Animations et keyframes

Toutes les animations CSS sont dans `src/index.css` (avec support `prefers-reduced-motion`) :

- **mk-message-enter** : fade + slide des bulles de messages
- **mk-bubble-sweep** : animation de balayage pour les bulles
- **mk-rune-pulse** : pulse des runes de chargement
- **mk-loading-shimmer** : shimmer du loader
- **mk-emblem-breathe** : respiration de l'emblème Oracle
- **mk-emblem-aura** : aura flottante autour de l'emblème
- **mk-sparkle-*** : animations de sparkles/paillettes

---

## Variables d'environnement

**`.env.local`** (local, jamais committé) :
```
GEMINI_API_KEY=ta_clé_ici
```

**Sur Vercel** : ajouter `GEMINI_API_KEY` dans Settings → Environment Variables.

**`.env.example`** (committé, sans valeur) :
```
GEMINI_API_KEY=
```

---

## État du projet

Le projet a été **restructuré et optimisé** pour supporter des modifications substantielles.

### Phases complétées

**Phase 1 — Design Token Foundation** ✓
- Tokens sémantiques dans `src/index.css` (surfaces, texte, bordures, accent)
- Keyframes CSS pour toutes les animations

**Phase 2 — Composants UI réutilisables** ✓
- Composants génériques : Modal, ConfirmDialog, TabBar, ColorTabBar
- Mise à jour des composants de base pour utiliser les tokens sémantiques

**Phase 3 — Extraction des composants Chat** ✓
- RulesPage réduit de 700+ à ~130 lignes
- Composants dédiés : OracleAvatar, MessageBubble, LoadingBubble, EmptyState
- Barrel export en `src/components/chat/index.js`

**Phase 4 — Hooks personnalisés** ✓
- `useDisclosure` : gestion d'état ouvert/fermé
- `useHandState` : gestion de la main de combat
- `useScrollToBottom` : auto-scroll des messages

**Phase 5 — Cleanup & Réorganisation** ✓
- Suppression du code mort
- Déplacement de `combatConstants.js` vers `src/data/`
- Consolidation des données héros (images, couleurs)

**Phase 6 — Améliorations UI (en cours)** ✓
- Carousel héros avec swipe touch (GameSetupPage)
- Layout 2 colonnes pour le choix de scénario

---

## Itérations — Historique du développement

### Itération 1 — Scaffold & UI de base
**Objectif** : Projet qui tourne, navigation fonctionnelle, design system en place.

**Statut** : ✓ Complétée

- [x] Initialiser le projet avec Vite + React
- [x] Installer les dépendances essentielles
- [x] Configurer Tailwind avec thème dark fantasy
- [x] Créer le layout principal et navigation
- [x] Créer les pages : Home, Rules (chat), Combat, Deck, GameSetup
- [x] Créer les composants UI de base avec tokens sémantiques

**Réalisations** : Tous les composants UI utilisent les tokens sémantiques. Design cohérent sur toutes les pages.

---

### Itération 2 — Intégration des règles
**Objectif** : Les règles de Mage Knight sont disponibles dans l'app de manière structurée.

**Statut** : ✓ Complétée

- [x] Créer `src/data/rules.ts` avec règles structurées par catégories
- [x] Rédaction personnalisée (pas de copier-coller)
- [x] Export d'objets `MAGE_KNIGHT_RULES` et `FULL_RULES_TEXT`
- [x] Contexte injecté dans chaque prompt Gemini

**Réalisations** : Les règles sont structurées, prêtes pour le chat IA.

---

### Itération 3 — Assistant IA (chat règles)
**Objectif** : Un joueur pose une question en langage naturel et reçoit une réponse basée sur les règles de Mage Knight.

**Statut** : ✓ Complétée

#### Backend — `api/chat.ts` ✓
Proxy vers Gemini 1.5 Flash :
```typescript
// Reçoit : { question: string }
// Construit le prompt avec FULL_RULES_TEXT comme contexte
// Appelle Gemini 1.5 Flash
// Retourne : { answer: string }
```

Prompt système injecte les règles dans le contexte Gemini.

#### Frontend — `src/pages/RulesPage.jsx` ✓
- Interface de chat : historique + input en bas
- Messages utilisateur et IA avec animations
- Indicateur de chargement (LoadingBubble) avec runes animées
- Suggestions de questions au démarrage (EmptyState)
- Gestion d'erreur gracieuse

**Composants dédiés** :
- `OracleAvatar` : avatar de l'oracle avec pulse optionnel
- `MessageBubble` : rendu des messages avec parsing (bold, listes, dividers)
- `LoadingBubble` : indicateur avec animation
- `EmptyState` : suggestions initiales

#### Gestion du state — `src/store/chatStore.ts` ✓
```typescript
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
```

---

### Itération 4 — Assistant Combat
**Objectif** : Aider le joueur à résoudre un combat en entrant les stats de l'ennemi et sa main de cartes.

**Statut** : ✓ Complétée

#### Logique de combat Mage Knight ✓
- Ennemi : `armor` (valeur à atteindre), `attack` (dégâts), `abilities`, `resistances`, `immunities`
- Cartes joueur : `basicValue` + `basicType`, `poweredValue` + `poweredType`
- Types : Physical, Fire, Ice, ColdFire
- Gestion des résistances (÷2) et immunités (0)

#### Composants ✓
- **EnemySelector** : sélection d'ennemi avec affichage des stats
- **HandBuilder** : ajout/suppression de cartes dans la main
- **CombatResolver** : analyse + calcul de la combinaison
- **Contribution tables** : détail des contributions par carte

#### Data — `src/data/enemies.ts` ✓
Ennemis avec stats, capacités, résistances.

#### Data — `src/data/cards.ts` ✓
Cartes disponibles par héros.

#### Data — `src/data/combatConstants.js` ✓
Types et constantes de combat (déplacé de `src/components/combat/utils/` vers `src/data/`).

#### Hooks — `useHandState.js` ✓
Gestion complète de la main : ajout, suppression, changement de mode, vidage.

---

## Conventions de code

### Généralités
- **TypeScript strict** : pas de `any`, interfaces pour tous les objets de domaine
- **Composants fonctionnels** uniquement, avec hooks
- **Nommage** : PascalCase composants, camelCase fonctions/variables, UPPER_SNAKE_CASE constantes
- **Tailwind + tokens sémantiques** : utiliser les tokens (`bg-surface-raised`, `text-text-primary`) plutôt que les classes brutes (`bg-slate-900`, `text-slate-100`)
- **Pas de `console.log`** en production — utiliser des commentaires `// DEBUG:` si besoin temporaire
- **Fichiers** : un composant par fichier, nom du fichier = nom du composant

### Composants réutilisables
- **Ne jamais dupliquer** : si un pattern (bouton, modal, onglet, etc.) s'ajoute deux fois, l'extraire immédiatement en composant `src/components/ui/`
- **Composants UI génériques** : acceptent des props minimales (label, onClick, isOpen, etc.), pas de logique métier
- **Composition** : préférer la composition au-dessus de l'héritage. Ex. : `<Modal><ConfirmDialog /></Modal>` plutôt qu'une sous-classe

### Hooks personnalisés
- **Logique réutilisable** : chaque logique qui se répète 2+ fois → hook personnalisé dans `src/hooks/`
- **Nommage** : commencer par `use` (React convention), ex. `useDisclosure`, `useHandState`
- **Retours** : retourner un objet ou array destructurable. Ex. : `useDisclosure()` → `{isOpen, open, close, toggle}`

### État global (Zustand)
- **Stores en `src/store/`** : chaque domaine (game, chat) = un store
- **Pas d'imbrications** : garder les stores simples et plats, éviter les relations complexes entre stores
- **Typescript** : typer les states et actions

---

## Commandes utiles

```bash
# Démarrer en local
npm run dev

# Build
npm run build

# Déployer sur Vercel (première fois)
npx vercel

# Déployer sur Vercel (mises à jour)
npx vercel --prod
```

---

## Points d'attention importants

### Sécurité
1. **Ne jamais exposer `GEMINI_API_KEY` côté client.** Elle doit uniquement être lue dans `api/chat.ts` via `process.env.GEMINI_API_KEY`.

### Design & Responsive
2. **Mobile first** : L'app s'utilise sur téléphone ET tablette (iPad) pendant les parties. Chaque composant doit fonctionner sur petit écran d'abord, puis sur écran large.
3. **Breakpoints Tailwind** : `sm` (640px), `md` (768px), `lg` (1024px) — tester sur les trois tailles.
4. **Touch interactions** : Préférer le swipe/drag au lieu de boutons flèches pour naviguer (ex. : carousel héros).

### Performance
5. **Texte des règles** : Le concaténer une seule fois au build, pas à chaque requête Gemini.
6. **Bundle size** : Actuellement ~512 KB. Envisager le code-splitting si dépassement.

### UX
7. **Chargement explicite** : Les appels Gemini peuvent prendre 2-5 secondes. Toujours afficher un état de chargement avec animation (ex. LoadingBubble).
8. **Offline graceful** : Si l'API est indisponible, afficher un message clair et permettre de consulter les règles structurées manuellement.
9. **Tokens sémantiques** : Utiliser les tokens (`--color-surface-base`, etc.) partout. Éviter les hex literals.

### Maintenance
10. **Pas de duplication** : Si un composant, hook ou logique s'ajoute deux fois, l'extraire immédiatement. Le projet est volontairement "flat" et simplifié.
11. **Tests & validation** : Avant chaque merge, vérifier : `npm run dev` (fonctionnel), `npm run build` (pas d'erreur).