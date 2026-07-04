# Note pédagogique — Coach Risques V1

*Rédigée par le pédagogue du panel à destination de la conseillère Lean-Agile responsable du cadrage.*
*Session 1 — 2026-06-28.*

## 1. Critique de la matière du point de vue de l'apprentissage adulte

Le domaine du risque concentre trois difficultés cognitives que je n'ai pas rencontrées avec la même densité dans Coach Objectifs.

**Première difficulté : l'abstraction de l'incertitude.** Un objectif est un futur désirable, concret, projetable mentalement. Un risque est un futur indésirable, conditionnel, contrefactuel. L'adulte Agile travaille avec aisance dans le mode déclaratif (« on veut livrer X ») mais bascule mal dans le mode conditionnel (« il pourrait arriver que… si… alors… »). C'est ce que Sweller appelle une charge cognitive intrinsèque élevée : la structure logique elle-même est dure, indépendamment du contenu. Le piège est de surcharger la première heure d'apprentissage avec du vocabulaire (ISO, PMBOK, ROAM) alors que la structure logique n'est pas encore stabilisée.

**Deuxième difficulté : le triptyque enjeu/risque/issue est un faux ami à trois étages.** Le mot anglais *issue* parasite la langue de travail des équipes francophones SAFe. La distinction risque (incertain) / issue (avéré) heurte une intuition de terrain où tout problème mérite traitement immédiat. Et le mot *enjeu*, propre à la tradition francophone, est confondu avec « objectif » ou avec « impact ». Ce sont des **transfer-of-learning negatives** au sens de Mezirow : l'apprenant doit *désapprendre* un usage avant d'apprendre un usage neuf. La transformation perspectiviste (Mezirow) demande plus de temps qu'un simple ajout de connaissance.

