/**
 * Corpus « Au conditionnel » (brique Événement). 6 items validés Lætitia 2026-07-01.
 * Chaque item : contexte 2 lignes + 1 événement conditionnel + 3 pièges (présent-avéré, passé-avéré, futur-certain).
 */

import { ItemId, MECHANICS } from "@domain/index";
import type { BrickEventItem } from "./types";

export const BRICKS_EVENT_ITEMS: ReadonlyArray<BrickEventItem> = [
  {
    id: ItemId("bricks-event-001"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "conditionnel-vs-avere", theme: "pi-planning" },
    component: "event",
    theme: "pi-planning",
    correctNature: "conditionnel",
    context: "En PI Planning, l'équipe Paiement dépend d'un module d'authentification livré par l'équipe Plateforme. Le scope SSO externe n'a pas été explicitement engagé côté Plateforme.",
    candidates: [
      { nature: "conditionnel", text: "L'équipe Plateforme pourrait livrer son module sans le scope SSO externe attendu par l'équipe Paiement." },
      { nature: "present-avere", text: "L'équipe Plateforme livre son module sans le scope SSO externe.", feedback: "Formulé au présent, c'est un fait constaté, donc une issue à traiter, pas un risque à anticiper. Le conditionnel installe l'incertitude." },
      { nature: "passe-avere", text: "L'équipe Plateforme a déjà livré un module sans le scope attendu au PI précédent.", feedback: "C'est un antécédent, utile pour argumenter la probabilité, mais l'événement du risque doit parler du futur possible, pas du passé." },
      { nature: "futur-certain", text: "L'équipe Plateforme livrera son module sans le scope SSO externe.", feedback: "Le futur simple affirme la certitude, or un risque suppose que ça peut ne pas arriver. Le conditionnel ouvre la porte à l'incertitude." },
    ],
  },
  {
    id: ItemId("bricks-event-002"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "conditionnel-vs-avere", theme: "mep" },
    component: "event",
    theme: "mep",
    correctNature: "conditionnel",
    context: "La MEP de la nouvelle console de facturation est prévue vendredi soir. La formation des ops a été reportée trois fois et 30 % d'entre eux seulement l'ont suivie.",
    candidates: [
      { nature: "conditionnel", text: "Une partie des ops pourrait ne pas savoir dépanner un incident sur la nouvelle console dès la bascule." },
      { nature: "present-avere", text: "Les ops ne savent pas dépanner la nouvelle console.", feedback: "Vous constatez, vous ne formulez pas un risque. Sans le conditionnel, l'événement bascule en issue déjà là." },
      { nature: "passe-avere", text: "Les ops n'ont pas su dépanner la nouvelle console lors du pilote.", feedback: "Un fait passé, informatif mais pas prospectif. L'événement du risque regarde vers vendredi soir, pas vers le pilote." },
      { nature: "futur-certain", text: "Les ops seront dépassés vendredi soir.", feedback: "Le futur simple affirme la survenue, ce qui gomme l'incertitude. Un risque ne se formule pas comme une prédiction sûre." },
    ],
  },
  {
    id: ItemId("bricks-event-003"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "conditionnel-vs-futur", theme: "securite" },
    component: "event",
    theme: "securite",
    correctNature: "conditionnel",
    context: "Une bibliothèque JS critique de notre front est marquée deprecated depuis juin. L'équipe n'a pas encore planifié le remplacement dans le prochain sprint.",
    candidates: [
      { nature: "conditionnel", text: "Une faille non corrigée sur cette bibliothèque pourrait être exploitée sans qu'on puisse patcher rapidement." },
      { nature: "present-avere", text: "Une faille non corrigée sur cette bibliothèque est exploitée.", feedback: "Au présent, c'est un incident en cours, donc une issue de sécurité à contenir maintenant. Le risque parle de ce qui n'est pas encore arrivé." },
      { nature: "passe-avere", text: "Une faille sur cette bibliothèque a été exploitée l'an dernier chez un concurrent.", feedback: "Un précédent externe, utile pour argumenter, mais l'événement d'un risque projette une occurrence possible chez vous, pas chez autrui." },
      { nature: "futur-certain", text: "Cette bibliothèque va nous causer un incident de sécurité.", feedback: "Le futur simple pose la certitude et brûle la marge de manœuvre. Le conditionnel garde ouvert le fait qu'on peut agir avant." },
    ],
  },
  {
    id: ItemId("bricks-event-004"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "conditionnel-vs-futur", theme: "sre" },
    component: "event",
    theme: "sre",
    correctNature: "conditionnel",
    context: "Sur le cluster Kubernetes de prod, une sonde CPU du node exporter renvoie des valeurs aberrantes une nuit sur cinq depuis lundi. L'équipe n'a pas encore isolé la cause.",
    candidates: [
      { nature: "conditionnel", text: "Un incident de saturation CPU pourrait passer sous les radars faute d'alerte fiable au bon seuil." },
      { nature: "present-avere", text: "Un incident de saturation CPU passe sous les radars.", feedback: "Formulation au présent, c'est un problème déjà en cours, une issue. Un risque anticipe, il ne constate pas." },
      { nature: "passe-avere", text: "Un incident de saturation CPU est passé sous les radars la semaine dernière.", feedback: "Un fait passé qui aurait dû déclencher un postmortem. Le risque, lui, parle des semaines à venir sous les mêmes conditions." },
      { nature: "futur-certain", text: "Un incident CPU va passer sous les radars.", feedback: "Le futur simple retire l'incertitude, or l'incertitude est le cœur du risque. Le conditionnel dit possible, pas garanti." },
    ],
  },
  {
    id: ItemId("bricks-event-005"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "conditionnel-vs-avere", theme: "produit" },
    component: "event",
    theme: "produit",
    correctNature: "conditionnel",
    context: "Le nouveau plan tarifaire s'active dans trois semaines côté produit. Le script de réponses types du support n'est pas finalisé et aucune session de formation n'a eu lieu.",
    candidates: [
      { nature: "conditionnel", text: "Le support pourrait être submergé par des tickets auxquels il ne saurait pas répondre dans les 48 premières heures." },
      { nature: "present-avere", text: "Le support est submergé par des tickets sans réponse.", feedback: "C'est un constat au présent, une issue à traiter tout de suite. Le risque parle du lancement à venir, pas d'un état actuel." },
      { nature: "passe-avere", text: "Le support a été submergé au dernier lancement produit.", feedback: "Un antécédent utile pour argumenter la probabilité mais l'événement du risque doit se projeter sur ce lancement-ci." },
      { nature: "futur-certain", text: "Le support sera débordé au lancement.", feedback: "Le futur simple ferme la porte à l'action préventive en affirmant la survenue. Le conditionnel garde l'événement incertain." },
    ],
  },
  {
    id: ItemId("bricks-event-006"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "conditionnel-vs-futur", theme: "cloud" },
    component: "event",
    theme: "cloud",
    correctNature: "conditionnel",
    context: "Notre fournisseur cloud principal a annoncé une fenêtre de maintenance non planifiée sur eu-west-3 la semaine prochaine. Environ 40 % de nos workloads B2B tournent sur cette région.",
    candidates: [
      { nature: "conditionnel", text: "Une partie de nos workloads B2B pourrait être indisponible pendant la fenêtre de maintenance sans plan de bascule prêt." },
      { nature: "present-avere", text: "Une partie de nos workloads B2B est indisponible.", feedback: "Formulé au présent, c'est une issue en cours, pas un risque à anticiper. La maintenance n'a pas encore eu lieu." },
      { nature: "passe-avere", text: "Une partie de nos workloads B2B a été indisponible lors de la précédente maintenance.", feedback: "Un précédent, pas un événement à venir. Le risque projette une nouvelle occurrence, il ne relate pas la précédente." },
      { nature: "futur-certain", text: "Nos workloads B2B seront indisponibles pendant la maintenance.", feedback: "Le futur simple affirme la certitude, ce qui exclut toute stratégie de mitigation. Le conditionnel maintient la marge d'action." },
    ],
  },
];
