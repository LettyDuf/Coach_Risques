# Note Game Design — Coach Risques (V0.1)

*Pour le panel de conception pédagogique. Posture : pair-à-pair avec la coach Lean-Agile décideuse.*
*Session 1 — 2026-06-28.*

## 1. Ce qui est déjà ludique dans la matière

La matière du risque a une qualité rare : **elle est nativement ludique**, à condition de la regarder comme un game designer et non comme un consultant en management. La définition ISO 31000 — *« effet de l'incertitude sur les objectifs »* — n'est pas un concept aride, c'est littéralement la définition d'un mécanisme de jeu. Sans incertitude, pas de jeu : Sid Meier l'a formulé en une ligne (*« a game is a series of interesting decisions »*), et une décision n'est intéressante que si son issue est incertaine.

Trois gisements ludiques dans DOMAINE.md :

**Le pari probabilité × impact (§3)** est une mécanique d'*expected value* — celle qui tient Poker, Magic the Gathering, XCOM, ou Slay the Spire. L'apprenant doit composer avec une combinatoire 5×5 où le bon coup n'est pas le plus probable ni le plus impactant pris isolément, mais leur produit pondéré par le coût de traitement. C'est un jeu de gestion de risque au sens littéral.

**Le triptyque cause → événement → conséquence (§2)** est une mécanique d'**enquête**. Quand on lit « le serveur peut tomber », il manque deux pièces et l'apprenant doit jouer au détective pour reconstituer la chaîne. C'est la mécanique de Return of the Obra Dinn, d'Her Story, de Sherlock Holmes Consulting Detective — déduction sur preuves partielles.

**Le choix de traitement Éviter / Réduire / Transférer / Accepter (§4)** est une mécanique de **stratège** : ressources contraintes, options aux coûts/bénéfices asymétriques, conséquences décalées dans le temps. C'est la mécanique de FTL, de This War of Mine, des jeux 4X. Et le ROAM SAFe ajoute l'enjeu de **statut public** (Owned vs Accepted) — qui prend la responsabilité, devant qui — soit de la matière sociale, donc encore ludique.

Et le §6 (réduction de risque comme valeur livrée) est le plus beau gisement : il dramatise un acte pédagogique habituellement invisible (« j'ai purgé une incertitude »). Mécanique de **révélation** : avant le spike, brouillard ; après, clarté. C'est satisfaisant à représenter visuellement.

## 2. Cadre théorique mobilisé

Je convoque trois cadres et un seul, en justifiant pourquoi pas les autres.

**MDA (Hunicke, LeBlanc, Zubek)** est central ici parce que la doctrine projet exige que la pédagogie/ludique soit dans le domaine, indépendante de l'UI (architecture hexagonale, D8). MDA force exactement cette discipline : on conçoit d'abord les **Aesthetics** visés (l'expérience émotionnelle de l'apprenant — ici je dirais *Discovery* et *Challenge* au sens Hunicke, pas *Fantasy* ni *Submission*), puis les **Dynamics** qui les produisent (le pari raisonné, l'enquête, le débat intérieur), puis les **Mechanics** qui les enclenchent (les composants concrets manipulés). Coach Objectifs a sauté cette étape — il a ses QCM et grilles d'abord — et c'est pour ça qu'on hérite d'un constat « gamification superficielle ». Ne pas refaire.

**Flow (Csíkszentmihályi)** est mobilisable mais sous conditions : la matière n'a pas l'instantanéité d'un jeu d'action. La boucle d'apprentissage du risque est lente (réfléchir à une cause, ce n'est pas réagir à un sprite). Le Flow ici se travaille par **clarté de l'objectif d'exercice** et **feedback immédiat sur la qualité de la formulation**, pas par accélération. C'est du Flow type *jeu de réflexion* (cf. Threes, Baba Is You), pas du Flow type *Tetris*.

**Octalysis (Yu-kai Chou)** : sur les huit *core drives*, j'en active explicitement trois et j'en interdis trois.

- **Activés** : *Epic Meaning* (l'apprenant développe une compétence rare et valorisée — « les coachs Agile expérimentés savent rédiger un risque, c'est un marqueur de séniorité »), *Development & Accomplishment* (progression visible de maîtrise), *Unpredictability* (par construction — c'est l'objet même de la discipline).
- **Interdits** : *Scarcity* (pas de timers artificiels), *Loss Avoidance* (pas de streaks à perdre — c'est précisément le piège dénoncé par les pros), *Social Influence* infantilisant (pas de leaderboard public d'apprenants).

Je n'utilise **pas** Bartle (Killer/Achiever/Socializer/Explorer) parce que la taxonomie a été pensée pour les MUDs multijoueurs persistants — Coach Risques est solo. La taxonomie pertinente ici serait plutôt Lazzaro (*Hard Fun / Easy Fun / Serious Fun / People Fun*), où **Hard Fun** (résoudre des défis bien dosés) et **Serious Fun** (apprendre quelque chose d'utile dans la vraie vie) sont les deux registres à servir prioritairement.

