# Coach Risques — Spécification UX/UI

État : **V1 validée par Lætitia, 2026-06-28** (synthèse du Panel 2, sources `audits/panel-2-*.md`).

Source de vérité pour la conception d'interface et la direction artistique. Le moteur `RiskCoachEngine` (cœur de domaine) doit pouvoir évoluer sans toucher cette spec ; cette spec doit pouvoir évoluer sans toucher le domaine.

---

## §1. Architecture d'information

**Modèle hub-and-spoke**, pas de parcours linéaire imposé.

- **Hub** = Carte de maîtrise. Point d'entrée unique. Mémorise l'état, reprend où l'apprenant s'est arrêté.
- **Spokes** = 4 mécaniques (Le Tri, Le Détective, Le Pari, Le Brouillard se lève).
- **Onglet secondaire du hub** = Mode défi *Procès du faux risque*. Pas une case de la Carte (statut transverse).
- **Accès Théorie** = présent depuis le hub et depuis chaque écran de mécanique (panneau escamotable).

**Trois niveaux d'écran maximum** :
1. Hub.
2. Écran de mécanique (une mécanique active, plein cadre).
3. Panneau contextuel (drawer latéral ou overlay non bloquant : Théorie escamotable, feedback détaillé, formulation de revue).

Pas d'écran de transition décoratif. Pas de loader théâtral. Pas de pop-up de bienvenue. Pas de tour guidé imposé.

---

## §2. Carte de maîtrise

**Forme : grille hexagonale 2×3** (six hexagones jointifs, façon table périodique). Métaphore d'inspection alvéolaire — on cartographie un terrain incertain, on ne le conquiert pas. Différenciation conceptuelle assumée avec Coach Objectifs (qui utilise la métaphore d'ascension/sommet).

Variante de repli (si test négatif après pilote) : 6 cartes rectangulaires en grille 3×2, même anneau de progression.

**Six zones, une par section DOMAINE** :
1. Triptyque (§1)
2. Anatomie (§2)
3. Évaluation (§3)
4. Traitement (§4)
5. Indicateurs (§5)
6. Réduction-valeur (§6)

**Granularité de maîtrise : 4 états qualitatifs** (pas binaire, pas numérique — interdit D10) :
| État | Visuel | Étiquette | Critère |
|---|---|---|---|
| Non commencée | Hexagone neutre, anneau 0 % | « À découvrir » | Aucun exercice réussi |
| Effleurée | Anneau ~25 %, teinte très légère | « Premiers pas » | Au moins un exercice réussi |
| Travaillée | Anneau ~60 %, teinte moyenne | « En cours » | Plusieurs passes, succès partiel |
| Consolidée | Anneau 100 %, teinte pleine | « Acquis » | Réussite stable sur *items variés* |

**Anneau en couleur unique `--risk-focus` `#1E40AF`** (bleu marine), pas de gradient bleu→vert qui dirait « bien joué ».

**Au survol** : la tuile révèle quelle(s) mécanique(s) la nourri(ssen)t (une zone peut être travaillée par plusieurs mécaniques — Le Pari nourrit Évaluation + Traitement). Pas de silos.

**Consolidation par variation, pas par farming** : le passage à *consolidée* exige des items différents. Empêche la rejouabilité opportuniste. Modèle Anki/Brilliant.

---

## §3. Spécifications des 4 mécaniques

### Le Tri (O1)

- **Layout** : volet gauche fixe avec formulation libre ; quatre zones de dépôt à droite (Enjeu / Objectif / Risque / Issue), quadrant 2×2 pour rappeler leur symétrie conceptuelle (haut = avant action, bas = en cours ou avéré). Mini-glossaire d'une ligne escamotable sous chaque zone.
- **Interaction** : drag-and-drop + raccourcis clavier 1/2/3/4. Pas de saisie texte.
- **Couleurs des zones** : Enjeu = `--risk-ink-violet`, Objectif = `--risk-focus` bleu marine, Risque = `--risk-alerte` rouge brique, Issue = `--risk-text-muted` gris ardoise.
- **Feedback** : immédiat, binaire visuel. Zone fautive ne « rebondit » pas, se replace avec un trait de bord de couleur + message court (« C'est une issue, pas un risque : l'événement est déjà survenu »). Jamais de croix rouge ni de buzzer.
- **États** : vide / en cours / terminé (récap qualitatif sans score) / erreur (jamais bloquant) / en attente.

