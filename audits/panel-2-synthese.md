# Panel 2 — Synthèse pour validation Lætitia

*Session 1 — 2026-06-28. Sorties croisées : `panel-2-ux-ui.md` + `panel-2-graphiste.md`. Ma synthèse argumentée et les points d'arbitrage qui te reviennent.*

## Convergences fortes — acquises sauf objection

Les deux experts convergent sur l'essentiel. Si tu valides la synthèse globale, ces points sont figés.

1. **Architecture hub-and-spoke** autour de la Carte de maîtrise — pas de parcours linéaire imposé. Le hub mémorise l'état, reprend où on s'est arrêté.

2. **Trois niveaux d'écran maximum** : Hub / Écran de mécanique / Panneau contextuel escamotable. Pas de tunnel multipage.

3. **Granularité qualitative à 4 états** sur la maîtrise (non commencée / effleurée / travaillée / consolidée) — pas binaire (mensonge pédagogique), pas numérique (interdit D10). Inspiration Anki/Brilliant.

4. **Une zone peut être nourrie par plusieurs mécaniques** (Le Pari nourrit Évaluation + Traitement). La carte révèle ces liens au survol. Pas de silos.

5. **Consolidation par variation, pas par farming** : on ne marque comme « consolidée » qu'après réussite sur des items différents. Empêche la rejouabilité opportuniste.

6. **Divulgation progressive en trois dispositifs** : Panneau Théorie escamotable, tooltips contextuels sur termes techniques, mode « voir le pourquoi » sur les feedbacks qualitatifs. Choisis par l'utilisateur, jamais empilés.

7. **Drag-and-drop systématiquement doublé clavier** (accessibilité + vitesse de l'expert).

8. **Microcopies sans félicitation ni punition** : un filet teal pour acquiescer (« Chaîne cohérente. »), un trait alerte gauche pour pointer (« Ce que vous décrivez est l'événement, pas la cause. La cause répond à : pourquoi cet événement est-il possible ? »). Le ton est celui d'un pair, pas d'un enseignant.

9. **Le Brouillard se lève est le moment-signature de l'outil**. Sobriété du reste, éclat ici (cyan rare, animation 600-800ms). Garde-fou : rédaction obligatoire de la conclusion d'artefact avant levée de brouillard (anti cargo-cult).

10. **Cohérence parent-enfant avec Coach Objectifs** : accent froid `#1E40AF` bleu marine commun, échelle 4px, refus mono/emoji partagé. Différenciation par la dominante neutre (blanc froid `#F7F8FA` vs lavande), par l'introduction de Source Serif 4 pour les titres et énoncés, par la métaphore (inspection hexagonale vs sommet d'ascension).

11. **Accessibilité WCAG 2.1 AA non négociable** : 7 points spécifiques listés (palette risque non-couleur-seule, drag clavier, contraste 4.5:1 sur texte, sémantique ARIA, feedback aria-live, focus visible, texte zoomable 200%). Palette criticité **triple-encodée** (teinte + trame + bordure).

## Tensions à arbitrer

### Tension 1 — Forme de la Carte de maîtrise

L'UX-UI propose une **constellation horizontale de six tuiles 2×3** (justifié par anti-métaphore territoriale).
Le graphiste propose une **grille hexagonale 2×3 façon table périodique** (justifié par anti-conquête + métaphore d'inspection alvéolaire).
Le graphiste propose une variante de repli : **six cartes rectangulaires 3×2** si l'hexagone est trop techno.

Mon avis : **hexagones**. La métaphore d'inspection alvéolaire est plus alignée avec la matière du risque (on cartographie un terrain incertain, on ne le conquiert pas) et c'est une signature visuelle distinctive qui démarque proprement Coach Risques de Coach Objectifs sans rupture. Le risque « trop techno » est réel mais maîtrisable par l'anneau de remplissage sobre (pas de hex couleur fluo). On garde la variante rectangulaire en repli si test négatif.

### Tension 2 — Source Serif 4 sur les titres et énoncés

Le graphiste propose ce duo Inter + Source Serif 4 comme **signature distinctive**.
Il admet lui-même un risque (« précieux ou blog littéraire ») et propose un test sur 3-4 écrans avant figeage.
L'UX-UI valide « deux familles » sans trancher.

Mon avis : **on tente**, c'est cohérent avec « la précision verbale compte » sur ce sujet. Mais on borne : si après 3 écrans pilotes le rendu paraît précieux, fallback Inter Semibold pour les titres et Source Serif 4 réservé aux **citations doctrinales et formulations canoniques** (un usage rare = un signal fort).

### Tension 3 — Bande passante de production

Les deux experts pointent le risque : la sophistication (4 mécaniques distinctes, états multiples, feedback qualitatif sophistiqué) peut produire une V1 incohérente si on étale.

Recommandation convergente : **livrer Le Tri et Le Détective polis avant d'ouvrir Le Pari et Le Brouillard se lève**, plutôt que quatre mécaniques médiocres. C'est cohérent avec le panel 1 (game designer disait la même chose). Ça veut dire que **le Lot 1 du tronc commun se livre en deux temps** : Lot 1a = Le Tri + Le Détective + la Carte de maîtrise + la Théorie, livrable en autonomie ; Lot 1b = Le Pari + Le Brouillard se lève (avec son moment-signature) + Procès du faux risque, livré après stabilisation du 1a.

## Points qui restent ouverts pour toi

1. **Tu valides la forme hexagonale de la Carte de maîtrise** (vs rectangles, vs constellation simple) ?

2. **Tu valides le duo typographique Inter + Source Serif 4** avec test borné sur 3-4 écrans (et fallback Inter Semibold si l'effet ne porte pas) ?

3. **Tu valides le découpage Lot 1a (Tri + Détective + Carte) puis Lot 1b (Pari + Brouillard + Procès)** ? Ou tu préfères livrer les 4 mécaniques d'un bloc même si la qualité s'étale ?

4. **Tu valides la palette sémantique du risque** (alerte rouge brique #B91C1C, prévention ambre #C2410C, accepté gris ardoise #6B7280 — « accepter n'est pas réussir », résolu teal #0F766E) ? Ce sont des choix doctrinaux, pas que graphiques.

5. **Tu valides l'usage du cyan `#0891B2` réservé exclusivement au moment Brouillard se lève** ? C'est le pari du graphiste sur le « 1% d'éclat ».

6. **Variante envisagée — Le mode défi (Procès du faux risque) en onglet secondaire du hub** plutôt que case de la Carte. UX-UI tranche pour onglet (cohérent avec son statut transverse), tu valides ?

## Ce qui se passe ensuite

- Tu valides cette synthèse (avec ou sans amendements).
- Je consigne dans `DOMAINE.md` ou un nouveau fichier `UX-UI.md` (à toi de me dire si tu préfères tout dans DOMAINE ou séparer).
- Ajout dans `DECISIONS.md` : D11 (architecture UX hub-and-spoke), D12 (palette + typo), D13 (découpage Lot 1a / 1b).
- **Panel 3 — Architecte logiciel** lancé sur la base de la grille pédagogique + UX/UI validées. Mission : structurer le moteur `RiskCoachEngine` pour porter l'évaluation qualitative attendue (gros défi technique pointé par l'UX), définir les ports/adaptateurs, plan de tests.
- Puis bases techniques (package.json, vite.config, arborescence), puis code du Lot 1a.
