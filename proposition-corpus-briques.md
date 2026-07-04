# Coach Risques — Proposition de corpus « Les Briques » (Vague 1)

**À valider par Lætitia avant intégration au code.** Sortie du sous-agent expert (Lean-Agile TI + pédagogue + linguiste), 2026-07-01.

20 items au total : 8 pour Le facteur (Cause) + 6 pour Au conditionnel (Événement) + 6 pour Et alors ? (Conséquence). Contexte TI exclusif. Grammaire quaternaire unifiée : 4 candidats par item, un seul clic, badges de nature.

---

## Brique 1 — Le facteur (Cause) — 8 items

Un item = 4 candidats. La cause explique pourquoi l'événement est possible. Les trois pièges sont typés : `constat` (état statique sans lien causal), `evenement` (ce qui pourrait arriver, donc pas la cause), `antecedent` (récit du passé, pas facteur actif).

### Item 1 — thème ops
- **A · cause** : L'astreinte N2 tourne à trois personnes depuis le départ de deux ops le mois dernier, sans embauche prévue avant la rentrée.
- **B · constat** : Notre équipe ops est sous-dimensionnée.
- **C · evenement** : Un incident P1 pourrait tomber un dimanche sans personne pour répondre.
- **D · antecedent** : L'année dernière on a eu un incident P1 non couvert un dimanche à cause de l'astreinte.

### Item 2 — thème sécurité
- **A · cause** : Le connecteur SSO SAML utilise une bibliothèque en fin de support depuis mars, non budgétée pour être remplacée sur ce PI.
- **B · constat** : Notre stack d'authentification n'est pas parfaitement à jour.
- **C · evenement** : Un attaquant pourrait exploiter une faille du connecteur SSO.
- **D · antecedent** : En 2024, une bibliothèque périmée avait déjà causé un incident de sécurité.

### Item 3 — thème SRE
- **A · cause** : Le runbook de bascule DR pointe encore vers l'ancienne région AWS retirée du périmètre en avril, personne ne l'a mis à jour.
- **B · constat** : Notre documentation SRE a besoin d'un rafraîchissement.
- **C · evenement** : Une bascule DR pourrait échouer le jour où on en aura besoin.
- **D · antecedent** : Lors du dernier gameday DR, on avait détecté que le runbook était partiellement faux.

### Item 4 — thème produit
- **A · cause** : Les hypothèses d'usage du nouveau parcours de checkout n'ont jamais été testées avec de vrais utilisateurs, la discovery a été sautée pour tenir le PI.
- **B · constat** : Notre parcours de checkout est nouveau.
- **C · evenement** : Les utilisateurs pourraient abandonner le nouveau checkout.
- **D · antecedent** : En 2024, on avait déjà lancé un checkout sans discovery et ça avait posé problème.

### Item 5 — thème data
- **A · cause** : Le pipeline ETL nuit dépend d'un extract SFTP d'un fournisseur qui n'a signé aucun SLA de disponibilité pour son endpoint.
- **B · constat** : Notre chaîne data intègre plusieurs fournisseurs externes.
- **C · evenement** : Le pipeline pourrait tomber en échec une nuit sans qu'on récupère à temps.
- **D · antecedent** : En janvier, l'endpoint SFTP du fournisseur avait déjà été indisponible deux nuits.

### Item 6 — thème cloud
- **A · cause** : La politique IAM du compte production a été ouverte à un rôle admin partagé lors du dernier hotfix et n'a pas été refermée depuis.
- **B · constat** : Notre gouvernance IAM n'est pas au niveau attendu.
- **C · evenement** : Un rôle admin partagé pourrait servir à une action non tracée.
- **D · antecedent** : Il y a deux ans, un rôle admin partagé avait été utilisé par erreur.

### Item 7 — thème dev
- **A · cause** : La suite de tests d'intégration du monolithe core met 42 minutes à tourner, donc les développeurs la court-circuitent avant merge.
- **B · constat** : Nos tests d'intégration sont lents.
- **C · evenement** : Une régression pourrait passer inaperçue jusqu'en prod.
- **D · antecedent** : Le mois dernier, une régression est passée en prod parce que les tests avaient été skippés.

### Item 8 — thème CI/CD
- **A · cause** : Le token GitHub qui authentifie les runners CI de l'équipe expire dans onze jours et son renouvellement dépend d'une personne actuellement en congé.
- **B · constat** : On a des dépendances sur un token GitHub pour la CI.
- **C · evenement** : La CI pourrait s'arrêter et bloquer tous les merges.
- **D · antecedent** : En 2025, un token expiré avait déjà bloqué la CI pendant 36 heures.

