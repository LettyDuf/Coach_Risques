# Note Direction Artistique — Coach Risques (V0.1)

*Pour Lætitia, coach Lean-Agile décideuse. Pair-à-pair. Session 1 — 2026-06-28.*

## 1. Identité visuelle — le ton à tenir

Le risque, regardé en face, n'est ni anxiogène ni festif. C'est une **vigilance lucide**. La matière du DOMAINE oscille entre deux pôles que la grammaire visuelle doit habiter sans choisir : la **rigueur tabulaire** (probabilité × impact, ROAM, leading/lagging — ça ressemble à un cockpit) et le **dégagement perceptif** (le brouillard qui se lève, la révélation après spike — ça ressemble à de la photographie). Refuser cette tension, c'est livrer soit un dashboard Atlassian (austère, lu comme corporate par un public déjà sceptique), soit une appli méditation pastel (lue comme niaise par le même public en moins de trois écrans).

Ton émotionnel cible : **calme attentif**. Posé, pas mou. Sérieux, pas grave. Curieux, pas excité. La page doit respirer comme une salle de réunion bien éclairée à 10h du matin, pas comme un *war room* sous néon ni comme un studio Headspace.

Familles d'identité que je convoque (sans copier — chaque référence pour un trait précis) :
- **Linear** pour la densité maîtrisée et l'élévation discrète (ombres très légères, fonds presque blancs).
- **Stripe Docs** pour la confiance qui émane d'un système typographique solide sans illustration tape-à-l'œil.
- **Are.na** pour la légitimité conférée par l'espace blanc et le refus de l'enrobage.
- **Edward Tufte** pour la conviction qu'une bonne matrice 5×5 vaut mille pictogrammes.
- **Brilliant.org** (et non Duolingo) pour la pédagogie pour adultes qui ne s'excuse pas d'être exigeante.
- *Refus explicite* : Notion (trop d'emoji), Asana (carnaval coloré), Trello (cartes-pastilles trop ludiques pour notre sujet).

Le « plaisir d'apprendre » exigé par Lætitia ne se produit pas par le décor — il se produit par la **lisibilité immédiate de ce qu'on apprend** et la **satisfaction du brouillard qui se dissipe**. C'est sur ces deux moments que je concentre la matière graphique, pas en saupoudrant des illustrations partout.

## 2. Palette de couleur porteuse de sens

Coach Objectifs tient sur lavande pâle + indigo/corail/teal. On reste dans la même famille (cohérence parent-enfant) mais on **bascule la dominante neutre vers un blanc froid** pour signifier la matière différente (Objectif = chaleur, ambition ; Risque = lucidité, distance). Lavande devient accent ponctuel, pas dominante.

**Neutres — l'écrin**
- `--risk-bg` `#F7F8FA` — gris-bleu lumineux, plus froid que la lavande de Coach Objectifs. Lit comme « du papier sous lumière naturelle ».
- `--risk-surface` `#FFFFFF` — cartes blanches, contraste max contenu/fond.
- `--risk-surface-alt` `#EEF1F6` — zones secondaires, panneaux contextuels.
- `--risk-text` `#0F172A` (slate-900) — texte principal. Ratio ~17:1 sur bg, AAA confortable.
- `--risk-text-muted` `#475569` (slate-600) — légendes, méta. Ratio 7,2:1 AA large.
- `--risk-border` `#E2E8F0`, `--risk-border-strong` `#94A3B8`.

**Palette sémantique du risque** (cohérente avec la doctrine ISO/PMBOK, distincte des codes feu tricolores tabous pour daltoniens)
- **Alerte / risque actif** `#B91C1C` (rouge brique sombre, pas vermillon). Distinct du corail Coach Objectifs (`#DC2626`) — un cran plus grave, signifie « il y a quelque chose à traiter ». Toujours doublé d'un picto trame ou d'une bordure épaisse pour ne jamais dépendre de la couleur seule (WCAG 1.4.1).
- **Prévention / mitigé** `#C2410C` (ambre sombre / orange brûlé). Cran intermédiaire, lu comme « surveillé, encadré ». Évite le jaune fluo (illisible sur fond clair, infantile).
- **Accepté** `#6B7280` (gris ardoise neutre). Délibérément neutre : *accepter* n'est pas *résoudre*, c'est *reconnaître*. Pas de vert ici — le vert dirait « bien joué », ce qui trahirait la doctrine.
- **Résolu / réduit** `#0F766E` (teal sombre, déjà présent en perspective sur Coach Objectifs). Pas vert sapin franc (lu comme « validation » Duolingo) ; teal = « éclairci, lisible désormais ». Cohérence avec la métaphore brouillard-qui-se-lève.

**Palette de criticité (matrice 5×5)** — l'erreur classique est d'utiliser un dégradé vert→rouge. Daltoniens exclus, et émotionnellement caricatural. Je propose un **dégradé séquentiel mono-ton + augmentation de densité de trame** :
- C1 (faible) `#E2E8F0` (slate-200, fond clair uni)
- C2 `#CBD5E1` (slate-300)
- C3 `#FBBF24` (ambre-400, glissement vers la chaleur, trame diagonale fine)
- C4 `#EA580C` (orange-600, trame plus dense)
- C5 (critique) `#991B1B` (rouge-800, trame croisée + bordure épaisse)

Triple redondance : **teinte** + **densité de trame** + **épaisseur de bordure**. Daltoniens et noir & blanc tiennent. Inspiration : ColorBrewer séquentiel + cartographie IGN.

**Couleur d'accent (CTA, focus, moments forts)**
- `--risk-focus` `#1E40AF` (bleu marine profond, ratio 9:1 AAA) — outline focus, liens, CTA primaire. C'est l'**accent froid commun** avec Coach Objectifs (qui utilise `#1E40AF` en théorie), signe de famille.
- `--risk-reveal` `#0891B2` (cyan profond) — utilisé uniquement pour le moment de révélation dans *Le Brouillard se lève*. Couleur rare, donc précieuse.

**Couleur narrative ponctuelle (rare)**
- `--risk-ink-violet` `#5B21B6` — hérité de la lavande Coach Objectifs, mais en saturation profonde. Utilisé en filet, en majuscules de section, en initiale capitale. Signe la parenté visuelle sans imposer la lavande dominante.

Tous les ratios contre `--risk-bg` `#F7F8FA` testés ≥ 4,5:1 pour le texte normal, ≥ 3:1 pour les éléments graphiques (WCAG 1.4.11). Le rouge brique `#B91C1C` sur blanc = 6,8:1 AA large.

## 3. Typographie

Deux familles, rôles tranchés.

**Inter** (Google Fonts, gratuite, weights 400/500/600/700) — corps, UI, libellés. Choix par défaut du Web sérieux contemporain (Linear, Vercel, Figma) parce qu'elle a été dessinée pour les écrans, sa hauteur d'x est généreuse, ses chiffres tabulaires sont natifs (essentiel pour la matrice 5×5), elle supporte parfaitement le français (cédilles, ligatures, accents). Coach Objectifs utilise les system fonts (`ui-sans-serif`) : on diverge légèrement ici pour donner une **signature plus tenue** au cousin Risques, sans rupture esthétique forte.

**Source Serif 4** (Google Fonts, gratuite, weights 400/600) — titres de section, citations doctrinales (Cohn, Reinertsen, Scrum Guide), formulations canoniques de risque. Le serif convoque la **précision éditoriale** — un risque bien rédigé est un acte d'écriture précis, le serif le matérialise. Évite Georgia (trop lue comme « blog »), évite Lora (trop romantique). Source Serif 4 est sobre, contemporaine, calibrée écran.

Pas de troisième famille — la mono des `tokens.css` Coach Objectifs n'a pas d'usage métier ici (pas de code à afficher).

**Échelle** (modulaire ratio 1,25, base 17px) :
- `xs` 13px — légendes méta, badges criticité.
- `sm` 15px — corps secondaire.
- `base` 17px — corps principal. **Plus grand que le standard 16px** : la matière demande de la lecture posée, pas du scan.
- `md` 21px — sous-titres, accroches.
- `lg` 28px — titres de section (Source Serif 4 à partir d'ici).
- `xl` 38px — titres de mécanique (rare, un par écran max).
- `xxl` 52px — réservé écran d'accueil et carte de maîtrise.

Interlignage 1,55 pour le corps (plus généreux que Coach Objectifs à 1,5 — la matière densément argumentative le réclame). Largeur de mesure 62 à 72 caractères, jamais au-delà.

## 4. Iconographie

**Oui aux icônes, non aux illustrations.** Frontière : une icône utile **désigne** (un statut, une action, une catégorie), une illustration **raconte**. La seconde est interdite pour notre public.

Style : **linéaire, 1,5px de trait constant, grille 24×24, angles légèrement arrondis (rayon 1,5px)**. Référence : Lucide Icons (open-source, fork de Feather) ou Phosphor (style *regular*). Lucide est intégrée à Linear, Vercel, beaucoup d'outils sérieux. Disponible librement, MIT.

Pas d'icônes pleines en dominante — elles alourdissent et tirent vers le mobile-game. Les pleines réservées aux **états actifs** (filtre sélectionné, mécanique en cours).

Métaphore visuelle récurrente pour le §6 *Brouillard se lève* : oui, mais discrète. Je propose un **motif de grain ou de bruit doux** (radial-gradient SVG) qui occupe les zones « incertaines » et se dissipe (opacité animée 0,4 → 0) quand l'artefact est produit. Pas de nuages dessinés, pas de météo cartoon. Le bruit visuel comme métaphore de l'incertitude est une convention installée (Apple Weather, Sentry, post-processing photo) — adulte, lisible.

## 5. Système visuel des 4 mécaniques

Cohérence du squelette (mêmes tokens, même typographie, même structure d'écran), parti pris chromatique distinctif sur **un seul accent** par mécanique.

**Le Tri (O1)** — discrimination forcée. Composant central : **trois zones de réception**, chacune coiffée d'une couleur sémantique du triptyque (Enjeu = `--risk-ink-violet`, Objectif = `--risk-focus` bleu marine, Risque = `--risk-alerte` rouge brique). Cartes-formulations à glisser. Feedback : la carte mal triée se replace avec un trait de couleur sur le bord (pas de croix rouge, pas de buzzer). Inspiration : Are.na, mécanique de classement Trello mais en dépouillé total.

**Le Détective (O2 + O3)** — enquête sur preuve partielle. **Grille 3 colonnes** (Cause / Événement / Conséquence) avec une seule remplie, deux à compléter. Métaphore visuelle : **fiche d'enquête** typographique, pas Sherlock cosplay. Les cases vides ont un fond `--risk-surface-alt` et un placeholder en italique Source Serif 4. Le composant validé révèle une **chaîne typographique** (les trois cases reliées par un filet fin `--risk-text-muted`), pas une animation Disney.

**Le Pari (O4 + O5)** — matrice 5×5 vivante. Le défi : la rendre lisible **et** séduisante. Réponse : **matrice mise en scène à la Tufte**. Cellules de 64×64px avec dégradé séquentiel (cf. §2). Curseur draggable matérialisé par un **disque blanc à bordure marine 2px et ombre douce** (signature Linear). Le panneau latéral droit (largeur 460px) raconte le contexte en Source Serif 4 — la matrice à gauche est froide, le récit à droite est éditorial. Quand le contexte bouge, **animation de glissement 300ms ease-out** du disque vers sa nouvelle case, traînée fantôme `opacity 0.3` à la position précédente. Voilà le ludique adulte : pas de paillettes, juste une mécanique fluide qui rend visible le déplacement de criticité.

**Le Brouillard se lève (O6)** — révélation. Le moment-signature de l'outil, à soigner. État initial : zone de la carte du risque recouverte d'un **calque de bruit blanc semi-transparent** (`backdrop-filter: blur(8px)` + texture SVG noise), criticité affichée mais palette désaturée. L'apprenant choisit son artefact (spike / proto / test / NFR / métrique — 5 icônes Lucide alignées en barre), **rédige sa conclusion** (champ texte obligatoire — cf. mitigation #3 du game designer), puis valide. Animation : le flou se résorbe sur **800ms ease-out**, le bruit s'efface, la couleur sature, l'artefact apparaît en carte Source Serif 4 à droite. **Pas de fanfare, pas de confetti, pas de check vert pulsant.** La satisfaction est dans la lisibilité retrouvée, point. Accent `--risk-reveal` `#0891B2` cyan utilisé pour le contour de la zone éclaircie.

## 6. Carte de maîtrise

Six zones DOMAINE, pas de paliers à débloquer (interdit D10). Je propose **ni carte territoriale, ni constellation, ni radar** — toutes ces métaphores tombent dans le travers ludique infantile (« explorez le continent du risque ! »).

Forme retenue : **grille hexagonale 2×3** (six hexagones jointifs, façon table périodique). Chaque hexagone porte le nom de la zone (Triptyque, Anatomie, Évaluation, Traitement, Indicateurs, Réduction-valeur), un sous-titre court, et un **anneau de remplissage** sur le pourtour (0 % à 100 %) qui matérialise la maîtrise constatée. L'anneau utilise `--risk-focus` (bleu marine) en couleur unique — pas de gradient bleu→vert qui dirait « bien joué ».

Justification : l'hexagone est **structuré sans être hiérarchique** (pas de centre, pas de haut/bas), il évoque l'inspection (alvéole, microscope) plus que la conquête (territoire, sommet). C'est l'opposé conceptuel de la métaphore d'ascension de Coach Objectifs (sommet = atteindre) : ici on **cartographie un terrain incertain**, on ne grimpe pas. La différenciation est sémantique, pas que graphique.

Variante envisageable si Lætitia trouve l'hexagone trop techno : **six cartes rectangulaires en grille 3×2**, même anneau de progression. Plus sobre encore, moins « tableau périodique ».

## 7. Ton des microcopies visuelles

**Réussite sans félicitation** : aucun « Bravo ! », aucun emoji, aucun confetti. Un **filet horizontal `--risk-resolu` teal de 3px** qui apparaît sous le composant validé, accompagné d'un texte court en Inter 15px : *« Chaîne cohérente. »* ou *« Criticité ajustée au contexte. »*. Le ton est celui d'un pair qui acquiesce, pas d'un enseignant qui distribue des bons points.

**Erreur sans punition** : aucune croix rouge, aucun « Faux ! ». La case erronée garde son contenu, gagne un **trait gauche de 3px en `--risk-alerte`** et un commentaire structuré dessous : *« Ce que vous décrivez est l'événement, pas la cause. La cause répond à : pourquoi cet événement est-il possible ? »*. C'est l'erreur dédramatisée du Panel 1.

**Insight / révélation** : moment unique de l'outil, à ne pas galvauder. Apparition douce (fade 400ms), encadré filet 1px `--risk-reveal` cyan, fond `--risk-surface`, picto Lucide *Eye* discret en en-tête, texte en Source Serif 4 italique. Une, deux phrases max. Le clinquant tuerait l'effet.

## 8. Rapport à Coach Objectifs

**Communs (parenté revendiquée)** : Inter pour le corps, accent froid `--color-focus` `#1E40AF` bleu marine identique, échelle d'espacement 4px, rayons 6/10/14px, ombres légères façon Linear, refus partagé de la mono et des emojis, accent violet ponctuel.

**Distinctifs (frontière nette)** : dominante neutre **blanc froid `#F7F8FA`** (vs lavande `#F3F1FA`), introduction de **Source Serif 4** pour les titres (vs sans-serif partout chez Objectifs), palette sémantique propre (rouge brique + teal + ambre sombre vs corail/teal/ocre), métaphore visuelle propre (hexagone-inspection vs sommet-ascension), couleur de révélation cyan absente chez Objectifs.

La métaphore guide naturellement la différenciation : Objectif = ce qu'on vise (chaleur, ambition, lavande tiède), Risque = ce qu'on examine (lucidité, distance, blanc froid). C'est un **diptyque coloré**, pas un clonage.

## 9. Critique de ma propre proposition

**Risque graphique principal** : le système peut être lu comme **trop sobre, trop Linear**, et trahir la promesse « plaisir d'apprendre » de Lætitia. Un DA rival (style Smashing Magazine, style Stripe Press) dirait : *« tu refuses tellement l'infantilisation que tu as oublié de séduire — ton outil ressemble à un dashboard d'audit, pas à un terrain d'apprentissage ».* L'objection est sérieuse.

**Mitigation** : concentrer la chaleur visuelle sur **trois moments rares** (l'écran d'accueil, le moment *Brouillard se lève*, la carte de maîtrise) où on s'autorise une typographie plus généreuse, une couleur plus saturée, un mouvement plus expressif. Le reste du temps, sobriété assumée. C'est la stratégie de Stripe : 99 % de discipline, 1 % d'éclat — et c'est dans le 1 % que se joue la mémorabilité.

**Deuxième risque** : Source Serif 4 sur des titres courts peut paraître précieux ou « blog littéraire ». Test à faire en V1 sur 3 ou 4 écrans avant figeage — fallback Inter Semibold 28px si l'effet ne porte pas.

## Recommandation tranchée

**Identité visuelle en une phrase** : *Une rigueur éditoriale apaisée — blanc froid, Inter et Source Serif 4, rouge brique pour l'alerte et teal pour la résolution, où la satisfaction naît du brouillard qui se dissipe, jamais d'une fanfare.*

**Trois décisions structurantes à tenir** :
1. Dominante neutre `#F7F8FA` blanc froid + duo typographique Inter / Source Serif 4 — la signature qui distingue Risques d'Objectifs sans rompre la famille.
2. Palette de criticité **triple-encodée** (teinte + trame + bordure) — accessibilité daltoniens non négociable, et signature visuelle distinctive de la matrice 5×5.
3. Le moment *Brouillard se lève* est le seul écran où on s'autorise une animation et une couleur rare (cyan `#0891B2`) — c'est là que l'outil gagne ou perd son public.

**Piège majeur à éviter** : céder à la chaleur partout pour « réchauffer » l'outil. Si tout est chaud, plus rien ne l'est, et le moment de révélation perd son éclat. La sobriété du fond est ce qui rend l'accent précieux — défendre cet équilibre contre toute demande de « rendre plus sympathique ».
