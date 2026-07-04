# Coach Risques — Refonte corpus en contexte TI (Triage + Détective)

**À valider par Lætitia avant intégration.** Refonte totale des scénarios pour un public tech (dev, ops, SRE, produit numérique, sécurité, data). **Les signatures pédagogiques et les verdicts attendus sont strictement conservés** — c'est l'habillage qui change, pas la doctrine.

---

## Section A — Triage TI (18 items)

Distribution inchangée : enjeu 4 / objectif 5 / risque 4 / issue 5.

### Item 1 — ENJEU (`enjeu-pur` / `plateforme`)
« Sur cette MEP, ce qui est en jeu c'est notre crédibilité auprès du COMEX sur la capacité de la plateforme à tenir le Black Friday. C'est la première grosse échéance depuis qu'on a perdu la dernière. »

### Item 2 — OBJECTIF (`objectif-mesurable` / `ops`)
« On veut faire baisser le MTTR sur les incidents P1 de 90 min à 30 min d'ici fin septembre. »

### Item 3 — RISQUE (`risque-canonique` / `securite`)
« Si l'ANSSI publie sa nouvelle directive sur le chiffrement au repos avant qu'on ait migré notre base clients, on devra revoir toute la couche de stockage. »

### Item 4 — ISSUE (`issue-avere-passe` / `production`)
« Hier soir le gateway de paiement a rendu 500 pendant 47 minutes, on a loupé environ 1 200 transactions et on n'a pas encore le postmortem. »

### Item 5 — ISSUE (`issue-avere-present` / `data`)
« Le taux d'échec du pipeline ETL nuit est à 40 % depuis lundi, on tourne normalement à moins de 5 %. »

### Item 6 — ENJEU (`enjeu-pur` / `securite`)
« Pour cette release, ce qui est en jeu c'est la confidentialité des données médicales des 4 000 patients qui basculent sur le nouveau portail samedi soir. »

### Item 7 — RISQUE (`risque-canonique` / `plateforme`)
« Si Marc part en arrêt comme l'an dernier en mars, on n'a personne qui sait faire tourner la CI/CD du monolithe historique. »

### Item 8 — ISSUE (`confusion-enjeu-issue` / `produit`)
« Notre crédibilité chez BNP est en train d'en prendre un coup : leur DSI nous a signifié hier qu'ils gèlent le renouvellement de contrat le temps qu'on clarifie l'incident de la semaine dernière. »

### Item 9 — ISSUE (`confusion-issue-risque` / `developpement`)
« Sur le sprint en cours le binôme front bloque sur la nouvelle API GraphQL du BFF, ils n'avancent plus depuis trois jours. »

### Item 10 — OBJECTIF (`confusion-enjeu-objectif` / `produit`)
« Notre objectif de qualité perçue, c'est d'arriver à un NPS de 45 sur l'appli mobile d'ici la fin du PI. »

### Item 11 — OBJECTIF (`objectif-deguise-en-risque` / `developpement`)
« Notre principal risque, c'est de ne pas livrer la V2 du back-office le 30 septembre. »

### Item 12 — ENJEU (`enjeu-deguise-en-risque` / `produit`)
« Si on perd ce compte SaaS, c'est toute notre crédibilité sur le segment banque privée qui prend un coup. »

### Item 13 — RISQUE (`risque-canonique` / `sre`)
« Avec deux SRE de l'astreinte week-end en arrêt à J-3, on pourrait se retrouver sans couverture N2 samedi si un troisième tombe. »

### Item 14 — ENJEU (`enjeu-pur` / `produit`)
« Au-delà des KPI de rétention, ce qui compte c'est qu'on reste fidèles à la promesse qu'on a faite aux early adopters : pas de dark pattern, pas de pub tierce dans l'appli. »

### Item 15 — OBJECTIF (`objectif-mesurable` / `devsecops`)
« D'ici décembre, on vise à former 80 % des développeurs de la BU aux pratiques de code review sécurité et à l'outillage SAST. »

### Item 16 — RISQUE (`confusion-issue-risque` / `plateforme`)
« L'éditeur de notre SSO menace de ne pas livrer le connecteur SAML compatible à temps si on ne valide pas les specs cette semaine. »

### Item 17 — ISSUE (`issue-avere-present` / `sre`)
« On vient de découvrir que les sauvegardes de la base clients ne tournent plus depuis fin avril sur l'environnement de pré-prod. »

### Item 18 — OBJECTIF (`objectif-mesurable` / `ops`)
« L'OKR de l'équipe ce trimestre : réduire de moitié le lead time entre le merge d'une PR et sa mise en prod sur les micro-services critiques. »

---

## Section B — Détective TI (8 items)

Distribution inchangée : 3 cause / 3 event / 2 consequence révélés.

Chaque item conserve sa signature d'origine. Les scénarios et les 3 champs de chaîne sont réécrits dans un contexte TI cohérent.