---

## Brique 2 — Au conditionnel (Événement) — 6 items

Un item = un contexte court (2 lignes) + 4 candidats. Le bon candidat est un événement au conditionnel épistémique bien formulé. Les pièges portent chacun une nature temporelle : `present-avere`, `passe-avere`, `futur-certain`.

### Item 1 — thème PI Planning
> Contexte : en PI Planning, l'équipe Paiement dépend d'un module d'authentification livré par l'équipe Plateforme. Le scope SSO externe n'a pas été explicitement engagé côté Plateforme.
- **A · conditionnel** : L'équipe Plateforme pourrait livrer son module sans le scope SSO externe attendu par l'équipe Paiement.
- **B · present-avere** : L'équipe Plateforme livre son module sans le scope SSO externe.
- **C · passe-avere** : L'équipe Plateforme a déjà livré un module sans le scope attendu au PI précédent.
- **D · futur-certain** : L'équipe Plateforme livrera son module sans le scope SSO externe.

### Item 2 — thème MEP
> Contexte : la MEP de la nouvelle console de facturation est prévue vendredi soir. La formation des ops a été reportée trois fois et 30 % d'entre eux seulement l'ont suivie.
- **A · conditionnel** : Une partie des ops pourrait ne pas savoir dépanner un incident sur la nouvelle console dès la bascule.
- **B · present-avere** : Les ops ne savent pas dépanner la nouvelle console.
- **C · passe-avere** : Les ops n'ont pas su dépanner la nouvelle console lors du pilote.
- **D · futur-certain** : Les ops seront dépassés vendredi soir.

### Item 3 — thème sécurité
> Contexte : une bibliothèque JS critique de notre front est marquée deprecated depuis juin. L'équipe n'a pas encore planifié le remplacement dans le prochain sprint.
- **A · conditionnel** : Une faille non corrigée sur cette bibliothèque pourrait être exploitée sans qu'on puisse patcher rapidement.
- **B · present-avere** : Une faille non corrigée sur cette bibliothèque est exploitée.
- **C · passe-avere** : Une faille sur cette bibliothèque a été exploitée l'an dernier chez un concurrent.
- **D · futur-certain** : Cette bibliothèque va nous causer un incident de sécurité.

### Item 4 — thème SRE
> Contexte : sur le cluster Kubernetes de prod, une sonde CPU du node exporter renvoie des valeurs aberrantes une nuit sur cinq depuis lundi. L'équipe n'a pas encore isolé la cause.
- **A · conditionnel** : Un incident de saturation CPU pourrait passer sous les radars faute d'alerte fiable au bon seuil.
- **B · present-avere** : Un incident de saturation CPU passe sous les radars.
- **C · passe-avere** : Un incident de saturation CPU est passé sous les radars la semaine dernière.
- **D · futur-certain** : Un incident CPU va passer sous les radars.

### Item 5 — thème produit
> Contexte : le nouveau plan tarifaire s'active dans trois semaines côté produit. Le script de réponses types du support n'est pas finalisé et aucune session de formation n'a eu lieu.
- **A · conditionnel** : Le support pourrait être submergé par des tickets auxquels il ne saurait pas répondre dans les 48 premières heures.
- **B · present-avere** : Le support est submergé par des tickets sans réponse.
- **C · passe-avere** : Le support a été submergé au dernier lancement produit.
- **D · futur-certain** : Le support sera débordé au lancement.

### Item 6 — thème cloud
> Contexte : notre fournisseur cloud principal a annoncé une fenêtre de maintenance non planifiée sur eu-west-3 la semaine prochaine. Environ 40 % de nos workloads B2B tournent sur cette région.
- **A · conditionnel** : Une partie de nos workloads B2B pourrait être indisponible pendant la fenêtre de maintenance sans plan de bascule prêt.
- **B · present-avere** : Une partie de nos workloads B2B est indisponible.
- **C · passe-avere** : Une partie de nos workloads B2B a été indisponible lors de la précédente maintenance.
- **D · futur-certain** : Nos workloads B2B seront indisponibles pendant la maintenance.

---

## Brique 3 — Et alors ? (Conséquence) — 6 items

