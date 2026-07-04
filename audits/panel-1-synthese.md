# Panel 1 — Synthèse pour validation Lætitia

*Session 1 — 2026-06-28. Sorties croisées : `panel-1-pedagogue.md` + `panel-1-game-designer.md`. Ce document est ma synthèse argumentée et les points d'arbitrage qui te reviennent.*

## Convergences fortes — acquis

Les deux panels convergent sur l'essentiel. Ces points peuvent être figés sauf objection de ta part.

1. **Le triptyque enjeu / risque / issue est la première marche** non négociable. Sans ce « clic », tout le reste glisse. Pédagogue : transformation perspectiviste (Mezirow), il faut désapprendre avant d'apprendre. Game designer : c'est l'épreuve de discrimination qui débloque la suite.

2. **La réduction de risque comme valeur (§6) est le sommet, pas l'introduction**. Pédagogue : c'est le « Créer » de Bloom, on n'y arrive qu'après les acquis. Game designer : c'est aussi la mécanique la plus satisfaisante visuellement (révélation, levée de brouillard), donc elle mérite d'être le couronnement.

3. **Posture apprenant : « coach interne »**. Ni risk manager (corporate), ni capitaine de navire (cliché). Cohérent avec le public Lean-Agile et avec Coach Objectifs.

4. **Aucun score chiffré, aucun badge, aucun leaderboard, aucun timer, aucune narration héroïque.** Ces sept interdits sont convergents. Sur public adulte expert, la gamification superficielle est rédhibitoire (Deci & Ryan : la récompense extrinsèque tue la motivation intrinsèque ; les pros le ressentent comme condescendance).

5. **Feedback qualitatif structuré par composant**, immédiat sur les activités de reconnaissance, différé sur les productions. Jamais « bon/mauvais » sec sur une formulation libre.

6. **Carte de maîtrise par zone, pas paliers à débloquer**. Modèle Anki/Brilliant, pas Duolingo. L'adulte refuse la condescendance d'un parcours imposé (Knowles : self-direction).

7. **Navigation libre avec recommandation forte**. Pas de verrouillage, mais une suggestion claire de séquence.

8. **Micro-scénarios professionnels situés, pas de fil narratif englobant**. Le réel professionnel de l'apprenant *est* le scénario.

## Tension principale à arbitrer — combien d'activités en V1 ?

Le pédagogue propose **7 activités** (Tri, Autopsie, Atelier, Calibrage, Conseil, Revue, Procès du faux risque). Le game designer propose **2 mécaniques travaillées en profondeur** (Détective, Brouillard se lève).

**Ils ne parlent pas de la même unité**, mais la tension est réelle.

- Le **pédagogue** raisonne en *objectifs d'apprentissage* (un par activité, sinon on rate un O de Bloom).
- Le **game designer** raisonne en *mécaniques de jeu* (chacune coûte cher à concevoir, mieux vaut 2 abouties que 5 médiocres).

**Mon arbitrage proposé** : on garde la rigueur des 6 objectifs pédagogiques du pédagogue (O1 à O6), mais on les *implémente sur 3 mécaniques génériques de jeu*, pas 7 écrans distincts. Une mécanique de jeu peut porter plusieurs activités d'apprentissage si elle est bien conçue.

Proposition consolidée :

| Mécanique de jeu | Activités pédagogiques portées | Zone DOMAINE |
|---|---|---|
| **Le Tri** (discrimination) | O1 (enjeu/objectif/risque/issue) | §1 |
| **Le Détective** (reconstitution de chaîne, variants) | O2 (repérer composants) + O3 (produire un risque) | §2 |
| **Le Pari** (matrice 5×5 vivante) | O4 (évaluer en contexte) + O5 (choisir un traitement) | §3 + §4 |
| **Le Brouillard se lève** (révélation + production) | O6 (reformuler une réduction en valeur) | §6 |

Quatre mécaniques de jeu, six objectifs pédagogiques couverts. Une de plus que le game designer, trois de moins que le pédagogue.

**§5 (indicateurs leading/lagging)** : le game designer propose Le Capteur comme cinquième mécanique. Mon avis : **pas en V1**. C'est une notion plus courte qui peut être traitée dans la Théorie + un mini-exercice intégré au Brouillard se lève (« choisis le capteur qui te dira si le risque revient »). En économiser une mécanique réduit la bande passante de production.

**Le « Procès du faux risque » (pédagogue)** : je propose de le garder mais comme **mode défi optionnel transverse**, pas comme 5ème mécanique linéaire. Il consolide ce qui a été appris, ne crée pas de nouvel objectif. C'est ton choix, c'est défendable des deux côtés.

## Tension secondaire — bande passante de production

Le game designer alerte : ces mécaniques sont *plus exigeantes* que les QCM/grilles de Coach Objectifs. Une mécanique « Détective » avec banque de phrases puis rédaction libre et moteur de vérification de cohérence demande :
- un corpus pédagogique riche (cas, distracteurs, formulations cibles)
- un moteur d'évaluation qualitative dans le domaine (`RiskCoachEngine`)
- un design d'interaction soigné

C'est cohérent avec la doctrine architecture hexagonale (D2) : la logique pédagogique vit dans le domaine, testable seule. Mais ça veut dire qu'on accepte de **passer plus de temps sur le moteur** que sur Coach Objectifs avant de voir la première mécanique tourner.

**Implication pour la suite** : le Panel 3 (architecte logiciel) devra concevoir un moteur d'évaluation suffisamment expressif pour porter « Détective » et « Brouillard se lève » sans rejouer le code. C'est un point d'attention sérieux.

## Points qui restent ouverts pour toi

1. **Tu valides la grille consolidée 4 mécaniques / 6 objectifs ?** Ou tu préfères basculer (a) vers les 7 activités du pédagogue, (b) vers les 2 mécaniques du game designer, (c) vers autre chose ?

2. **Le Procès du faux risque** : tu le veux comme défi transverse optionnel, comme 5ème mécanique linéaire, ou pas du tout en V1 ?

3. **§5 indicateurs (leading/lagging)** : tu valides le traitement intégré au Brouillard se lève (sans mécanique dédiée), ou tu veux Le Capteur comme 5ème mécanique ?

4. **Mode défi global** (le « Défi » de Coach Objectifs en QCM scénarisé) : on l'écarte de V1, on l'inclut, ou on le redéfinit comme « Procès du faux risque » ?

5. **Carte de maîtrise** (les 6 zones du DOMAINE qui se colorent) : tu valides ce dispositif d'orientation visuelle comme remplaçant des points/badges ?

## Ce qui se passe ensuite

- Quand tu valides cette synthèse (avec ou sans amendements), je consigne en `DOMAINE.md §8` (réécrit) et en `DECISIONS.md` (D9 — découpage pédagogique V1).
- J'enchaîne **Panel 2 — UX/UI + graphiste** : sur la base de la grille validée, conception du parcours utilisateur, des écrans clés, du système visuel (tokens, hiérarchie, palette du risque : alerte / prévention / accepté / résolu).
- Puis Panel 3 — Architecte logiciel.
- Aucun code avant ces trois validations.