## 3. Mécaniques candidates

Cinq propositions, classées par maturité de la justification pédagogique.

### Mécanique 1 — « Le Détective » (reconstitution de chaîne)

**Intention ludique** : faire vivre la déduction sur preuve partielle. L'apprenant reçoit un fragment (par exemple une conséquence : *« nous avons perdu deux jours de sprint »*) et doit reconstituer la cause et l'événement plausibles. Inverser le sens parfois : donner la cause, faire trouver l'événement et la conséquence.
**Apprentissage visé** : intérioriser que les trois composants (§2) sont **interdépendants** et qu'aucun ne tient seul. Démonter les anti-patterns de §2 de l'intérieur.
**Écran type** : trois cases (Cause / Événement / Conséquence), une remplie en dur, deux à compléter avec assistance (suggestions, ou banque de phrases à associer dans les premiers exercices, puis rédaction libre). Feedback : le moteur vérifie la cohérence de la chaîne, pas seulement la grammaire.

### Mécanique 2 — « Le Pari » (matrice 5×5 vivante)

**Intention ludique** : transformer la grille probabilité×impact en mécanique de décision, pas en tableau Excel. L'apprenant lit une situation, positionne le risque sur la matrice, puis le moteur révèle un *scénario plausible alternatif* (« et si on était en pré-prod plutôt qu'en POC ? ») qui décale le curseur. Il apprend que **la criticité dépend du contexte**, pas du risque pris en absolu (§3, piège 2).
**Apprentissage visé** : neutraliser le réflexe « probabilité = chiffre objectif » et installer la conscience contextuelle.
**Écran type** : matrice 5×5 colorée, curseur draggable, panneau latéral qui décrit la situation et change le contexte ; un *avant/après* explicite quand le contexte bouge.

### Mécanique 3 — « Le Brouillard se lève » (réduction de risque = valeur)

**Intention ludique** : représenter visuellement la valeur du §6, qui est le pilier doctrinal. Avant le spike : zone brumeuse, criticité haute, artefacts grisés. L'apprenant choisit une action de réduction (spike / prototype / test / NFR / métrique). Après : le brouillard se lève sur la zone concernée, criticité recalculée, artefact « inspectable » apparaît cliquable. Inspiré de la mécanique *fog of war* des 4X, détournée pour signifier réduction d'incertitude.
**Apprentissage visé** : ancrer que la réduction de risque **est** de la valeur (thèse du §6), et qu'elle exige un artefact (le garde-fou non négociable). Sans artefact choisi, le brouillard ne se lève pas — la mécanique enseigne la discipline.
**Écran type** : carte du risque avec halo flou, palette d'artefacts à choisir, animation de levée de brouillard, panneau de formulation de revue généré (cf. §6 « Formulation type »).

