# Note UX-UI — Coach Risques (Panel 2)

*Pour Lætitia, coach Lean-Agile décideuse. Pair-à-pair avec le game designer dont je sers la grille validée.*
*Session 1 — 2026-06-28.*

## 1. Architecture d'information globale

Je tranche pour un **modèle hub-and-spoke**, pas pour un parcours linéaire. La raison est doctrinale autant qu'ergonomique : la décision D8 et l'interdit « narration héroïque englobante » disqualifient le tunnel de type Duolingo, et le public adulte expert refuse d'être conduit par le bout du nez. Le hub est la **Carte de maîtrise** ; les spokes sont les quatre mécaniques. Le mode défi *Procès du faux risque* est un onglet secondaire du hub, pas une cinquième case dans la carte (il est transverse, son statut visuel doit le dire).

Hiérarchie d'écrans, **trois niveaux maximum** : (1) Hub — Carte de maîtrise + accès Théorie + accès Mode défi ; (2) Écran de mécanique — une mécanique active à la fois, plein cadre ; (3) Panneau contextuel — Théorie escamotable, feedback détaillé, formulation de revue (overlay ou drawer latéral, jamais nouvel écran). Du hub à la production d'un premier risque rédigé : **deux clics** (hub → Le Détective, puis l'exercice se charge directement sur le premier item).

Le « moins de clics possibles » n'est **pas** le bon objectif ici. Krug s'applique à la navigation utilitaire ; la pédagogie a besoin de **paliers d'engagement** (Sweller : la charge cognitive doit être préparée). Un écran d'accueil de session qui annonce l'objectif d'apprentissage en une phrase (cf. note game designer §5) n'est pas un clic perdu, c'est un sas. En revanche, **zéro clic gratuit** : pas d'écran de transition décoratif, pas de loader avec mascotte.

## 2. Conception de la Carte de maîtrise

C'est la pièce centrale. Je la conçois comme une **constellation horizontale de six tuiles**, pas comme une carte au trésor ni comme un arbre de compétences. La métaphore cartographique est piégeuse — elle suggère un parcours, des frontières, une progression géographique, ce que la grille validée refuse explicitement (navigation libre, D9).

**Disposition** : six tuiles alignées en deux rangées de trois sur desktop large, en grille adaptative en deçà. Chaque tuile porte le nom de la zone (Triptyque, Anatomie, Évaluation, Traitement, Indicateurs, Réduction-valeur), une phrase d'intention (*« Distinguer enjeu, risque et issue »*) et un indicateur de maîtrise. Au survol, la tuile révèle quelle(s) mécanique(s) la nourri(ssen)t — une zone peut être travaillée par plusieurs mécaniques (le Pari nourrit Évaluation et Traitement). Cette résolution n×n est essentielle pour ne pas mentir : la matière n'est pas en silos.

**Indicateur de maîtrise — granularité qualitative à quatre états**, pas binaire (trop pauvre) ni numérique (interdit D10). Les quatre états : *non commencée* (tuile neutre, pas de fond coloré, étiquette « À découvrir »), *effleurée* (un exercice fait, fond très légèrement teinté, étiquette « Premiers pas »), *travaillée* (plusieurs passes avec succès partiel, fond teinté moyen, étiquette « En cours »), *consolidée* (réussite stable sur exercices variés, fond pleinement teinté, étiquette « Acquis »). Le passage entre états n'est jamais célébré par une animation festive — c'est un changement de statut, pas une récompense. Anki est le modèle : le rappel espacé colore les cartes selon leur stabilité, sans confettis.

La consolidation se mérite **par variation**, pas par répétition — on ne passe à *consolidée* qu'après avoir réussi des exercices de formulations différentes, ce qui empêche le farming. C'est la leçon Brilliant : la maîtrise se prouve sur de nouveaux items, pas sur la rejouabilité du même.

## 3. Design des 4 mécaniques

### Le Tri (O1)

**Layout** : un volet gauche fixe affiche une formulation libre (*« Le client risque de partir »*). À droite, quatre zones de dépôt étiquetées Enjeu / Objectif / Risque / Issue, disposées en quadrant 2×2 pour rappeler leur symétrie conceptuelle (les deux du haut sont *avant action*, les deux du bas sont *en cours ou avéré*). Sous chaque zone, un mini-glossaire d'une ligne escamotable.

**Interaction** : drag-and-drop de la formulation vers une zone, doublé d'un raccourci clavier (1/2/3/4) pour l'accessibilité et la vitesse de l'expert. Pas de saisie texte ici — c'est un exercice de discrimination, pas de production.

**Feedback** : immédiat et binaire visuel (la zone valide se confirme, la zone fautive se rétracte avec un message court : *« C'est une issue, pas un risque : l'événement est déjà survenu »*). L'erreur s'accompagne d'un contraste explicite avec la bonne réponse, jamais d'une moquerie ni d'un « réessayez ». Compteur silencieux des trois dernières formulations pour calibrer la difficulté suivante, jamais affiché.

**États** : vide (instructions courtes), en cours (item courant + indicateur de position dans la série, ex. *« 3 sur 7 »*), terminé (récap qualitatif des composants confondus, pas de score), erreur (jamais bloquant — toujours rejouable), en attente (skeleton léger, pas de spinner théâtral).

### Le Détective (O2 + O3)

**Layout** : trois cases horizontales étiquetées Cause / Événement / Conséquence, séparées par des flèches sémantiques (le visuel rend la chaîne). Une case est pré-remplie en dur (la *preuve*), les deux autres sont à compléter. Au-dessus, le micro-scénario contextuel (deux lignes). En dessous, un encart Théorie escamotable rappelant la forme canonique.

**Interaction** : deux modes selon la difficulté. Mode *guidé* : banque de fragments à associer (drag-and-drop ou clic). Mode *libre* : saisie texte directe dans chaque case. Le passage de l'un à l'autre est explicite et choisi par l'apprenant, pas imposé.

**Feedback** : différé et qualitatif (D9), structuré par composant — l'évaluation distingue la cause juste de l'événement juste de la conséquence juste, avec un commentaire par case. Affiché dans un panneau latéral qui glisse depuis la droite, pas en modal bloquante. Une formulation alternative défendable est proposée à côté de celle de l'apprenant pour comparer, pas pour noter.

**États** : tous standards, plus un état *raisonnement* — petit affichage transitoire pendant l'évaluation moteur (~1 seconde) pour signifier que la machine *réfléchit*, ce qui donne du poids au retour qualitatif.

### Le Pari (O4 + O5)

**Layout** : matrice 5×5 occupant les deux tiers droits de l'écran, axes Probabilité (vertical) et Impact (horizontal), cellules colorées par zone de criticité. Tiers gauche : panneau contextuel décrivant la situation, un *curseur de contexte* (selecteur d'environnement : POC / pré-prod / prod, ou taille d'équipe, ou criticité business). Sous la matrice : panel des stratégies de traitement (Éviter / Réduire / Transférer / Accepter) avec coût qualitatif et effet attendu.

**Interaction** : l'apprenant fait glisser un pion-risque sur une case de la matrice. Quand il change le curseur de contexte, le pion ne bouge **pas tout seul** — un fantôme apparaît à la position recalculée, l'apprenant doit *valider le déplacement* (Norman : l'agentivité reste à l'humain, la machine suggère). Puis choix de stratégie via boutons, avec argument à écrire en deux lignes (champ texte court, obligatoire).

**Feedback** : *auto-évaluation comparée* (D9) — après validation, plusieurs choix défendables s'affichent avec leurs arguments respectifs ; pas de bonne réponse unique. L'apprenant compare son raisonnement, peut le réviser, le moteur consigne sa cohérence (a-t-il argumenté ce qu'il a choisi ?), pas son alignement à une vérité.

**États** : un état particulier *contexte changé* qui distingue visuellement l'avant et l'après, essentiel pour ancrer le piège §3.

### Le Brouillard se lève (O6)

**Layout** : pleine largeur dominée par une **scène visuelle centrale** — la « carte du risque » qui s'éclaircit. À gauche, l'énoncé du risque et son niveau de criticité initial. À droite, palette d'artefacts inspectables (spike, prototype, test, NFR, métrique). En bas, zone de rédaction de la *formulation de revue* (cinq champs structurés selon le canon §6).

**Interaction** : l'apprenant choisit un artefact (clic), puis **doit rédiger la conclusion de l'artefact** en texte libre (garde-fou explicite du game designer, anti-cargo cult). Tant que la conclusion n'est pas saisie, le brouillard ne se lève pas. Une fois validée, animation de levée (sobre, 600ms, easing naturel) et recalcul visible de la criticité.

**Feedback** : qualitatif sur la formulation de revue (chaque champ commenté), avec exemple de formulation alternative. Pas d'animation de victoire.

**États** : *brouillard* (initial), *artefact choisi sans conclusion* (artefact visible mais grisé, message d'invite), *éclaircie* (clarté visuelle + formulation à compléter), *prêt pour la revue* (panneau imprimable/copiable de la formulation type).

## 4. Parcours utilisateur

**Premier passage**. Ouverture de l'app : le hub apparaît. Pas de pop-up de bienvenue ni de tour guidé imposé (insulte au pro). Une bannière sobre en haut : *« Bienvenue. On vous recommande de commencer par Le Tri. »* — cliquable, escamotable, jamais réaffichée. Les six tuiles de la Carte sont toutes en état *non commencée*. L'apprenant clique sur Le Tri. Écran de mécanique : phrase d'objectif d'apprentissage en haut (Sweller : préparer la charge), première formulation, action. Après six à huit items, écran de fin de session : récap qualitatif, suggestion d'enchaîner avec Le Détective *si* la zone Triptyque s'est consolidée, sinon suggestion de rejouer. Retour au hub : la tuile Triptyque change de statut, visiblement mais sans festivité.

**Reprise**. Le hub mémorise l'état. À l'ouverture, une mention discrète sous la bannière : *« Reprendre Le Détective où vous vous êtes arrêté »* (un bouton, pas un overlay). L'apprenant clique, retour exact à l'item où il était. Pas de rejouer-depuis-le-début imposé.

**Frictions à neutraliser**. Trois identifiées. (1) *Le choc du jargon ISO en arrivant* : la bannière d'accueil ne doit pas employer un seul terme métier — c'est sur la première tuile cliquée que la précision s'invite. (2) *La sensation de répétition à la troisième session* : varier les micro-scénarios sur des contextes métier différents (logiciel, événementiel, industriel), tirage pseudo-aléatoire pondéré par les contextes encore inconnus de l'apprenant. (3) *La frustration sur l'évaluation qualitative* (« le moteur me dit que ma cause est mal formulée, je ne comprends pas pourquoi ») : le commentaire qualitatif doit toujours pointer un *contraste précis* (votre formulation vs alternative défendable), pas un jugement abstrait.

## 5. Divulgation progressive

Trois dispositifs articulés, jamais cumulés.

**Panneau Théorie escamotable** présent sur chaque écran de mécanique, fermé par défaut, ouvert par l'apprenant. Contenu : rappel formel de la zone DOMAINE concernée. Cooper : l'expert n'a pas besoin de lire ce qu'il sait, le débutant doit pouvoir y accéder en un clic sans changer d'écran.

**Tooltips contextuels** uniquement sur les termes techniques (ROAM, NFR, leading indicator) — au survol ou au focus clavier, jamais auto-affichés. Définition courte, lien optionnel vers le panneau Théorie.

**Mode « voir le pourquoi »** sur les feedbacks qualitatifs — un lien *« Pourquoi ? »* à côté de chaque commentaire d'évaluation, qui déroule l'argument pédagogique sous-jacent (ex. *« Pourquoi cette formulation est-elle une tautologie ? »*). Activé à la demande, jamais imposé.

Le principe Cooper : **trois niveaux de profondeur, choisis par l'utilisateur, jamais empilés en pop-ups successives**.

## 6. Accessibilité (WCAG 2.1 AA) — sept points spécifiques

(1) **Palette risque non-couleur-seule** : alerte / prévention / accepté / résolu doivent être distingués par couleur **et** par une seconde marque (icône, texture de fond, étiquette texte). La matrice 5×5 doit avoir un motif (hachures, points) en plus de la teinte.
(2) **Drag-and-drop avec équivalent clavier complet** : Le Tri, Le Détective et Le Pari sont opérables au clavier (touches numériques, Tab, Espace pour saisir, flèches pour déplacer, Entrée pour valider).
(3) **Contraste AA minimum 4.5:1** sur le texte courant et 3:1 sur les composants UI ; la matrice 5×5 doit tester contraste sur fond coloré (zone critique).
(4) **Sémantique ARIA** sur les zones de dépôt (`role="region"`, `aria-label` explicite), sur la matrice (`role="grid"`, cellules `role="gridcell"`), sur le panneau Théorie escamotable (`aria-expanded`, `aria-controls`).
(5) **Feedback non visuel** : tout changement d'état (validation, erreur, ouverture de panneau) doit être annoncé par `aria-live="polite"` sur une région dédiée, pour les lecteurs d'écran.
(6) **Focus visible et logique** : ordre de tabulation explicite, halo de focus contrasté (3:1 contre l'environnement), `:focus-visible` distinct du `:hover`.
(7) **Texte redimensionnable jusqu'à 200%** sans rupture de mise en page (les panneaux latéraux doivent être responsifs en largeur, pas en taille fixe).

## 7. Tokens de design

**Typographie** : deux familles. Une grotesque géométrique pour l'UI et les titres (Inter ou équivalent libre), une serif lisible pour les énoncés et formulations (Source Serif Pro ou équivalent) — la serif signale qu'on entre dans le territoire du texte à lire, pas à scanner. Échelle modulaire ratio 1.25 : 12 / 14 / 16 / 20 / 25 / 31 / 39. Hiérarchie : `body 16`, `body-sm 14`, `caption 12`, `h3 20`, `h2 25`, `h1 31`. Pas de h4-h5-h6, ils ne servent à rien et invitent à empiler des niveaux qu'on ne hiérarchisera pas.

**Espacement** : échelle base 4px, multiples 4/8/12/16/24/32/48/64. Pas plus de granularité, sinon dérive.

**Couleur** : palette neutre tons froids (gris bleutés) en 9 niveaux (50→900), **plus** une palette sémantique du risque assumée : *alerte* (rouge profond #B91C1C-like), *prévention* (ambre #B45309), *accepté* (gris-bleu #475569 — l'accepté n'est pas une réussite, c'est un choix conscient), *résolu* (vert sobre #047857). Et une couleur d'accent unique pour l'action UI (bleu encre #1E3A8A) — pas la couleur sémantique du risque, qui doit rester réservée au sens métier. Pas de couleur pure (saturée à 100%), tout est rabattu pour la maturité visuelle. Tons clairs et tons sombres, mode sombre prévu d'office (tokens en variables CSS).

**Rayons** : 4 / 8 / 12 px, jamais plus. Pas de cartes très arrondies (signature « jeu mobile »), pas de carrés purs (sécheresse).

**Élévations** : trois ombres seulement — `sm` (composant collé, 0 1px 2px), `md` (panneau qui flotte, 0 4px 12px), `lg` (modale, 0 16px 32px). Pas d'ombre colorée.

## 8. Critique de ma propre proposition

**Principal risque UX**. Ma proposition repose lourdement sur la qualité du **feedback qualitatif différé** (Détective, Pari, Brouillard se lève). Si le moteur d'évaluation produit des commentaires génériques ou approximatifs, l'apprenant adulte perd confiance en quatre exercices et l'outil meurt. La sophistication promise (contraste précis, formulation alternative) est un chèque tiré sur le panel 3 (architecte) et sur la qualité du corpus — ce n'est pas un risque UX, c'est un risque système que mon design rend visible. À surveiller.

**Objection d'un UX-UI rival**. Un confrère pourrait dire : *« tu sur-conçois — six états de tuile, trois niveaux de divulgation, quatre mécaniques aux layouts distincts, deux familles typo. Tu construis un système de design pour 30 écrans alors qu'il y en a 7. Tu vas livrer en retard et incohérent. »* L'objection a du mordant. Ma défense : la matière exige cette précision (un état binaire de tuile mentirait, une seule mécanique uniforme écraserait la variété pédagogique). Mais il a raison sur le risque de production — d'où la recommandation ci-dessous.

**Le design colonise-t-il la pédagogie ?** Sur Le Brouillard se lève, oui, partiellement — l'animation de levée de brume risque d'être lue comme la récompense, pas comme la signification de la réduction d'incertitude. Le game designer l'a vu (anti-cargo cult). Mon garde-fou (rédaction obligatoire de la conclusion avant levée) déplace le risque sans l'éliminer. À tester sur trois apprenants avant figeage.

## Recommandation tranchée

**À tenir absolument** : hub-and-spoke autour de la Carte de maîtrise (pas de parcours), quatre layouts distincts mais grammaire UI commune (tokens, états, divulgation), palette sémantique du risque avec marque non-couleur, drag-and-drop systématiquement doublé clavier, panneau Théorie escamotable présent partout. **À surveiller** : la qualité du feedback qualitatif (vrai goulot), le risque que Le Brouillard se lève soit lu comme récompense (tester), la tentation en production de simplifier les états de tuile en binaire (ce serait un mensonge pédagogique). **Décision V1 si arbitrage** : livrer Le Tri et Le Détective polis avant d'ouvrir Le Pari et Le Brouillard, plutôt que quatre médiocres. Le panel 1 disait la même chose en game design.