**Troisième difficulté : la divergence expert/débutant sur la valeur.** L'expert sait que réduire un risque *est* livrer de la valeur (§6) ; le débutant pense que livrer de la valeur c'est livrer du fonctionnel visible. Cette divergence est dangereuse car elle conditionne le comportement en Sprint Review / PI Demo. Si l'outil ne fait pas vivre ce basculement, il enseigne du vocabulaire sans changer la pratique. C'est typiquement une zone où Vygotsky est utile : sans étayage (l'artefact inspectable comme appui matériel), l'apprenant reste dans la croyance antérieure.

À ces trois difficultés s'ajoute un piège plus banal : l'évaluation probabilité × impact invite au pifométrage chiffré déguisé en science (§3). Pédagogiquement, mieux vaut enseigner l'assumé qualitatif que de laisser croire à une rigueur quantitative non fondée.

## 2. Objectifs pédagogiques opérationnels (tronc commun V1)

Formulés en taxonomie de Bloom, chacun vérifiable par une production observable.

- **O1 — Distinguer (Analyser)** : étant donné une formulation libre, l'apprenant identifie s'il s'agit d'un enjeu, d'un objectif, d'un risque ou d'une issue, et justifie en une phrase.
- **O2 — Reconnaître la structure (Comprendre)** : sur une formulation donnée, l'apprenant repère séparément cause, événement, conséquence et signale celle qui manque.
- **O3 — Produire (Appliquer)** : à partir d'un contexte court (3-5 lignes), l'apprenant rédige un risque sous la forme canonique Cause→Événement→Conséquence sans tautologie ni mélange avec une issue.
- **O4 — Évaluer (Évaluer)** : l'apprenant attribue un niveau qualitatif de probabilité et d'impact à un risque rédigé, et explicite le contexte qui justifie l'évaluation (par opposition à un chiffre nu).
- **O5 — Choisir une stratégie (Évaluer)** : face à un risque évalué, l'apprenant sélectionne éviter / réduire / transférer / accepter (et son équivalent ROAM le cas échéant) et argumente le choix au regard du coût.
- **O6 — Reformuler une réduction comme valeur (Créer)** : étant donné un travail réalisé (spike, test, prototype), l'apprenant produit la formulation type §6 (risque traité / réduction obtenue / artefact / coût / reste à faire) prête pour une revue.

Cinq objectifs montent en Bloom de Comprendre à Créer ; O1 est volontairement placé en Analyser tôt parce que c'est lui qui débloque tout le reste.

## 3. Progression pédagogique

L'ordre n'est pas indifférent. Je propose la séquence suivante, en quatre temps.

**Temps 1 — Le « clic » du triptyque.** Avant toute mécanique de rédaction, on installe la distinction enjeu / objectif / risque / issue. Sans ce clic, tout le reste glisse sur la croyance antérieure. Knowles rappelle que l'adulte apprend mieux quand il *voit le problème* avant la solution : on commence donc par des cas où l'apprenant constate sa propre confusion (discrimination forcée), puis on lui donne le cadre. Le triptyque n'est pas une définition récitée, c'est un outil de tri.

**Temps 2 — L'anatomie du risque bien rédigé.** Une fois le triptyque stabilisé, on introduit Cause→Événement→Conséquence. Pas avant : tant que l'apprenant confond risque et issue, lui apprendre à formuler proprement aggrave l'erreur en la rendant fluide. On enseigne d'abord par reconnaissance des composants manquants, puis par production guidée, puis par production libre. C'est la séquence classique Kolb (expérience → observation → conceptualisation → expérimentation) appliquée à la formulation.

**Temps 3 — Évaluation et stratégies de traitement.** Probabilité × impact n'a de sens que sur un risque bien formé. On le place après. Les stratégies (éviter/réduire/transférer/accepter, ROAM en variante SAFe) viennent en clôture du cycle classique du risque, car le choix de stratégie dépend de l'évaluation.

**Temps 4 — La réduction de risque comme valeur livrée.** C'est le pilier §6, et c'est le sommet de Bloom (Créer). Il ne peut pas être enseigné avant que les quatre composants précédents soient acquis : sans risque bien formé, sans évaluation contextualisée, sans choix de stratégie, la formulation §6 devient du jargon. C'est aussi là que se joue la transformation perspectiviste (Mezirow) : le basculement « réduire un risque, c'est livrer de la valeur ». Il faut donc lui réserver son moment, pas le diluer.

Les modules verticaux Sprint / PI / OKR viennent ensuite, en spécialisations contextuelles.

## 4. Découpage en activités

J'arrive à **sept** activités distinctes pour le tronc commun. Plus serait du gavage, moins manquerait un objectif.

| Nom | Intention | Forme | Durée |
|---|---|---|---|
| **Le Tri** | Installer la distinction enjeu/objectif/risque/issue (O1) | Discrimination forcée : on glisse une formulation dans la bonne case, feedback immédiat | 5-7 min |
| **L'Autopsie** | Repérer cause/événement/conséquence et nommer le composant manquant (O2) | Reconnaissance analytique sur formulations partielles | 5-8 min |
| **L'Atelier** | Rédiger un risque canonique à partir d'un contexte court (O3) | Production guidée avec gabarit, puis production libre | 8-12 min |
| **Le Calibrage** | Évaluer probabilité × impact et justifier par le contexte (O4) | Application avec contre-exemple pifométrique, demande de justification écrite | 6-8 min |
| **Le Conseil** | Choisir une stratégie et l'argumenter (O5) | Étude de cas courte, choix raisonné, feedback comparatif | 7-10 min |
| **La Revue** | Reformuler un travail réalisé en réduction-de-risque-valeur (O6) | Transfert : on fournit un spike/test, l'apprenant rédige la formulation type §6 | 10-12 min |
| **Le Procès du faux risque** | *Forme nouvelle.* Activité méta de consolidation où l'apprenant joue le critique : on lui présente trois risques « plausibles mais fautifs » (tautologie, confusion issue, conséquence seule), il diagnostique et propose une correction | Production critique + métacognition | 8-10 min |

Le « Procès du faux risque » mérite explication : c'est une activité de métacognition adulte. Knowles insiste sur le besoin de l'apprenant adulte de juger plutôt que d'être jugé. Le placer en clôture du cycle 1 permet de fixer les apprentissages par renversement (l'apprenant devient évaluateur), ce qui est un des leviers les plus puissants de la mémorisation à long terme.