### Mécanique 4 — « Le Tribunal du PI » (ROAM social)

**Intention ludique** : mettre en scène le moment ROAM en PI Planning. Plusieurs risques sont posés sur la table, l'apprenant doit en assigner un statut (R/O/A/M) **et trouver un porteur**. Surcouche : le moteur joue le rôle d'autres voix (« le RTE objecte : *qui owned, concrètement ?* ») et conteste les Accepted trop faciles.
**Apprentissage visé** : faire vivre que ROAM n'est pas un tag mais une **prise de responsabilité publique**, ce qui est invisible en QCM.
**Écran type** : plateau avec quatre colonnes (R/O/A/M), cartes risques à glisser, dialogue d'objection contextuel.

### Mécanique 5 — « Le Capteur » (leading vs lagging)

**Intention ludique** : présenter un risque et une bibliothèque d'indicateurs candidats (mélangés en/exclus, leading/lagging, contrôlables/non). L'apprenant compose son dispositif de surveillance et le moteur le critique : *« vous n'avez choisi que des lagging — vous saurez quand ce sera trop tard »*.
**Apprentissage visé** : §5, qui est court mais critique. La distinction leading/lagging passe mal en exposé, très bien en composition.
**Écran type** : panel d'indicateurs draggables vers une zone « dispositif », contrainte explicite *au moins 1 leading + 1 lagging*.

## 4. Narration / fil rouge

Question piégée. La tentation est de coller un avatar « vous êtes risk manager du projet Atlantis » à toute l'expérience. Je tranche : **non à la narration enveloppante, oui à des micro-scénarios situés.**

Pourquoi non au fil narratif : (a) public adulte sceptique de la gamification, le scénario « héros » sera lu comme infantilisant ; (b) coût de production des arcs narratifs élevé, gain pédagogique faible ; (c) la matière du risque parle déjà aux situations professionnelles vécues — le contexte projet de l'apprenant **est** le scénario.

Pourquoi oui aux micro-scénarios : chaque exercice gagne à être ancré dans une situation crédible et brève (deux lignes : *« Sprint 3, votre équipe a une dépendance non levée sur l'API d'un partenaire, le PO veut promettre la démo à un client »*). Cela active le *Serious Fun* de Lazzaro — l'apprenant transfère immédiatement à son réel.

Posture de l'apprenant : ni risk manager (trop corporate, sent ISO 31000), ni capitaine de navire (cliché). Je propose **« coach interne »** — celui qui aide une équipe à mieux nommer son risque. Cohérent avec le public visé (équipes Lean-Agile) et avec le voisin Coach Objectifs.

## 5. Progression et Flow

Le Flow pour cette matière se gagne sur trois leviers, pas sur le rythme.

**Clarté de l'objectif d'exercice** : chaque exercice doit énoncer en une phrase ce qu'on apprend (*« dans cet exercice, vous apprenez à séparer la cause de l'événement »*). Le tronc commun rejette les exercices à objectif flou.

**Feedback immédiat et qualitatif** : pas de score 7/10 sec. Un retour de la forme *« votre formulation est correcte sur la conséquence, mais la cause énoncée n'est pas un facteur — c'est une reformulation de l'événement. Voici le contraste »*. C'est exigeant à concevoir mais c'est le seul feedback qui produit du Flow chez un adulte expert.

**Difficulté ajustable, pas progressive imposée** : je suis réservé sur les paliers/débloquages style Duolingo. Pour un pro, l'humiliation de devoir « débloquer » la matière qu'il pratique déjà est rédhibitoire. Préférer une **carte de la matière** (les 6 sections du DOMAINE) librement accessible, avec des indicateurs de maîtrise par zone, et des exercices qui s'adaptent en difficulté selon la performance. C'est le modèle Anki/Brilliant, pas le modèle Candy Crush.

## 6. Pièges de la gamification superficielle

Cinq pièges explicites à interdire, justifiés.

