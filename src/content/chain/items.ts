/**
 * Corpus « Le Détective » — Vague 1 (8 items).
 *
 * Validé en bloc par Lætitia le 2026-06-29, source :
 * `proposition-corpus-detective.md` (sous-agent pédagogue + Lean-Agile + linguiste).
 *
 * Discipline (D6) : toute modification exige nouvelle validation Lætitia.
 *
 * Distribution : 3 items où la cause est révélée, 3 où l'événement est
 * révélé, 2 où la conséquence est révélée. 6 signatures distinctes. 6 thèmes.
 */

import { ItemId, MECHANICS } from "@domain/index";
import type { ChainItem } from "./types";

export const CHAIN_ITEMS: ReadonlyArray<ChainItem> = [
  {
    id: ItemId("chain-001"),
    mechanic: MECHANICS.DETECTIVE,
    signature: { trapPattern: "chaine-canonique", theme: "logiciel" },
    scenario:
      "Slack #pi-planning : « Heads up : Marie part en congé maternité fin août, on n'a pas encore identifié qui reprendra le pilotage du chantier Espace Client côté métier. »",
    revealedComponent: "cause",
    revealedText:
      "le départ de Marie en congé maternité fin août sans relais métier identifié",
    expected: {
      cause:
        "le départ de Marie en congé maternité fin août sans relais métier identifié",
      event:
        "les décisions métier sur le chantier Espace Client pourraient ne plus être tranchées au rythme du sprint",
      consequence:
        "on prendrait deux à trois sprints de retard sur la roadmap V2",
    },
    defensibleVariant: {
      cause:
        "le départ de Marie en congé maternité fin août sans relais métier identifié",
      event:
        "le chantier Espace Client pourrait se retrouver sans interlocuteur métier pendant plusieurs semaines",
      consequence:
        "la roadmap V2 glisserait d'au moins un mois sur les jalons d'octobre",
    },
    advice: {
      event:
        "Il doit s'écrire au conditionnel (pourrait, risquerait de). Tendance fréquente à écrire « les décisions métier ne sont plus tranchées » au présent : ce serait déjà une issue, pas un risque.",
      consequence:
        "Nomme un effet mesurable sur l'objectif (sprints, jalons, périmètre). Évite « ça va ralentir », trop flou pour servir au pilotage.",
    },
    theme: "logiciel",
  },
  {
    id: ItemId("chain-002"),
    mechanic: MECHANICS.DETECTIVE,
    signature: { trapPattern: "cause-distincte-de-l-evenement", theme: "evenementiel" },
    scenario:
      "Réunion préparation festival : « Pour le festival d'août, on a appris ce matin que le préfet n'a toujours pas signé l'arrêté d'occupation du domaine public, alors que la deadline était il y a deux semaines. »",
    revealedComponent: "cause",
    revealedText:
      "l'arrêté préfectoral d'occupation du domaine public non signé à deux semaines de l'événement",
    expected: {
      cause:
        "l'arrêté préfectoral d'occupation du domaine public non signé à deux semaines de l'événement",
      event:
        "la préfecture pourrait refuser l'autorisation ou la délivrer trop tard pour monter le site",
      consequence:
        "on devrait annuler ou déplacer le festival, avec une perte sèche estimée à 80 k€ d'avances déjà engagées",
    },
    defensibleVariant: {
      cause:
        "l'arrêté préfectoral d'occupation du domaine public non signé à deux semaines de l'événement",
      event:
        "le délai d'instruction administrative pourrait dépasser la date de montage du site",
      consequence:
        "on perdrait les avances versées aux prestataires (scène, sécurité, son) sans recours",
    },
    advice: {
      event:
        "Ne reformule pas la cause. L'événement est ce que cette cause rend possible : un refus ou un retard d'instruction. C'est le piège fréquent : recopier la cause en la conjuguant autrement.",
      consequence:
        "Un montant ou une décision opérationnelle (annulation, déplacement) parle plus que « ce serait catastrophique ».",
    },
    theme: "evenementiel",
  },
  {
    id: ItemId("chain-003"),
    mechanic: MECHANICS.DETECTIVE,
    signature: { trapPattern: "cause-vs-constat", theme: "industriel" },
    scenario:
      "Compte-rendu daily atelier : « Sur la ligne d'embouteillage 2, le capteur de niveau remonte des valeurs aberrantes une fois sur cinq depuis lundi. Le technicien dit que c'est un faux contact mais on n'a pas eu le temps de l'isoler. »",
    revealedComponent: "cause",
    revealedText:
      "un faux contact intermittent sur le capteur de niveau de la ligne 2, identifié mais non isolé",
    expected: {
      cause:
        "un faux contact intermittent sur le capteur de niveau de la ligne 2, identifié mais non isolé",
      event:
        "le système de remplissage pourrait surdoser ou sous-doser un lot sans déclencher l'alerte",
      consequence:
        "on devrait mettre en quarantaine puis détruire le lot concerné, soit environ 8 heures de production",
    },
    defensibleVariant: {
      cause:
        "un faux contact intermittent sur le capteur de niveau de la ligne 2, identifié mais non isolé",
      event:
        "un lot entier pourrait sortir hors-tolérances sans que la chaîne ne s'arrête",
      consequence:
        "on perdrait une journée de production sur la ligne 2 et on ouvrirait une non-conformité qualité",
    },
    advice: {
      event:
        "Décris ce qui pourrait se produire à cause du faux contact, pas l'état du capteur. « Le capteur est défaillant » serait un constat, donc une cause reformulée, pas un événement.",
      consequence:
        "Chiffre l'impact (heures de production, lot, coût). Une conséquence qui se mesure permet d'arbitrer ; une conséquence vague ne le permet pas.",
    },
    theme: "industriel",
  },
  {
    id: ItemId("chain-004"),
    mechanic: MECHANICS.DETECTIVE,
    signature: { trapPattern: "chaine-canonique", theme: "operations" },
    scenario:
      "Slack équipe produit : « Mois prochain on lance la nouvelle tarification. L'équipe support n'a pas encore été formée et le script de réponses types n'est pas finalisé. »",
    revealedComponent: "event",
    revealedText:
      "le support pourrait être submergé par des demandes auxquelles il ne saurait pas répondre dans les 48 premières heures du lancement",
    expected: {
      cause:
        "l'absence de formation du support et de script de réponses sur la nouvelle tarification à un mois du lancement",
      event:
        "le support pourrait être submergé par des demandes auxquelles il ne saurait pas répondre dans les 48 premières heures du lancement",
      consequence:
        "le délai moyen de réponse passerait de 4 h à plus de 24 h et on remonterait probablement 15 à 20 % d'insatisfaction sur la semaine de lancement",
    },
    defensibleVariant: {
      cause:
        "l'équipe support n'est ni formée ni équipée de réponses types pour la nouvelle tarification, à un mois de la mise en ligne",
      event:
        "le support pourrait être submergé par des demandes auxquelles il ne saurait pas répondre dans les 48 premières heures du lancement",
      consequence:
        "on traiterait moins d'un ticket sur deux dans la SLA habituelle pendant la semaine de bascule",
    },
    advice: {
      cause:
        "Nomme un facteur, pas un constat. « Le support est mauvais » est un jugement, pas une cause. Cherche ce qui n'est pas en place : formation, outillage, ressources, calendrier.",
      consequence:
        "Chiffre, ou nomme un effet visible (SLA, insatisfaction, taux). Évite « ce serait compliqué », non mesurable, non actionnable.",
    },
    theme: "operations",
  },
  {
    id: ItemId("chain-005"),
    mechanic: MECHANICS.DETECTIVE,
    signature: { trapPattern: "cause-vs-constat", theme: "logiciel" },
    scenario:
      "PI Planning Day 1, post-it ROAM : « Notre équipe dépend du module d'authentification que livre l'équipe Plateforme. Leur PI Objective ne mentionne pas notre cas d'usage et on n'a pas eu d'arbitrage RTE encore. »",
    revealedComponent: "event",
    revealedText:
      "l'équipe Plateforme pourrait livrer son module d'authentification sans le scope nécessaire à notre cas d'usage",
    expected: {
      cause:
        "l'absence d'engagement explicite de l'équipe Plateforme sur notre cas d'usage dans son PI Objective, et l'absence d'arbitrage RTE",
      event:
        "l'équipe Plateforme pourrait livrer son module d'authentification sans le scope nécessaire à notre cas d'usage",
      consequence:
        "nos deux features dépendantes glisseraient au PI suivant, soit trois mois de retard sur la roadmap",
    },
    defensibleVariant: {
      cause:
        "notre cas d'usage n'est pas pris en compte dans le PI Objective de Plateforme et la priorisation n'a pas été tranchée par le RTE",
      event:
        "l'équipe Plateforme pourrait livrer son module d'authentification sans le scope nécessaire à notre cas d'usage",
      consequence:
        "on devrait reporter de trois mois les features qui dépendent de cette brique",
    },
    advice: {
      cause:
        "Un facteur, pas un constat. « L'équipe Plateforme ne nous écoute pas » est un jugement. La cause utile est ce qui est ou n'est pas dans leurs engagements et dans les arbitrages.",
      consequence:
        "Une conséquence sur ton plan à toi (glissement, périmètre, dépendances) est plus utile qu'une conséquence sur eux.",
    },
    theme: "logiciel",
  },
  {
    id: ItemId("chain-006"),
    mechanic: MECHANICS.DETECTIVE,
    signature: { trapPattern: "consequence-non-affective", theme: "rh" },
    scenario:
      "Réunion DRH : « On bascule sur le nouveau SIRH le 1er octobre. La formation des managers a été reportée trois fois et seulement 30 % d'entre eux y ont assisté à ce jour. »",
    revealedComponent: "event",
    revealedText:
      "une partie des managers pourrait ne pas savoir valider les congés et notes de frais de leurs équipes dans le nouveau SIRH dès la bascule",
    expected: {
      cause:
        "un taux de formation des managers à 30 % seulement à trois mois de la bascule SIRH, après trois reports",
      event:
        "une partie des managers pourrait ne pas savoir valider les congés et notes de frais de leurs équipes dans le nouveau SIRH dès la bascule",
      consequence:
        "les validations seraient retardées de plusieurs jours et un volume estimé de 300 à 500 tickets remonterait au support RH sur les deux premières semaines",
    },
    defensibleVariant: {
      cause:
        "seulement 30 % des managers sont formés au nouveau SIRH, après trois reports de la session, et la bascule est dans trois mois",
      event:
        "une partie des managers pourrait ne pas savoir valider les congés et notes de frais de leurs équipes dans le nouveau SIRH dès la bascule",
      consequence:
        "on accumulerait un arriéré de validations sur les deux premières semaines et la paie d'octobre serait à risque pour les frais professionnels",
    },
    advice: {
      cause:
        "Un facteur factuel (taux, dates, reports), pas une impression. Le coach que tu joues s'appuie sur ce qui est mesurable.",
      consequence:
        "Un effet opérationnel (jours, volume de tickets, paie). Le réflexe « les managers seraient frustrés » est un effet affectif, recevable mais insuffisant : c'est l'impact opérationnel qui permet d'arbitrer le traitement.",
    },
    theme: "rh",
  },
  {
    id: ItemId("chain-007"),
    mechanic: MECHANICS.DETECTIVE,
    signature: { trapPattern: "evenement-conditionnel-strict", theme: "conseil" },
    scenario:
      "Revue de portefeuille conseil : « Sur la mission Banque X, le client a remplacé son sponsor il y a quinze jours. Le nouveau ne nous a pas encore reçus et il a déjà demandé à revoir le périmètre de deux livrables. »",
    revealedComponent: "consequence",
    revealedText:
      "on devrait rejouer deux à trois semaines de cadrage et on perdrait la marge dégagée jusqu'ici sur la mission",
    expected: {
      cause:
        "le remplacement récent du sponsor côté client, sans rencontre encore tenue et avec deux livrables déjà remis en question",
      event:
        "le nouveau sponsor pourrait redéfinir significativement le périmètre de la mission",
      consequence:
        "on devrait rejouer deux à trois semaines de cadrage et on perdrait la marge dégagée jusqu'ici sur la mission",
    },
    defensibleVariant: {
      cause:
        "un changement de sponsor il y a quinze jours, sans cadrage retenu encore avec lui, et une demande explicite de revoir deux livrables",
      event:
        "le périmètre de la mission pourrait être substantiellement réouvert par le nouveau sponsor",
      consequence:
        "on devrait rejouer deux à trois semaines de cadrage et on perdrait la marge dégagée jusqu'ici sur la mission",
    },
    advice: {
      cause:
        "Un fait précis (changement de sponsor, demande de revoir deux livrables), pas un sentiment. Ce sont les faits qui rendent la cause discutable en réunion.",
      event:
        "Conditionnel obligatoire. « Le sponsor redéfinit le périmètre » au présent ferait basculer dans l'issue. Tant que la rencontre n'a pas eu lieu, c'est un événement possible : « pourrait redéfinir », « risquerait de réouvrir ».",
    },
    theme: "conseil",
  },
  {
    id: ItemId("chain-008"),
    mechanic: MECHANICS.DETECTIVE,
    signature: { trapPattern: "tautologie-piege", theme: "operations" },
    scenario:
      "Réunion logistique opérations : « On vient d'apprendre que notre transporteur principal sur l'axe Rhône-Alpes engage une grève reconductible la semaine du 15. On a 40 % de nos expéditions B2B qui passent par eux. »",
    revealedComponent: "consequence",
    revealedText:
      "on devrait reporter ou détourner environ 1 200 commandes B2B, avec un dépassement de SLA pour la moitié et une exposition à pénalités estimée entre 50 et 80 k€",
    expected: {
      cause:
        "une grève reconductible annoncée chez notre transporteur principal sur l'axe Rhône-Alpes, qui couvre 40 % de nos expéditions B2B",
      event:
        "nos expéditions B2B sur cet axe pourraient être interrompues ou fortement ralenties pendant tout ou partie de la semaine du 15",
      consequence:
        "on devrait reporter ou détourner environ 1 200 commandes B2B, avec un dépassement de SLA pour la moitié et une exposition à pénalités estimée entre 50 et 80 k€",
    },
    defensibleVariant: {
      cause:
        "grève reconductible chez le transporteur qui assure 40 % des expéditions B2B Rhône-Alpes, annoncée pour la semaine du 15",
      event:
        "l'acheminement de nos commandes B2B sur cet axe pourrait être stoppé plusieurs jours sans solution de repli déjà contractée",
      consequence:
        "on devrait reporter ou détourner environ 1 200 commandes B2B, avec un dépassement de SLA pour la moitié et une exposition à pénalités estimée entre 50 et 80 k€",
    },
    advice: {
      cause:
        "Un fait daté et chiffré (annonce de grève, 40 % du volume). C'est cette précision qui rend le risque traitable, pas l'humeur générale.",
      event:
        "Attention au piège tautologique. Écrire « on ne pourrait pas honorer nos commandes B2B » reformule la conséquence et n'apporte rien. L'événement utile décrit ce qui se passe entre la cause et la conséquence : l'acheminement s'arrête.",
    },
    theme: "operations",
  },
];
