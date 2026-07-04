/**
 * Corpus « Et alors ? » (brique Conséquence). 6 items validés Lætitia 2026-07-01.
 * Chaque item : couple cause/événement + 1 conséquence mesurable + 3 pièges (tautologie, affect, abstrait).
 */

import { ItemId, MECHANICS } from "@domain/index";
import type { BrickConsequenceItem } from "./types";

export const BRICKS_CONSEQUENCE_ITEMS: ReadonlyArray<BrickConsequenceItem> = [
  {
    id: ItemId("bricks-cons-001"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "mesurable-vs-tautologie", theme: "produit" },
    component: "consequence",
    theme: "produit",
    correctNature: "mesurable",
    context: "Cause : la PO du Portail Client part en congé maternité fin août sans PO relais identifié. Événement : la priorisation du backlog Portail Client pourrait rester bloquée pendant plusieurs sprints.",
    candidates: [
      { nature: "mesurable", text: "Deux à trois sprints de vélocité produit seraient dépriorisés, avec un décalage estimé de six semaines sur la livraison du chantier Portail Client." },
      { nature: "tautologie", text: "La priorisation du backlog serait bloquée.", feedback: "Vous répétez l'événement au lieu d'en raconter l'effet. Une conséquence dit ce qui se passe après, avec du concret." },
      { nature: "affect", text: "L'équipe se sentirait démoralisée et perdue sans PO.", feedback: "Le ressenti est réel mais non actionnable comme conséquence. Il faut une variable qu'on peut mesurer ou observer." },
      { nature: "abstrait", text: "Il y aurait un impact business majeur sur le portefeuille produit.", feedback: "Formule creuse qui ne dit ni combien, ni sur quoi, ni sur quelle échéance. Une conséquence tient sur du chiffré ou du périmétré." },
    ],
  },
  {
    id: ItemId("bricks-cons-002"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "mesurable-vs-abstrait", theme: "securite" },
    component: "consequence",
    theme: "securite",
    correctNature: "mesurable",
    context: "Cause : la PIA de la nouvelle brique n'est pas signée par la DPO à deux semaines de la MEP RGPD. Événement : la MEP conformité pourrait être décalée faute de PIA validée.",
    candidates: [
      { nature: "mesurable", text: "La MEP glisserait de trois à six semaines et rouvrirait la fenêtre de non-conformité sur environ 12 000 comptes utilisateurs déjà en attente." },
      { nature: "tautologie", text: "On ne pourrait pas mettre en production la brique conforme.", feedback: "Vous reformulez l'événement au lieu d'en tirer un effet. Ce qui manque, c'est le chiffre, la portée ou l'échéance qui suit." },
      { nature: "affect", text: "L'équipe conformité serait très stressée par la situation.", feedback: "Le stress est légitime mais ne se traite pas au niveau du registre des risques. Une conséquence pointe une variable objectivable." },
      { nature: "abstrait", text: "Il y aurait un impact réputationnel.", feedback: "Trop vague pour être pilotable. Une conséquence de risque nomme ce qui bouge, sur quelle portée et à quel horizon." },
    ],
  },
  {
    id: ItemId("bricks-cons-003"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "mesurable-vs-tautologie", theme: "sre" },
    component: "consequence",
    theme: "sre",
    correctNature: "mesurable",
    context: "Cause : le runbook de bascule DR pointe vers une ancienne région retirée du périmètre. Événement : une bascule DR pourrait échouer partiellement le jour où on l'exécute.",
    candidates: [
      { nature: "mesurable", text: "Le RTO annoncé de 30 minutes serait dépassé de 2 à 4 heures et le SLA de disponibilité tomberait sous 99,9 % sur le mois concerné." },
      { nature: "tautologie", text: "La bascule DR ne se ferait pas correctement.", feedback: "C'est l'événement reformulé, pas sa conséquence. Il manque l'effet mesurable qui suit l'échec." },
      { nature: "affect", text: "La confiance dans l'équipe SRE serait ébranlée.", feedback: "Un ressenti d'organisation, difficile à mesurer et à traiter. Une conséquence de risque s'ancre sur du RTO, du SLA, du périmètre." },
      { nature: "abstrait", text: "Cela poserait un problème de résilience opérationnelle.", feedback: "Formule générique qui n'aide pas à décider. Une conséquence de risque expose des ordres de grandeur ou du périmètre concret." },
    ],
  },
  {
    id: ItemId("bricks-cons-004"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "mesurable-vs-affect", theme: "dev" },
    component: "consequence",
    theme: "dev",
    correctNature: "mesurable",
    context: "Cause : les tests d'intégration mettent 42 minutes à tourner, les développeurs les court-circuitent. Événement : une régression pourrait passer en prod sans être détectée.",
    candidates: [
      { nature: "mesurable", text: "Un rollback coûterait environ 6 heures d'ingénierie et 90 minutes d'indisponibilité partielle sur le service concerné, avec une dette de correctif à absorber au sprint suivant." },
      { nature: "tautologie", text: "Une régression serait présente en production.", feedback: "Vous répétez l'événement au lieu d'en décrire l'effet. Une conséquence dit ce que la régression déclenche ensuite." },
      { nature: "affect", text: "Les développeurs seraient frustrés d'avoir à corriger en urgence.", feedback: "La frustration est réelle mais reste un ressenti, pas une donnée pilotable au niveau du registre des risques." },
      { nature: "abstrait", text: "La qualité produit en pâtirait.", feedback: "Formule vague qui ne dit rien de mesurable. Une conséquence tient sur du temps, du périmètre ou une charge chiffrée." },
    ],
  },
  {
    id: ItemId("bricks-cons-005"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "mesurable-vs-abstrait", theme: "cloud" },
    component: "consequence",
    theme: "cloud",
    correctNature: "mesurable",
    context: "Cause : le fournisseur cloud annonce une fenêtre de maintenance sur eu-west-3, où tournent 40 % de nos workloads B2B. Événement : une partie des workloads pourrait être indisponible sans plan de bascule prêt.",
    candidates: [
      { nature: "mesurable", text: "Environ 1 200 jobs et flux B2B seraient à basculer ou reporter, avec un dépassement de SLA sur la moitié et une exposition à pénalités estimée entre 50 et 80 k€." },
      { nature: "tautologie", text: "Une partie des workloads serait indisponible.", feedback: "C'est l'événement reformulé. Une conséquence raconte ce qui se passe pour l'entreprise après l'indisponibilité." },
      { nature: "affect", text: "Les clients B2B seraient très mécontents.", feedback: "Vrai mais non chiffré. Le mécontentement n'est pilotable que quand on lui associe des tickets, des relances ou une pénalité." },
      { nature: "abstrait", text: "Il y aurait des impacts contractuels.", feedback: "Trop générique pour arbitrer. Une conséquence utilisable en registre nomme le nombre de contrats, l'ordre de grandeur des pénalités ou l'échéance." },
    ],
  },
  {
    id: ItemId("bricks-cons-006"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "mesurable-vs-affect", theme: "data" },
    component: "consequence",
    theme: "data",
    correctNature: "mesurable",
    context: "Cause : le pipeline ETL nuit dépend d'un extract SFTP d'un fournisseur sans SLA. Événement : le pipeline pourrait tomber en échec plusieurs nuits d'affilée.",
    candidates: [
      { nature: "mesurable", text: "Les rapports décisionnels du COMEX seraient indisponibles 2 à 3 matins consécutifs, avec un rattrapage manuel estimé à 12 heures d'analyste par nuit manquée." },
      { nature: "tautologie", text: "Le pipeline serait en échec.", feedback: "Vous répétez l'événement au lieu d'en décrire l'effet. La conséquence pointe ce qui manque en aval, pas le fait que la mécanique casse." },
      { nature: "affect", text: "Les analystes seraient épuisés par les rattrapages.", feedback: "Un ressenti humain, réel mais pas mesurable comme tel. Il faut le traduire en heures ou en périmètre pour en faire une conséquence." },
      { nature: "abstrait", text: "La donnée serait dégradée.", feedback: "Formule creuse qui ne dit ni combien, ni sur quel horizon. Une conséquence de risque tient sur du chiffré ou du périmétré." },
    ],
  },
];
