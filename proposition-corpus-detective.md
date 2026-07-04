# Coach Risques — Proposition de corpus « Le Détective » (Vague 1)

**À valider par Lætitia avant intégration au code.** Sortie du sous-agent expert (pédagogue + coach Lean-Agile + linguiste), 2026-06-29.

Distribution : **3 items où la CAUSE est révélée / 3 où l'ÉVÉNEMENT est révélé / 2 où la CONSÉQUENCE est révélée = 8 items**.

## Pourquoi cette distribution

Produire l'événement (3 items) est l'exercice central de la mécanique : c'est là que se joue le conditionnel, pilier de l'anatomie du risque (DOMAINE §2). Produire la cause (3 items) entraîne à séparer facteur causal et constat, et à ne pas reformuler l'événement en cause. Produire la conséquence (2 items) entraîne à mesurer plutôt qu'à exprimer une émotion ou une tautologie ; on en met 2 plutôt que 3 parce que la conséquence est le composant le plus souvent bien maîtrisé spontanément.

---

## Item 1 — CAUSE révélée

**Scénario** (Slack #pi-planning) :
« Heads up : Marie part en congé maternité fin août, on n'a pas encore identifié qui reprendra le pilotage du chantier Espace Client côté métier. »

**Composant révélé** : `cause` / **Texte révélé** (lecture seule) : « le départ de Marie en congé maternité fin août sans relais métier identifié »

**Signature** : `chaine-canonique` / `logiciel`

**Chaîne attendue** :
- Cause : le départ de Marie en congé maternité fin août sans relais métier identifié
- Événement : les décisions métier sur le chantier Espace Client pourraient ne plus être tranchées au rythme du sprint
- Conséquence : on prendrait deux à trois sprints de retard sur la roadmap V2

**Alternative défendable** :
- Cause : le départ de Marie en congé maternité fin août sans relais métier identifié
- Événement : le chantier Espace Client pourrait se retrouver sans interlocuteur métier pendant plusieurs semaines
- Conséquence : la roadmap V2 glisserait d'au moins un mois sur les jalons d'octobre

**Conseils pédagogiques** :
- *Événement* : il doit s'écrire au conditionnel (« pourrait », « risquerait de »). Tendance fréquente à écrire « les décisions métier ne sont plus tranchées » au présent : ce serait déjà une issue, pas un risque.
- *Conséquence* : nomme un effet mesurable sur l'objectif (sprints, jalons, périmètre). Évite « ça va ralentir », trop flou pour servir au pilotage.

---

## Item 2 — CAUSE révélée

**Scénario** (réunion préparation festival) :
« Pour le festival d'août, on a appris ce matin que le préfet n'a toujours pas signé l'arrêté d'occupation du domaine public, alors que la deadline était il y a deux semaines. »

**Composant révélé** : `cause` / **Texte révélé** : « l'arrêté préfectoral d'occupation du domaine public non signé à deux semaines de l'événement »

**Signature** : `cause-distincte-de-l-evenement` / `evenementiel`

**Chaîne attendue** :
- Cause : l'arrêté préfectoral d'occupation du domaine public non signé à deux semaines de l'événement
- Événement : la préfecture pourrait refuser l'autorisation ou la délivrer trop tard pour monter le site
- Conséquence : on devrait annuler ou déplacer le festival, avec une perte sèche estimée à 80 k€ d'avances déjà engagées

**Alternative défendable** :
- Cause : l'arrêté préfectoral d'occupation du domaine public non signé à deux semaines de l'événement
- Événement : le délai d'instruction administrative pourrait dépasser la date de montage du site
- Conséquence : on perdrait les avances versées aux prestataires (scène, sécurité, son) sans recours

**Conseils pédagogiques** :
- *Événement* : ne reformule pas la cause. « L'arrêté n'est pas signé » est la cause. L'événement est ce que cette cause rend possible — un refus ou un retard d'instruction. C'est le piège fréquent : recopier la cause en la conjuguant autrement.
- *Conséquence* : un montant ou une décision opérationnelle (annulation, déplacement) parle plus que « ce serait catastrophique ».

---

## Item 3 — CAUSE révélée

**Scénario** (compte-rendu daily atelier) :
« Sur la ligne d'embouteillage 2, le capteur de niveau remonte des valeurs aberrantes une fois sur cinq depuis lundi. Le technicien dit que c'est un faux contact mais on n'a pas eu le temps de l'isoler. »

**Composant révélé** : `cause` / **Texte révélé** : « un faux contact intermittent sur le capteur de niveau de la ligne 2, identifié mais non isolé »

**Signature** : `cause-vs-constat` / `industriel`

**Chaîne attendue** :
- Cause : un faux contact intermittent sur le capteur de niveau de la ligne 2, identifié mais non isolé
- Événement : le système de remplissage pourrait surdoser ou sous-doser un lot sans déclencher l'alerte
- Conséquence : on devrait mettre en quarantaine puis détruire le lot concerné, soit environ 8 heures de production

**Alternative défendable** :
- Cause : un faux contact intermittent sur le capteur de niveau de la ligne 2, identifié mais non isolé
- Événement : un lot entier pourrait sortir hors-tolérances sans que la chaîne ne s'arrête
- Conséquence : on perdrait une journée de production sur la ligne 2 et on ouvrirait une non-conformité qualité

**Conseils pédagogiques** :
- *Événement* : décris ce qui pourrait se produire à cause du faux contact, pas l'état du capteur. « Le capteur est défaillant » serait un constat — donc une cause reformulée, pas un événement.
- *Conséquence* : chiffre l'impact (heures de production, lot, coût). Une conséquence qui se mesure permet d'arbitrer ; une conséquence vague ne le permet pas.

---

## Item 4 — ÉVÉNEMENT révélé

**Scénario** (Slack équipe produit) :
« Mois prochain on lance la nouvelle tarification. L'équipe support n'a pas encore été formée et le script de réponses types n'est pas finalisé. »

**Composant révélé** : `event` / **Texte révélé** : « le support pourrait être submergé par des demandes auxquelles il ne saurait pas répondre dans les 48 premières heures du lancement »

**Signature** : `chaine-canonique` / `operations`

**Chaîne attendue** :
- Cause : l'absence de formation du support et de script de réponses sur la nouvelle tarification à un mois du lancement
- Événement : le support pourrait être submergé par des demandes auxquelles il ne saurait pas répondre dans les 48 premières heures du lancement
- Conséquence : le délai moyen de réponse passerait de 4 h à plus de 24 h et on remonterait probablement 15 à 20 % d'insatisfaction sur la semaine de lancement

**Alternative défendable** :
- Cause : l'équipe support n'est ni formée ni équipée de réponses types pour la nouvelle tarification, à un mois de la mise en ligne
- Événement : le support pourrait être submergé par des demandes auxquelles il ne saurait pas répondre dans les 48 premières heures du lancement
- Conséquence : on traiterait moins d'un ticket sur deux dans la SLA habituelle pendant la semaine de bascule

**Conseils pédagogiques** :
- *Cause* : nomme un facteur, pas un constat. « Le support est mauvais » est un jugement, pas une cause. Cherche ce qui n'est pas en place : formation, outillage, ressources, calendrier.
- *Conséquence* : chiffre, ou nomme un effet visible (SLA, insatisfaction, taux). Évite « ce serait compliqué » — non mesurable, non actionnable.

---

## Item 5 — ÉVÉNEMENT révélé

**Scénario** (PI Planning Day 1, post-it ROAM) :
« Notre équipe dépend du module d'authentification que livre l'équipe Plateforme. Leur PI Objective ne mentionne pas notre cas d'usage et on n'a pas eu d'arbitrage RTE encore. »

**Composant révélé** : `event` / **Texte révélé** : « l'équipe Plateforme pourrait livrer son module d'authentification sans le scope nécessaire à notre cas d'usage »

**Signature** : `cause-vs-constat` / `logiciel`

**Chaîne attendue** :
- Cause : l'absence d'engagement explicite de l'équipe Plateforme sur notre cas d'usage dans son PI Objective, et l'absence d'arbitrage RTE
- Événement : l'équipe Plateforme pourrait livrer son module d'authentification sans le scope nécessaire à notre cas d'usage
- Conséquence : nos deux features dépendantes glisseraient au PI suivant, soit trois mois de retard sur la roadmap

**Alternative défendable** :
- Cause : notre cas d'usage n'est pas pris en compte dans le PI Objective de Plateforme et la priorisation n'a pas été tranchée par le RTE
- Événement : l'équipe Plateforme pourrait livrer son module d'authentification sans le scope nécessaire à notre cas d'usage
- Conséquence : on devrait reporter de trois mois les features qui dépendent de cette brique

**Conseils pédagogiques** :
- *Cause* : un facteur, pas un constat. « L'équipe Plateforme ne nous écoute pas » est un jugement. La cause utile est ce qui est ou n'est pas dans leurs engagements et dans les arbitrages.
- *Conséquence* : une conséquence sur ton plan à toi (glissement, périmètre, dépendances) est plus utile qu'une conséquence sur eux.

---

## Item 6 — ÉVÉNEMENT révélé

**Scénario** (réunion DRH) :
« On bascule sur le nouveau SIRH le 1er octobre. La formation des managers a été reportée trois fois et seulement 30 % d'entre eux y ont assisté à ce jour. »

**Composant révélé** : `event` / **Texte révélé** : « une partie des managers pourrait ne pas savoir valider les congés et notes de frais de leurs équipes dans le nouveau SIRH dès la bascule »

**Signature** : `consequence-non-affective` / `rh`

**Chaîne attendue** :
- Cause : un taux de formation des managers à 30 % seulement à trois mois de la bascule SIRH, après trois reports
- Événement : une partie des managers pourrait ne pas savoir valider les congés et notes de frais de leurs équipes dans le nouveau SIRH dès la bascule
- Conséquence : les validations seraient retardées de plusieurs jours et un volume estimé de 300 à 500 tickets remonterait au support RH sur les deux premières semaines

**Alternative défendable** :
- Cause : seulement 30 % des managers sont formés au nouveau SIRH, après trois reports de la session, et la bascule est dans trois mois
- Événement : une partie des managers pourrait ne pas savoir valider les congés et notes de frais de leurs équipes dans le nouveau SIRH dès la bascule
- Conséquence : on accumulerait un arriéré de validations sur les deux premières semaines et la paie d'octobre serait à risque pour les frais professionnels

**Conseils pédagogiques** :
- *Cause* : un facteur factuel (taux, dates, reports), pas une impression. Le coach que tu joues s'appuie sur ce qui est mesurable.
- *Conséquence* : un effet opérationnel (jours, volume de tickets, paie). Le réflexe « les managers seraient frustrés » est un effet affectif — recevable, mais insuffisant : c'est l'impact opérationnel qui permet d'arbitrer le traitement.

---

## Item 7 — CONSÉQUENCE révélée

**Scénario** (revue de portefeuille conseil) :
« Sur la mission Banque X, le client a remplacé son sponsor il y a quinze jours. Le nouveau ne nous a pas encore reçus et il a déjà demandé à revoir le périmètre de deux livrables. »

**Composant révélé** : `consequence` / **Texte révélé** : « on devrait rejouer deux à trois semaines de cadrage et on perdrait la marge dégagée jusqu'ici sur la mission »

**Signature** : `evenement-conditionnel-strict` / `conseil`

**Chaîne attendue** :
- Cause : le remplacement récent du sponsor côté client, sans rencontre encore tenue et avec deux livrables déjà remis en question
- Événement : le nouveau sponsor pourrait redéfinir significativement le périmètre de la mission
- Conséquence : on devrait rejouer deux à trois semaines de cadrage et on perdrait la marge dégagée jusqu'ici sur la mission

**Alternative défendable** :
- Cause : un changement de sponsor il y a quinze jours, sans cadrage retenu encore avec lui, et une demande explicite de revoir deux livrables
- Événement : le périmètre de la mission pourrait être substantiellement réouvert par le nouveau sponsor
- Conséquence : on devrait rejouer deux à trois semaines de cadrage et on perdrait la marge dégagée jusqu'ici sur la mission

**Conseils pédagogiques** :
- *Cause* : un fait précis (changement de sponsor, demande de revoir deux livrables), pas un sentiment. Ce sont les faits qui rendent la cause discutable en réunion.
- *Événement* : conditionnel obligatoire. « Le sponsor redéfinit le périmètre » au présent ferait basculer dans l'issue. Tant que la rencontre n'a pas eu lieu, c'est un événement possible — « pourrait redéfinir », « risquerait de réouvrir ».

---

## Item 8 — CONSÉQUENCE révélée

**Scénario** (réunion logistique opérations) :
« On vient d'apprendre que notre transporteur principal sur l'axe Rhône-Alpes engage une grève reconductible la semaine du 15. On a 40 % de nos expéditions B2B qui passent par eux. »

**Composant révélé** : `consequence` / **Texte révélé** : « on devrait reporter ou détourner environ 1 200 commandes B2B, avec un dépassement de SLA pour la moitié et une exposition à pénalités estimée entre 50 et 80 k€ »

**Signature** : `tautologie-piege` / `operations`

**Chaîne attendue** :
- Cause : une grève reconductible annoncée chez notre transporteur principal sur l'axe Rhône-Alpes, qui couvre 40 % de nos expéditions B2B
- Événement : nos expéditions B2B sur cet axe pourraient être interrompues ou fortement ralenties pendant tout ou partie de la semaine du 15
- Conséquence : on devrait reporter ou détourner environ 1 200 commandes B2B, avec un dépassement de SLA pour la moitié et une exposition à pénalités estimée entre 50 et 80 k€

**Alternative défendable** :
- Cause : grève reconductible chez le transporteur qui assure 40 % des expéditions B2B Rhône-Alpes, annoncée pour la semaine du 15
- Événement : l'acheminement de nos commandes B2B sur cet axe pourrait être stoppé plusieurs jours sans solution de repli déjà contractée
- Conséquence : on devrait reporter ou détourner environ 1 200 commandes B2B, avec un dépassement de SLA pour la moitié et une exposition à pénalités estimée entre 50 et 80 k€

**Conseils pédagogiques** :
- *Cause* : un fait daté et chiffré (annonce de grève, 40 % du volume). C'est cette précision qui rend le risque traitable, pas l'humeur générale.
- *Événement* : attention au piège tautologique. Écrire « on ne pourrait pas honorer nos commandes B2B » reformule la conséquence et n'apporte rien. L'événement utile décrit ce qui se passe entre la cause et la conséquence : l'acheminement s'arrête.

---

## Bilan

**Distribution composant révélé** : 3 cause (1, 2, 3) / 3 event (4, 5, 6) / 2 consequence (7, 8). Conforme à la cible.

**Signatures couvertes** (6 distinctes) : `chaine-canonique` (1, 4), `cause-distincte-de-l-evenement` (2), `cause-vs-constat` (3, 5), `consequence-non-affective` (6), `evenement-conditionnel-strict` (7), `tautologie-piege` (8).

**Thèmes couverts** (6/6) : logiciel ×2, événementiel ×1, industriel ×1, operations ×2, rh ×1, conseil ×1.

**Inquiétudes pédagogiques** :

1. **Item 3 (capteur ligne 2)** est limite. La cause révélée est elle-même presque un constat (« un faux contact identifié mais non isolé »). Un apprenant rigoureux peut légitimement répondre « le manque de temps alloué à la maintenance corrective ». À surveiller : si plus de 30 % des productions reformulent la cause, l'item est trop dur.

2. **Item 8 (grève transporteur)** porte la signature `tautologie-piege`, mais le scénario est tellement explicite qu'un apprenant peut produire la chaîne « correcte » sans rencontrer le piège — l'enseignement passe alors par la lecture comparée seulement.

3. **Item 2 (festival)** mentionne un montant chiffré (« 80 k€ »). Utile pédagogiquement, mais à assumer comme plausibilité de scénario, pas un fait à vérifier.