**Les badges-récompense** (« Vous avez obtenu le badge Détective ! »). Piège parce que la récompense extrinsèque tue la motivation intrinsèque (Deci & Ryan, *Self-Determination Theory*). Sur un public d'experts, l'effet est amplifié — c'est lu comme condescendance. À la place : afficher une **progression de maîtrise par zone** (carte qui se colore), non comme récompense mais comme miroir.

**Les points et le score global**. Piège parce que ça réduit une production qualitative (la formulation d'un risque) à une note numérique, qui ne dit rien d'actionnable. À la place : feedback qualitatif par composant (cause / événement / conséquence).

**Les leaderboards d'apprenants**. Piège parce que la compétition entre pairs sur un sujet de maîtrise professionnelle crée gêne et stratégies d'évitement. À la place : si on veut du social, faire du *replay* d'exercice où l'apprenant voit comment d'autres ont formulé le même risque (anonymisé), pour la richesse, pas pour le classement.

**La narration infantilisante**. Piège bien connu (le « petit explorateur Coco »). Le public Lean-Agile décroche en trois écrans. À la place : micro-scénarios professionnels concrets et secs, voire un humour adulte (cf. ton de Basecamp ou GitHub status pages).

**Les timers artificiels et le perdre-une-vie**. Piège parce que la matière du risque demande de la réflexion posée — c'est l'opposé de la pression temporelle. *Loss Avoidance* gamifié (« vous allez perdre votre streak ! ») est lu comme manipulation. À la place : aucun timer sauf pour un éventuel mode *défi* assumé et optionnel.

## 7. Critique de ma propre proposition

Trois objections que je m'adresse.

**Risque #1 — la sophistication crée une barrière de production**. Les cinq mécaniques proposées (en particulier *Brouillard se lève* et *Tribunal du PI*) demandent un design d'interaction et un moteur d'évaluation qualitative bien plus exigeants que les QCM/grilles de Coach Objectifs. Si on n'a pas la bande passante de production, on livrera des mécaniques mal exécutées — pire que des QCM honnêtes. *Mitigation* : V1 sur **deux mécaniques travaillées à fond** (Détective + Brouillard se lève), pas cinq médiocres.

**Risque #2 — la mécanique ludique colonise la matière**. Un game designer rival pourrait dire : « *vous transformez ISO 31000 en jeu de cartes, vous trahissez la précision de la norme pour faire joli* ». L'objection est sérieuse pour le module PI/SAFe en particulier, où la rigueur des termes (ROAM) compte. *Mitigation* : chaque mécanique doit avoir un mode *fiche théorique sobre* parallèle, et le moteur d'évaluation doit s'aligner sur les définitions du DOMAINE, pas sur la mécanique de jeu. La règle : **la matière dicte, la mécanique sert**.

**Risque #3 — le « brouillard se lève » est joli mais peut produire un cargo cult**. Si l'apprenant comprend « je clique sur spike → la brume part », il a manqué l'enseignement (l'artefact inspectable doit être réel et démontrable). *Mitigation* : forcer l'apprenant à **rédiger la conclusion** du spike en texte libre avant que la mécanique ne valide. Pas de levée de brouillard sans production écrite.

## Recommandation tranchée

**Parti pris V1 du tronc commun** : deux mécaniques travaillées en profondeur — **« Le Détective »** (chaîne cause/événement/conséquence) pour le socle de §2, et **« Le Brouillard se lève »** (réduction de risque comme valeur) pour ancrer le pilier doctrinal de §6. Posture apprenant : coach interne. Pas de fil narratif englobant, micro-scénarios situés. Carte de maîtrise par zone, pas paliers à débloquer. Feedback qualitatif par composant, jamais de score global.

**Interdits non négociables en V1** : badges, points, leaderboard public, timers, streaks, narration héroïque, avatar personnalisable. Si on cède sur un seul, on bascule du côté de la gamification superficielle et on perd le public en deux sessions.