### Le Détective (O2 + O3)

- **Layout** : trois cases horizontales Cause / Événement / Conséquence reliées par filets sémantiques (le visuel rend la chaîne). Une case pré-remplie (« preuve »), deux à compléter. Micro-scénario contextuel au-dessus (2 lignes). Encart Théorie escamotable en dessous.
- **Métaphore visuelle** : fiche d'enquête typographique. Pas de Sherlock cosplay. Placeholder en italique Source Serif 4.
- **Interaction** : deux modes choisis par l'apprenant — *guidé* (banque de fragments à associer) et *libre* (saisie texte). Pas de mode imposé.
- **Feedback** : différé, qualitatif, par composant. Panneau latéral glissant depuis la droite. Formulation alternative défendable à comparer. État *raisonnement* (~1s) pour signifier que la machine évalue (donne du poids au retour).
- **Validation finale** : chaîne révélée typographiquement, filet `--risk-text-muted` entre les cases, sans animation Disney.

### Le Pari (O4 + O5)

- **Layout** : matrice 5×5 (deux tiers droits de l'écran), cellules 64×64px, axes Probabilité (vertical) × Impact (horizontal). Tiers gauche : panneau contextuel + curseur de contexte (POC / pré-prod / prod, ou taille équipe, ou criticité business). Sous la matrice : panel des stratégies (Éviter / Réduire / Transférer / Accepter).
- **Palette criticité triple-encodée** (teinte + trame + bordure, cf. §6) :
  - C1 : `#E2E8F0` uni
  - C2 : `#CBD5E1` uni
  - C3 : `#FBBF24` + trame diagonale fine
  - C4 : `#EA580C` + trame dense
  - C5 : `#991B1B` + trame croisée + bordure épaisse
- **Curseur** : disque blanc, bordure marine 2px, ombre douce (signature Linear).
- **Interaction** : drag du pion-risque sur une case. Au changement de contexte, **fantôme à la position recalculée + validation humaine requise** (Norman : l'agentivité reste à l'humain). Animation de glissement 300ms ease-out, traînée fantôme `opacity 0.3` à la position précédente.
- **Choix de stratégie** : boutons + champ texte court obligatoire pour argumenter.
- **Feedback** : auto-évaluation comparée — plusieurs choix défendables affichés avec leurs arguments. Pas de bonne réponse unique. Le moteur consigne la cohérence (argument vs choix), pas l'alignement à une vérité.

### Le Brouillard se lève (O6) — moment-signature

- **Layout pleine largeur** dominée par la scène centrale (carte du risque qui s'éclaircit). Gauche : énoncé + criticité initiale. Droite : palette d'artefacts inspectables (Spike / Prototype / Test / NFR / Métrique, 5 icônes Lucide alignées). Bas : zone de rédaction de la formulation de revue (5 champs canon §6).
- **État initial** : zone recouverte d'un calque de bruit blanc semi-transparent (`backdrop-filter: blur(8px)` + texture SVG noise). Criticité affichée mais palette désaturée. Bruit visuel comme métaphore d'incertitude (Apple Weather, Sentry).
- **Interaction** : choix d'artefact (clic) → **rédaction obligatoire de la conclusion en texte libre** (garde-fou anti cargo-cult). Tant que la conclusion n'est pas saisie, le brouillard ne se lève pas. Validation → animation 800ms ease-out : le flou se résorbe, le bruit s'efface, la couleur sature, l'artefact apparaît à droite en carte Source Serif 4.
- **Couleur réservée** : `--risk-reveal` `#0891B2` (cyan profond) pour le contour de la zone éclaircie. Couleur utilisée **uniquement** dans cette mécanique — c'est le « 1 % d'éclat ».
- **Pas de fanfare, pas de confetti, pas de check vert pulsant.** La satisfaction est dans la lisibilité retrouvée.
- **Feedback** : qualitatif sur chaque champ de la formulation de revue, exemple alternatif fourni.

---

## §4. Divulgation progressive

Trois dispositifs articulés, jamais cumulés (principe Cooper : trois niveaux choisis par l'utilisateur, pas empilés en pop-ups successives).

1. **Panneau Théorie escamotable** : présent sur chaque écran de mécanique, fermé par défaut. Rappel formel de la zone DOMAINE concernée.
2. **Tooltips contextuels** : uniquement sur les termes techniques (ROAM, NFR, leading indicator), au survol ou focus clavier. Jamais auto-affichés.
3. **Mode « voir le pourquoi »** : lien à côté de chaque commentaire d'évaluation qualitative, déroule l'argument pédagogique sous-jacent. À la demande, jamais imposé.

---

## §5. Microcopies — règles de ton

- **Réussite sans félicitation** : aucun « Bravo ! », aucun emoji, aucun confetti. Un filet horizontal `--risk-resolu` teal 3px sous le composant validé + texte court Inter 15px : *« Chaîne cohérente. »* ou *« Criticité ajustée au contexte. »*. Ton de pair, pas d'enseignant.
- **Erreur sans punition** : aucune croix rouge, aucun « Faux ! ». Case erronée conserve son contenu + trait gauche 3px `--risk-alerte` + commentaire structuré dessous (*« Ce que vous décrivez est l'événement, pas la cause. La cause répond à : pourquoi cet événement est-il possible ? »*). Erreur dédramatisée — elle est l'enseignement.
- **Insight / révélation** (rare) : fade 400ms, encadré filet 1px `--risk-reveal` cyan, fond `--risk-surface`, picto Lucide *Eye* discret, texte Source Serif 4 italique. 1-2 phrases max.

---

## §6. Système de tokens

### Couleur

**Neutres (l'écrin)**
- `--risk-bg` `#F7F8FA` — fond principal (gris-bleu lumineux, blanc froid)
- `--risk-surface` `#FFFFFF` — cartes
- `--risk-surface-alt` `#EEF1F6` — zones secondaires
- `--risk-text` `#0F172A` (slate-900) — texte principal
- `--risk-text-muted` `#475569` (slate-600) — légendes, méta
- `--risk-border` `#E2E8F0`
- `--risk-border-strong` `#94A3B8`

**Palette sémantique du risque**
- `--risk-alerte` `#B91C1C` — risque actif, événement à traiter
- `--risk-prevention` `#C2410C` — risque sous surveillance / mitigé
- `--risk-accepte` `#6B7280` — choix conscient d'accepter (pas une réussite, une reconnaissance)
- `--risk-resolu` `#0F766E` — risque réduit / résolu (teal, cohérent métaphore brouillard-qui-se-lève)

**Palette criticité (matrice 5×5) — triple encodage** (teinte + trame + bordure)
- C1 : `#E2E8F0` (slate-200) uni
- C2 : `#CBD5E1` (slate-300) uni
- C3 : `#FBBF24` (ambre-400) + trame diagonale fine
- C4 : `#EA580C` (orange-600) + trame dense
- C5 : `#991B1B` (rouge-800) + trame croisée + bordure épaisse

**Accents**
- `--risk-focus` `#1E40AF` — outline focus, liens, CTA primaire (accent froid commun avec Coach Objectifs)
- `--risk-reveal` `#0891B2` — exclusivement Le Brouillard se lève (couleur rare, donc précieuse)
- `--risk-ink-violet` `#5B21B6` — accent narratif ponctuel (parenté Coach Objectifs)

Tous les ratios testés ≥ 4,5:1 sur texte normal, ≥ 3:1 sur composants UI (WCAG 1.4.11).

### Typographie

- **Inter** (Google Fonts, weights 400/500/600/700) — corps, UI, libellés.
- **Source Serif 4** (Google Fonts, weights 400/600) — titres de section, citations doctrinales, formulations canoniques de risque. *Test borné sur 3-4 écrans pilotes ; fallback Inter Semibold si l'effet est trop précieux. En cas de fallback, Source Serif 4 reste réservée aux citations et formulations canoniques (rare = signal fort).*

**Échelle** (modulaire ratio 1.25, base 17px) :
- `xs` 13px (légendes méta)
- `sm` 15px (corps secondaire)
- `base` 17px (corps principal, plus grand que standard 16px — matière à lecture posée)
- `md` 21px (sous-titres)
- `lg` 28px (titres de section, Source Serif 4)
- `xl` 38px (titres de mécanique, rare)
- `xxl` 52px (accueil + Carte de maîtrise)

Interlignage 1.55 sur corps. Largeur de mesure 62-72 caractères.

### Espacement

Base 4px, multiples : 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64.

### Rayons

4 / 8 / 12 px uniquement. Pas de cartes très arrondies (signature « jeu mobile »), pas de carrés purs (sécheresse).

### Élévations

Trois ombres :
- `sm` (composant collé) : `0 1px 2px rgba(0,0,0,0.05)`
- `md` (panneau flottant) : `0 4px 12px rgba(0,0,0,0.08)`
- `lg` (modale) : `0 16px 32px rgba(0,0,0,0.12)`

Pas d'ombre colorée. Mode sombre prévu d'office (tokens en variables CSS).

### Iconographie

Lucide Icons (MIT, fork Feather). Linéaire 1.5px, grille 24×24, angles légèrement arrondis (rayon 1.5px). Pleines réservées aux états actifs.

---

## §7. Accessibilité — WCAG 2.1 AA non négociable

Sept points cibles spécifiques à cet outil :

1. **Palette risque non-couleur-seule** : alerte / prévention / accepté / résolu doublés d'une icône, texture, étiquette texte. Matrice 5×5 = trame en plus de la teinte.
2. **Drag-and-drop avec équivalent clavier complet** : Le Tri, Le Détective, Le Pari. Touches numériques, Tab, Espace, flèches, Entrée.
3. **Contraste AA** : 4.5:1 texte courant, 3:1 composants UI. Matrice 5×5 testée sur fond coloré (zone critique).
4. **Sémantique ARIA** : zones de dépôt (`role="region"`, `aria-label`), matrice (`role="grid"`, `gridcell`), panneau Théorie (`aria-expanded`, `aria-controls`).
5. **Feedback non visuel** : tout changement d'état annoncé par `aria-live="polite"` sur région dédiée.
6. **Focus visible et logique** : tabulation explicite, halo focus contrasté 3:1, `:focus-visible` distinct de `:hover`.
7. **Texte redimensionnable 200 %** sans rupture de mise en page (panneaux responsifs en largeur, pas tailles fixes).

---

## §8. Découpage en lots de livraison

**Lot 1a — Tronc commun phase 1** (livrable en autonomie)
- Hub + Carte de maîtrise hexagonale + 4 états qualitatifs
- Le Tri (mécanique complète + corpus de discrimination)
- Le Détective (modes guidé + libre, feedback qualitatif par composant)
- Théorie escamotable (§1, §2 DOMAINE)
- Système de tokens complet + mode sombre
- Accessibilité WCAG 2.1 AA

**Lot 1b — Tronc commun phase 2** (après stabilisation 1a)
- Le Pari (matrice 5×5 vivante + auto-évaluation comparée)
- Le Brouillard se lève (moment-signature avec rédaction obligatoire de conclusion)
- Procès du faux risque (onglet secondaire du hub)
- Théorie §3, §4, §5, §6
- Polissage animations (300/600/800ms)

**Lots 2, 3, 4** (post-tronc commun)
- Module Sprint, Module PI, Module OKR — spécialisations contextuelles, mêmes mécaniques avec corpus dédié.

---

## §9. Points à tester en pilote

Trois choix à valider en conditions réelles avant figeage :
1. **Hexagones** de la Carte de maîtrise (variante : rectangles si lecture « trop techno »).
2. **Source Serif 4** sur titres (variante : Inter Semibold si « trop précieux »).
3. **Le Brouillard se lève** ne doit pas être lu comme récompense (anti cargo-cult). Tester sur 3 apprenants.

---

## §10. Points d'attention production

- La sophistication du **feedback qualitatif** (Détective, Pari, Brouillard se lève) est un chèque tiré sur le moteur `RiskCoachEngine` (Panel 3). C'est le vrai goulot, pas l'UI.
- La tentation de simplifier les 4 états de tuile en binaire serait un **mensonge pédagogique** — défendre la granularité qualitative.
- La sobriété du fond est ce qui rend l'accent précieux. Toute demande de « rendre plus sympathique » serait à refuser argumentairement.