Un item = un couple cause/événement + 4 candidats. Le bon candidat est mesurable ou opérationnel. Pièges : `tautologie` (répète l'événement), `affect` (ressenti non actionnable), `abstrait` (formule creuse type « impact business »).

### Item 1 — thème produit
> Cause : la PO du Portail Client part en congé maternité fin août sans PO relais identifié. Événement : la priorisation du backlog Portail Client pourrait rester bloquée pendant plusieurs sprints.
- **A · mesurable** : Deux à trois sprints de vélocité produit seraient dépriorisés, avec un décalage estimé de six semaines sur la livraison du chantier Portail Client.
- **B · tautologie** : La priorisation du backlog serait bloquée.
- **C · affect** : L'équipe se sentirait démoralisée et perdue sans PO.
- **D · abstrait** : Il y aurait un impact business majeur sur le portefeuille produit.

### Item 2 — thème sécurité
> Cause : la PIA de la nouvelle brique n'est pas signée par la DPO à deux semaines de la MEP RGPD. Événement : la MEP conformité pourrait être décalée faute de PIA validée.
- **A · mesurable** : La MEP glisserait de trois à six semaines et rouvrirait la fenêtre de non-conformité sur environ 12 000 comptes utilisateurs déjà en attente.
- **B · tautologie** : On ne pourrait pas mettre en production la brique conforme.
- **C · affect** : L'équipe conformité serait très stressée par la situation.
- **D · abstrait** : Il y aurait un impact réputationnel.

### Item 3 — thème SRE
> Cause : le runbook de bascule DR pointe vers une ancienne région retirée du périmètre. Événement : une bascule DR pourrait échouer partiellement le jour où on l'exécute.
- **A · mesurable** : Le RTO annoncé de 30 minutes serait dépassé de 2 à 4 heures et le SLA de disponibilité tomberait sous 99,9 % sur le mois concerné.
- **B · tautologie** : La bascule DR ne se ferait pas correctement.
- **C · affect** : La confiance dans l'équipe SRE serait ébranlée.
- **D · abstrait** : Cela poserait un problème de résilience opérationnelle.

### Item 4 — thème dev
> Cause : les tests d'intégration mettent 42 minutes à tourner, les développeurs les court-circuitent. Événement : une régression pourrait passer en prod sans être détectée.
- **A · mesurable** : Un rollback coûterait environ 6 heures d'ingénierie et 90 minutes d'indisponibilité partielle sur le service concerné, avec une dette de correctif à absorber au sprint suivant.
- **B · tautologie** : Une régression serait présente en production.
- **C · affect** : Les développeurs seraient frustrés d'avoir à corriger en urgence.
- **D · abstrait** : La qualité produit en pâtirait.

### Item 5 — thème cloud
> Cause : le fournisseur cloud annonce une fenêtre de maintenance sur eu-west-3, où tournent 40 % de nos workloads B2B. Événement : une partie des workloads pourrait être indisponible sans plan de bascule prêt.
- **A · mesurable** : Environ 1 200 jobs et flux B2B seraient à basculer ou reporter, avec un dépassement de SLA sur la moitié et une exposition à pénalités estimée entre 50 et 80 k€.
- **B · tautologie** : Une partie des workloads serait indisponible.
- **C · affect** : Les clients B2B seraient très mécontents.
- **D · abstrait** : Il y aurait des impacts contractuels.

### Item 6 — thème data
> Cause : le pipeline ETL nuit dépend d'un extract SFTP d'un fournisseur sans SLA. Événement : le pipeline pourrait tomber en échec plusieurs nuits d'affilée.
- **A · mesurable** : Les rapports décisionnels du COMEX seraient indisponibles 2 à 3 matins consécutifs, avec un rattrapage manuel estimé à 12 heures d'analyste par nuit manquée.
- **B · tautologie** : Le pipeline serait en échec.
- **C · affect** : Les analystes seraient épuisés par les rattrapages.
- **D · abstrait** : La donnée serait dégradée.

---

## Auto-critique du sous-agent

**Items limites signalés**
- **Brique 1 item 5 (ETL/SFTP)** : le `constat` frôle la lecture « cause » pour un apprenant très ops. À surveiller.
- **Brique 2 item 3 (bibliothèque JS)** : le `passe-avere` évoque un précédent externe (chez un concurrent), choix assumé mais qui peut être lu comme hors-sujet.
- **Brique 3 items 1/5/6** : frontière mesurable/abstrait fine. Le contraste est pédagogiquement voulu mais expose la brique à un taux d'erreur non trivial en première série.

**Principal risque pédagogique de la vague** : la brique 3 laisse une frontière fine entre mesurable et abstrait. Si le taux d'erreur dépasse 40 % sur les items 1/5/6 en pilote, il faudra durcir les feedbacks pour marquer que la mesurabilité impose au moins une variable observable, pas seulement un adjectif fort.

**Corpus prêt** : 20 items, feedback ciblé par piège, thèmes TI diversifiés (ops, sécurité, SRE, produit, data, cloud, dev, CI/CD, PI Planning, MEP).