## 5. Charge cognitive et séquençage en session

L'adulte professionnel en autoformation tient **12 à 18 minutes** sans surcharge significative sur un sujet de charge intrinsèque élevée comme le risque. Au-delà, la performance baisse, surtout en fin de journée. Chaque activité ci-dessus est donc dimensionnée pour tenir dans une session unique, et deux activités peuvent s'enchaîner si elles partagent un cadre cognitif (Le Tri + L'Autopsie par exemple).

**Recommandation : parcours linéaire suggéré, navigation libre permise.** Pas de verrouillage. L'adulte refuse la condescendance d'un parcours imposé (Knowles, principe de self-direction). Mais une suggestion forte (« on vous recommande de commencer par Le Tri ») est nécessaire pour éviter que l'apprenant ne saute directement à La Revue sans les prérequis et se décourage. La reprise où on s'est arrêté est non négociable (public à temps fragmenté).

## 6. Évaluation et feedback

**Feedback immédiat sur les activités de reconnaissance et de discrimination** (Le Tri, L'Autopsie) : binaire bon/mauvais avec justification courte d'une ligne. La pédagogie de l'erreur, ici, doit être dédramatisée : c'est précisément en se trompant sur enjeu/issue qu'on installe la distinction. L'erreur est l'enseignement.

**Feedback différé et qualitatif sur les activités de production** (L'Atelier, La Revue) : pas de bon/mauvais, mais un commentaire structuré (« votre formulation contient bien la cause et l'événement, la conséquence est implicite, voici comment l'expliciter »). Ne pas tomber dans la note chiffrée : elle est anti-pédagogique sur la production adulte.

**Auto-évaluation sur Le Conseil** : pas de bonne réponse unique, on présente plusieurs choix défendables avec leurs arguments. L'apprenant compare son raisonnement et juge sa solidité. Mezirow : la transformation passe par la confrontation à des perspectives alternatives, pas par la sanction.

**Signal de maîtrise** : la réussite du Procès du faux risque sans aide est l'indicateur de transfert. C'est elle qui dit « vous savez », pas un score cumulé.

## 7. Critique de ma propre proposition

Le principal risque pédagogique est la **surcharge en charge extrinsèque** : sept activités, des formes variées, du vocabulaire ISO/PMBOK/SAFe, le triptyque francophone, la formulation §6… L'apprenant peut se sentir submergé avant le clic. Un pédagogue rival pourrait défendre une V1 minimaliste à trois activités (Tri, Atelier, Revue) en arguant que le reste est de la dentelle pour un public qui veut surtout produire vite.

Mon désaccord : sans Le Calibrage et Le Conseil, l'apprenant produit des risques bien rédigés mais ne sait pas quoi en faire ; et sans Le Procès du faux risque, rien ne fixe l'apprentissage par renversement. Trois activités enseignent la grammaire, pas le métier.

Risque secondaire : le pilier §6 (La Revue) demande un artefact en entrée. Si l'outil ne fournit pas de spikes/tests réalistes à analyser, l'activité dérive en remplissage de gabarit. C'est un point d'attention pour l'UX et le contenu, pas un défaut de la pédagogie elle-même.

## Recommandation tranchée — V1 du tronc commun

Sept activités, dans l'ordre proposé, avec navigation libre mais recommandation forte. Le « clic » du triptyque enjeu/objectif/risque/issue doit absolument être la première marche, sinon tout glisse. La Revue (§6) doit être la dernière, comme couronnement, pas comme introduction. Le Procès du faux risque est la signature pédagogique de l'outil — c'est lui qui distingue Coach Risques d'un manuel ISO 31000 numérisé. Aucune note chiffrée nulle part : feedback structuré et auto-évaluation comparée.