### Item 1 — CAUSE révélée (`chaine-canonique` / `produit`)
**Scénario** : Slack #pi-planning : « Heads up : Marie, la PO du chantier Portail Client, part en congé maternité fin août et on n'a pas encore identifié qui reprendra la priorisation du backlog côté métier. »
**Cause donnée** : « le départ de Marie en congé maternité fin août sans PO relais identifié sur le Portail Client »

### Item 2 — CAUSE révélée (`cause-distincte-de-l-evenement` / `securite`)
**Scénario** : « Pour la MEP conformité RGPD d'août, on a appris ce matin que la DPO n'a toujours pas signé la PIA de la nouvelle brique, alors que la deadline était il y a deux semaines. »
**Cause donnée** : « la PIA de la nouvelle brique non signée par la DPO à deux semaines de la MEP »

### Item 3 — CAUSE révélée (`cause-vs-constat` / `sre`)
**Scénario** : compte-rendu daily SRE : « Sur le cluster Kubernetes de prod, le node exporter remonte des métriques CPU aberrantes une fois sur cinq depuis lundi. L'équipe dit que c'est un souci de sonde mais on n'a pas eu le temps d'isoler. »
**Cause donnée** : « une sonde CPU intermittente sur le node exporter du cluster de prod, identifiée mais non isolée »

### Item 4 — ÉVÉNEMENT révélé (`chaine-canonique` / `produit`)
**Scénario** : Slack équipe produit : « Mois prochain on active le nouveau plan tarifaire côté produit. L'équipe support n'a pas encore été formée et le script de réponses types n'est pas finalisé. »
**Événement donné** : « le support pourrait être submergé par des tickets auxquels il ne saurait pas répondre dans les 48 premières heures du lancement »

### Item 5 — ÉVÉNEMENT révélé (`cause-vs-constat` / `plateforme`)
**Scénario** : PI Planning Day 1, post-it ROAM : « Notre équipe dépend du module d'authentification que livre l'équipe Plateforme. Leur PI Objective ne mentionne pas notre cas d'usage SSO externe et on n'a pas eu d'arbitrage RTE encore. »
**Événement donné** : « l'équipe Plateforme pourrait livrer son module d'authentification sans le scope nécessaire à notre cas SSO externe »

### Item 6 — ÉVÉNEMENT révélé (`consequence-non-affective` / `ops`)
**Scénario** : réunion préparation migration : « On bascule sur la nouvelle console d'administration cloud le 1er octobre. La formation des ops a été reportée trois fois et seulement 30 % d'entre eux y ont assisté à ce jour. »
**Événement donné** : « une partie des ops pourrait ne pas savoir provisionner ou dépanner les environnements clients dans la nouvelle console dès la bascule »

### Item 7 — CONSÉQUENCE révélée (`evenement-conditionnel-strict` / `produit`)
**Scénario** : revue de portefeuille produit : « Sur le projet SaaS Banque X, le client a remplacé son sponsor DSI il y a quinze jours. Le nouveau ne nous a pas encore reçus et il a déjà demandé à revoir le périmètre de deux epics. »
**Conséquence donnée** : « on devrait rejouer deux à trois sprints de discovery et on perdrait la marge dégagée jusqu'ici sur le contrat »

### Item 8 — CONSÉQUENCE révélée (`tautologie-piege` / `plateforme`)
**Scénario** : réunion architecture cloud : « On vient d'apprendre que notre fournisseur cloud principal annonce une fenêtre de maintenance non planifiée sur la région eu-west-3 la semaine du 15. On a 40 % de nos workloads B2B qui tournent là-bas. »
**Conséquence donnée** : « on devrait basculer ou reporter environ 1 200 jobs et flux B2B, avec un dépassement de SLA pour la moitié et une exposition à pénalités estimée entre 50 et 80 k€ »

*(Les chaînes attendues, alternatives défendables et conseils pédagogiques complets sont dans la note du sous-agent — reproduits dans le code au moment de l'intégration.)*

---

## Alertes du sous-agent

1. **Item 13 Triage (SRE en arrêt)** reste sensible comme l'était l'original covid+. Item-sonde à instrumenter en pilote.
2. **Item 5 Triage (pipeline ETL à 40 % d'échec)** peut prêter à débat : équipe data pointue pourrait objecter que « échoue partiellement » ≠ « échoue tout court ». Le « depuis lundi » verrouille le constat.
3. **Item 8 Détective (maintenance cloud eu-west-3)** conserve la fragilité de la signature tautologie-piege : l'énoncé trop clair réduit la fréquence du piège produit. La pédagogie passe par la lecture comparée.
4. **Terminologie mixte VO/VF** : PR, MEP, PI, RTE, SSO, SAML, PIA, DPO, NPS, MTTR, ETL, BFF, SAST, P1 gardés en VO. Les items les plus denses en sigles : 3 (ANSSI), 15 (SAST), Détective 2 (PIA/DPO). À valider si trop chargé.

## Ce qui se passe si tu valides

Je remplace TRIAGE_ITEMS et CHAIN_ITEMS dans le code par les versions TI, je relance les 47 tests (canari, corpus, UI, a11y), je rebuild `docs/index.html`. Tu retrouves l'outil au même endroit avec les nouveaux scénarios.
