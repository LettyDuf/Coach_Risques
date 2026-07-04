# Coach Risques — DOMAINE

État : **brouillon V0.1 à valider par Lætitia.** Source de vérité pédagogique. Tout contenu ici doit être validé avant intégration dans le code.

Référentiel ancrant : **hybride** — ISO 31000:2018 et PMBOK 7 (PMI) comme socle de définitions et mécanique ; tradition francophone (AFITEP, Maders) comme grille pédagogique d'entrée.

---

## §1. Triptyque pédagogique — Enjeu / Risque / Issue

**Définitions à enseigner**

- **Enjeu** *(notion francophone — pas d'équivalent ISO/PMI)* : ce qui est en jeu, ce qu'on peut gagner ou perdre. Qualitatif. Répond à la question *« pourquoi ça compte ? »*. Existe avant tout projet.
- **Objectif** : ce qu'on vise concrètement pour servir l'enjeu. Mesurable. Répond à *« qu'est-ce qu'on veut atteindre ? »*. Couvert par l'outil Coach Objectifs.
- **Risque** *(ISO 31000)* : « effet de l'incertitude sur les objectifs ». Événement **incertain** (pas encore survenu) qui, s'il se produit, affecte l'atteinte d'un ou plusieurs objectifs. Mesuré par probabilité × impact.
- **Issue / Problème avéré** *(PMBOK)* : un risque qui s'est matérialisé. Devient une réalité à traiter en urgence, sort du registre des risques pour entrer dans le registre des issues.

**Faux-amis et pièges à neutraliser**

- *issue* (anglais) ≠ *enjeu* (français). Confusion #1 en équipe francophone.
- « risque que ça plante » ne se distingue pas d'une crainte vague tant qu'on n'a pas la cause, l'événement et la conséquence.
- Un objectif raté n'est pas un risque ; c'est une issue (si avérée) ou une non-atteinte (si constatée a posteriori).

**Chaîne pédagogique recommandée** : on part de l'**Enjeu** (pourquoi), on définit l'**Objectif** (quoi), on identifie les **Risques** (ce qui peut empêcher), on agit sur eux avant qu'ils ne deviennent **Issues**.

---

## §2. Anatomie d'un risque bien rédigé

Un risque tient debout quand il explicite trois composants. Forme canonique :

> **À cause de** *[cause]*, **il pourrait arriver que** *[événement incertain]*, **ce qui aurait pour conséquence** *[impact mesurable]*.

- **Cause** : facteur ou condition qui rend l'événement possible. *Pourquoi* le risque existe.
- **Événement** : ce qui pourrait se produire. *Quoi*. Incertain par nature, formulé au conditionnel.
- **Conséquence** : effet sur l'objectif ou l'enjeu si l'événement survient. *Et alors ?*. Mesurable de préférence.

**Anti-patterns à enseigner**

- Cause seule : « notre archi est vieille ». Pas un risque, un constat.
- Événement seul : « le serveur peut tomber ». Pas exploitable sans cause ni conséquence.
- Conséquence seule : « on va perdre le client ». Pas un risque, une peur.
- Tautologie : « risque de ne pas finir à temps ». Reformule l'objectif raté, pas le mécanisme.
- Mélange risque/issue : « le serveur est tombé hier ». C'est une issue, pas un risque.

---

## §3. Évaluation — probabilité × impact

Échelles à valider par Lætitia (proposition initiale, à enrichir).

**Probabilité** (5 niveaux) : très improbable / improbable / possible / probable / quasi certain.
**Impact** (5 niveaux) : négligeable / mineur / modéré / majeur / critique.
**Criticité** = combinaison, restituée par une matrice 5×5 avec zones (faible / modéré / élevé / critique).

**Pièges à enseigner**
- Pifomètre déguisé en science : « 30 % de probabilité » sans données. Mieux vaut un niveau qualitatif assumé qu'un chiffre faux précis.
- Évaluer un risque sans contexte. Le même événement peut être négligeable ou critique selon l'enjeu.
- Confondre impact sur l'équipe (interne) et impact sur l'enjeu (externe).

---

## §4. Stratégies de traitement

Quatre stratégies classiques (ISO/PMBOK) pour les menaces, plus la version SAFe.

- **Éviter** : changer le plan pour que le risque n'existe plus. Coûteux mais radical.
- **Réduire (mitiger)** : agir sur la cause (réduire probabilité) ou sur la conséquence (réduire impact). Le cas le plus fréquent.
- **Transférer** : faire porter le risque par un tiers (assurance, sous-traitant, contrat). Ne supprime pas, déplace.
- **Accepter** : reconnaître le risque, ne rien faire (avec ou sans plan de contingence). Légitime si coût du traitement > coût attendu de l'occurrence.

**ROAM (SAFe, en PI Planning)** — variante de ce vocabulaire, à enseigner dans le module PI :
- **Resolved** : risque traité, n'existe plus.
- **Owned** : risque pris en charge par un responsable explicite.
- **Accepted** : risque connu, conscient, accepté en l'état.
- **Mitigated** : risque réduit par une action concrète.

---

## §5. Indicateurs de risque

Parallèle à la chaîne KBI/KPI/KGI de Coach Objectifs.

- **Leading indicator** : signal faible, en amont, qui annonce que le risque se rapproche. *Contrôlable*. Exemple : nombre de tests qui échouent sur la branche d'intégration.
- **Lagging indicator** : signal de matérialisation. *Constaté*. Exemple : incident de production survenu.
- Un dispositif de surveillance valide combine **au moins un leading et un lagging**.

---

## §6. Réduction de risque comme valeur livrée — **pilier explicite de l'outil**

**Thèse à enseigner** : une réduction de risque concrète, ancrée sur un artefact inspectable, **est de la valeur** au sens où l'équipe peut la présenter en Sprint Review (Scrum) ou PI System Demo (SAFe).

**Fondement doctrinal** (à présenter dans les fiches Théorie) :
- **SAFe** intègre explicitement *Risk Reduction & Opportunity Enablement* (RR&OE) dans la formule WSJF, au même rang que la valeur business.
- **Mike Cohn** (*Agile Estimating and Planning*) : matrice risque/valeur, faire le *high-risk-first* pour purger l'incertitude tôt.
- **Roman Pichler** : prioriser le backlog d'abord par le risque.
- **Donald Reinertsen** (*Principles of Product Development Flow*) : la variance et l'incertitude ont un coût économique mesurable ; les réduire crée de la valeur.
- **Matts & Maassen** (*Commitment*, Real Options) : retarder une décision en réduisant l'incertitude a une valeur d'option quantifiable.
- **Scrum Guide 2020** : la Sprint Review est *« the ideal occasion to discuss business and technology risks »*.

**Garde-fou — non négociable** : toute « réduction de risque » présentée doit être **adossée à un artefact inspectable**.
- Spike documenté avec conclusion.
- Prototype ou preuve de concept démontrable.
- Test exécuté avec résultat.
- NFR (non-functional requirement) validée.
- Métrique avant/après.

Sans artefact, c'est du discours. Scrum.org alerte explicitement : sans artefact, la revue dérive en *phase gate* PowerPoint. **L'outil doit enseigner cette discipline.**

**Formulation type à enseigner pour la revue**

> Risque traité : *[résumé une ligne].*
> Réduction obtenue : *[probabilité ou impact avant → après].*
> Artefact démontrable : *[spike / prototype / test / métrique].*
> Coût de la réduction : *[charge engagée].*
> Reste à faire : *[ce qui reste, si applicable].*

---

## §7. Spécificités par module

**Module Sprint** *(à étoffer)*
- Risques d'équipe sur 1-3 semaines.
- Catégories courantes : dépendance externe non levée, dette technique bloquante, capacité (congés, maladie), hypothèse non validée.
- Présentation Sprint Review : démo du test/spike + court récit.

**Module PI** *(à étoffer — sous-agent SAFe à mobiliser comme pour Coach Objectifs)*
- Risques inter-équipes, hypothèses d'architecture, conformité.
- Cérémonie ROAM en PI Planning Day 2.
- Présentation PI System Demo : valeur de l'Enabler livré.

**Module OKR / produit** *(à étoffer)*
- Risques d'hypothèse business, marché, adoption.
- Approche *Real Options* : différer la décision tant que l'incertitude est élevée.
- Présentation revue d'OKR : confirmation/invalidation d'hypothèse, pas livraison fonctionnelle.

---

## §8. Conception pédagogique — V1 du tronc commun (validée Lætitia, 2026-06-28)

Sortie du Panel 1 (pédagogue + game designer, sources : `audits/panel-1-*.md`) consolidée et validée.

### Objectifs pédagogiques (taxonomie de Bloom)

- **O1** — *Analyser* : distinguer enjeu / objectif / risque / issue sur une formulation libre.
- **O2** — *Comprendre* : repérer cause, événement, conséquence et nommer le composant manquant.
- **O3** — *Appliquer* : rédiger un risque canonique Cause→Événement→Conséquence à partir d'un contexte court.
- **O4** — *Évaluer* : attribuer un niveau qualitatif de probabilité × impact et justifier par le contexte.
- **O5** — *Évaluer* : choisir une stratégie de traitement (éviter / réduire / transférer / accepter ; ROAM) et l'argumenter.
- **O6** — *Créer* : reformuler une réduction de risque réalisée en valeur livrable (formulation pour Sprint Review / PI System Demo).

### Quatre mécaniques de jeu portant les six objectifs

| Mécanique | Intention ludique | Objectifs portés | Zone DOMAINE |
|---|---|---|---|
| **Le Tri** | Discrimination forcée — installer le « clic » du triptyque par confrontation à sa propre confusion | O1 | §1 |
| **Le Détective** | Reconstitution de chaîne sur preuve partielle — intérioriser l'interdépendance cause/événement/conséquence | O2 + O3 | §2 |
| **Le Pari** | Matrice 5×5 vivante — contexte qui décale le curseur, choix de traitement raisonné | O4 + O5 | §3 + §4 |
| **Le Brouillard se lève** | Révélation par réduction d'incertitude — choix d'artefact inspectable et formulation pour la revue | O6 (avec §5 leading/lagging intégré) | §6 (et §5) |

### Posture apprenant

**Coach interne** — celui qui aide une équipe à mieux nommer son risque. Ni risk manager (corporate), ni capitaine de navire (cliché).

### Mode défi transverse — Le Procès du faux risque (optionnel)

Activité méta de consolidation. L'apprenant joue le critique sur trois risques « plausibles mais fautifs » (tautologie, confusion issue, conséquence seule) — il diagnostique et propose une correction. Pas un cinquième écran linéaire dans le parcours, mais un mode défi accessible quand l'apprenant a parcouru les quatre mécaniques. Remplit le besoin d'apprentissage par renversement (Knowles).

### Dispositif d'orientation — Carte de maîtrise

Une carte des six zones du DOMAINE (Triptyque, Anatomie, Évaluation, Traitement, Indicateurs, Réduction-valeur) qui se colore selon la maîtrise constatée. **Pas un système de badges/points/paliers** (interdits ci-dessous). C'est un miroir, pas une récompense. Inspiré Anki/Brilliant, pas Duolingo/Candy Crush.

### Parcours

Navigation libre, **recommandation forte** (« on vous recommande de commencer par Le Tri »). Pas de verrouillage. Reprise où on s'est arrêté.

### Feedback

- **Immédiat** sur les activités de reconnaissance/discrimination (Le Tri) : binaire bon/mauvais avec justification courte. L'erreur est dédramatisée — elle est l'enseignement.
- **Différé et qualitatif** sur les productions (Détective, Pari, Brouillard se lève) : commentaire structuré par composant. *Jamais de note chiffrée.*
- **Auto-évaluation comparée** sur les choix de traitement : plusieurs choix défendables avec leurs arguments, l'apprenant compare son raisonnement.

### Interdits non négociables (V1)

Badges, points, score global, leaderboard, timers artificiels, streaks, narration héroïque englobante, avatar personnalisable. Sept interdits convergents pédagogue+game designer. Un seul de ces éléments fait basculer du côté de la gamification superficielle et perd le public adulte en deux sessions.

### Cadre théorique mobilisé

Pédagogie : Bloom (taxonomie), Knowles (andragogie, self-direction), Mezirow (transformation perspectiviste), Sweller (charge cognitive), Kolb (cycle d'apprentissage), Vygotsky (étayage).
Game design : MDA (Hunicke), Csíkszentmihályi (Flow type réflexion), Octalysis (Yu-kai Chou) — *Epic Meaning / Development & Accomplishment / Unpredictability* activés, *Scarcity / Loss Avoidance / Social Influence* interdits. Lazzaro (*Hard Fun* + *Serious Fun*) plutôt que Bartle. Deci & Ryan (motivation intrinsèque vs extrinsèque).

### Charge cognitive et durée

12 à 18 minutes par session sur cette matière à charge intrinsèque élevée. Chaque mécanique tient dans une session unique. Reprise non négociable (public à temps fragmenté).

---

## §9. Points tranchés par Lætitia (session 1)

1. **Échelles probabilité/impact** : 5×5 — validé.
2. **Vocabulaire SAFe** : traduction française dans le corps du texte, VO entre parenthèses dans les titres (ex : « Risque géré (Owned) », « Démo de PI (PI System Demo) »).
3. **Distinction menaces / opportunités** : à approfondir — option C envisagée (présent en Théorie sans mini-exercices), à valider avec le panel pédagogique avant figeage.
4. **Module Issue / problème avéré** : pas de module dédié — la distinction risque/issue est traitée comme matière pédagogique transverse (notamment dans l'exercice à concevoir sur l'incertitude vs l'avéré).

## §10. Étape suivante — Panel 2 UX/UI + graphiste

Le panel pédagogique est validé (§8). La suite immédiate est la **conception UX/UI et direction artistique** par sous-agents experts, sur la base de la grille §8 validée. Le panel 2 produit, Lætitia valide, j'intègre.

Questions pour le Panel 2 :
- Quel parcours utilisateur entre Carte de maîtrise et les 4 mécaniques ?
- Quels écrans, quelle architecture d'information ?
- Quelles micro-interactions pour chaque mécanique (Le Tri, Le Détective, Le Pari, Le Brouillard se lève) ?
- Quel système de tokens (typographie, espacement, couleur porteuse de sens) ?
- Quelle palette pour le risque (alerte / prévention / accepté / résolu) ?
- Accessibilité (contraste, clavier, sémantique) traitée d'office.

Le moteur `RiskCoachEngine` ne sera implémenté qu'après le Panel 3 (architecte logiciel).
