/**
 * Corpus « Le Tri » — Vague 1 (18 items).
 *
 * Validé en bloc par Lætitia le 2026-06-28, source :
 * `proposition-corpus-triage.md` (sous-agent pédagogue + Lean-Agile + linguiste).
 *
 * Discipline (D6) : toute modification de ce fichier exige une
 * nouvelle validation explicite de Lætitia. Le moteur est stable ;
 * le contenu, lui, est sa responsabilité métier.
 *
 * Distribution : enjeu 4 / objectif 5 / risque 4 / issue 5.
 * Signatures : 9 distinctes. Thèmes : 6.
 */

import { ItemId, MECHANICS } from "@domain/index";
import type { TriageItem } from "./types";

export const TRIAGE_ITEMS: ReadonlyArray<TriageItem> = [
  // ──────────────────────────────────────────────────────────────────
  // ENJEU (4)
  // ──────────────────────────────────────────────────────────────────
  {
    id: ItemId("triage-001"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "enjeu-pur", theme: "conseil" },
    statement:
      "Sur ce dossier, ce qui est en jeu c'est notre crédibilité auprès du comité d'audit. C'est le premier qu'on leur livre depuis qu'on a perdu le précédent.",
    expected: "enjeu",
    rationale:
      "Qualitatif, antérieur au projet, répond au « pourquoi ça compte ». Aucune cible mesurable, aucun événement incertain.",
    confusionMessages: {
      objectif:
        "Ce n'est pas un objectif parce qu'il n'y a rien à atteindre, rien à mesurer. Ici on est sur un enjeu parce que c'est ce qu'on peut gagner ou perdre, la raison pour laquelle ça compte avant même qu'on définisse un objectif.",
    },
    theme: "conseil",
  },
  {
    id: ItemId("triage-006"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "enjeu-pur", theme: "evenementiel" },
    statement:
      "Pour cet événement, ce qui est en jeu c'est la sécurité physique des 4 000 visiteurs attendus le samedi soir.",
    expected: "enjeu",
    rationale:
      "Valeur qualitative non négociable, antérieure à toute mesure ou plan. C'est ce qui doit être préservé, indépendamment des moyens.",
    confusionMessages: {
      objectif:
        "Ce n'est pas un objectif parce que la sécurité n'est pas une cible qu'on viserait à atteindre, c'est ce qui doit être préservé. Ici on est sur un enjeu parce que c'est la raison pour laquelle on va se fixer ensuite des objectifs concrets (effectif PC sécurité, plan d'évacuation, etc.).",
    },
    theme: "evenementiel",
  },
  {
    id: ItemId("triage-012"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "enjeu-deguise-en-risque", theme: "conseil" },
    statement:
      "Si on perd ce client, c'est toute notre crédibilité sur le segment public qui prend un coup.",
    expected: "enjeu",
    rationale:
      "Piège : le « si » mime la forme conditionnelle d'un risque. Quand une phrase commence par « si on perd... », posez-vous : « est-ce qu'on nomme la valeur qui serait perdue, ou est-ce qu'on nomme un événement précis qui pourrait la faire perdre ? ». Ici, ce qui est dit c'est la crédibilité sur le segment public, la valeur en jeu, donc un enjeu. Un vrai risque nommerait la cause et l'événement : par exemple, « si on rate le jalon de conformité de juin, le client peut résilier ».",
    confusionMessages: {
      risque:
        "La forme ressemble à un risque, mais ce qui est dit c'est ce qu'on peut perdre, pas l'événement qui le ferait perdre. Ici on est sur un enjeu parce qu'on nomme la valeur en jeu (la crédibilité). Le risque dirait : « si on rate le jalon de juin, le client peut partir ».",
    },
    theme: "conseil",
  },
  {
    id: ItemId("triage-014"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "enjeu-pur", theme: "rh" },
    statement:
      "Au-delà du chiffre, ce qui compte c'est qu'on reste fidèles à la promesse qu'on a faite aux soignants lors du lancement.",
    expected: "enjeu",
    rationale:
      "Valeur qualitative, identitaire, antérieure à toute mesure. Pas d'événement, pas de cible, pas d'écart constaté. Pur enjeu, exprimé en langue de réunion.",
    confusionMessages: {
      objectif:
        "Ce n'est pas un objectif parce qu'il n'y a rien à mesurer, rien à atteindre, juste une fidélité à préserver. Ici on est sur un enjeu parce que c'est la raison qui orientera les objectifs (par exemple : taux de satisfaction soignants, ou nombre d'engagements respectés).",
    },
    theme: "rh",
  },

  // ──────────────────────────────────────────────────────────────────
  // OBJECTIF (5)
  // ──────────────────────────────────────────────────────────────────
  {
    id: ItemId("triage-002"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "objectif-mesurable", theme: "operations" },
    statement:
      "On veut faire passer le taux de réponse aux sollicitations support de 72 % à 90 % avant fin septembre.",
    expected: "objectif",
    rationale:
      "Cible chiffrée, échéance, verbe d'atteinte. Répond au « quoi vise-t-on ». Pas d'incertitude formulée.",
    confusionMessages: {
      enjeu:
        "Ce n'est pas un enjeu parce qu'il y a déjà une cible et une échéance, quelqu'un a tranché ce qu'on vise. Ici on est sur un objectif parce que c'est mesurable et daté. L'enjeu serait derrière : pourquoi ce taux compte.",
    },
    theme: "operations",
  },
  {
    id: ItemId("triage-010"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "confusion-enjeu-objectif", theme: "conseil" },
    statement:
      "Notre objectif de satisfaction client, c'est d'arriver à 4,5 sur 5 sur les sondages post-mission d'ici la fin du PI.",
    expected: "objectif",
    rationale:
      "Le mot « satisfaction client » fait penser à un enjeu qualitatif. Pour distinguer enjeu et objectif quand un mot valeur apparaît, posez-vous : « y a-t-il une cible chiffrée ou une échéance ? ». Si oui, c'est un objectif. Si non, c'est un enjeu. Ici, 4,5/5 sur les sondages d'ici fin de PI = deux marqueurs mesurables = objectif. L'enjeu derrière, ce serait la fidélisation ou la préférence de marque, formulés sans chiffre parce que qualitatifs.",
    confusionMessages: {
      enjeu:
        "La satisfaction client peut être un enjeu, mais ici elle est cadrée : 4,5/5 d'ici fin de PI. Ici on est sur un objectif parce qu'il y a une cible et une date. L'enjeu derrière, ce serait la fidélisation ou la réputation.",
    },
    theme: "conseil",
  },
  {
    id: ItemId("triage-011"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "objectif-deguise-en-risque", theme: "logiciel" },
    statement:
      "Notre principal risque, c'est de ne pas livrer la V2 le 30 septembre.",
    expected: "objectif",
    rationale:
      "Piège classique : la phrase commence par « risque » mais reformule seulement l'objectif raté. Ici, l'objectif est : livrer la V2 le 30 septembre. Pour trouver le vrai risque, posez-vous la question : « qu'est-ce qui pourrait empêcher cette livraison ? » ou « de quoi dépend-elle, et qu'est-ce qui est fragile ? ». Vous nommerez alors une cause précise (par exemple : la dépendance à l'équipe Paiement n'est pas planifiée dans leur PI), un événement incertain (leur module pourrait ne pas être prêt), une conséquence mesurable (glissement de trois semaines sur la roadmap).",
    confusionMessages: {
      risque:
        "Ce n'est pas un risque parce qu'il n'y a ni cause ni événement, juste l'envers d'un objectif. Ici on est sur l'objectif lui-même, formulé en négatif. Un risque dirait pourquoi on pourrait ne pas livrer (ex : la dépendance paiement n'est pas levée).",
    },
    theme: "logiciel",
  },
  {
    id: ItemId("triage-015"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "objectif-mesurable", theme: "rh" },
    statement:
      "D'ici décembre, on vise à former 80 % des managers de proximité au nouveau processus d'entretien annuel.",
    expected: "objectif",
    rationale:
      "Cible, périmètre, échéance. Aucune incertitude formulée, aucun enjeu nommé.",
    confusionMessages: {
      enjeu:
        "Ce n'est pas un enjeu parce que c'est mesurable et daté. Ici on est sur un objectif parce qu'on vise une cible précise. L'enjeu serait derrière : la qualité du dialogue managérial.",
    },
    theme: "rh",
  },
  {
    id: ItemId("triage-018"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "objectif-mesurable", theme: "operations" },
    statement:
      "L'OKR de l'équipe ce trimestre : réduire de moitié le délai entre la commande et l'expédition sur les commandes B2B.",
    expected: "objectif",
    rationale:
      "Cible explicite (de moitié), périmètre (B2B), horizon (trimestre). Le terme OKR renforce le cadre, mais l'énoncé tient seul comme objectif mesurable.",
    confusionMessages: {
      enjeu:
        "Ce n'est pas un enjeu parce qu'il y a une cible chiffrée et un horizon. Ici on est sur un objectif. L'enjeu derrière serait par exemple : la compétitivité face à un concurrent qui livre en J+1.",
    },
    theme: "operations",
  },

  // ──────────────────────────────────────────────────────────────────
  // RISQUE (4)
  // ──────────────────────────────────────────────────────────────────
  {
    id: ItemId("triage-003"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "risque-canonique", theme: "industriel" },
    statement:
      "Si le nouveau règlement européen sur les batteries entre en application avant qu'on ait validé notre cellule, on devra revoir toute la chaîne d'assemblage.",
    expected: "risque",
    rationale:
      "Conditionnel explicite, cause (calendrier réglementaire) + événement incertain + conséquence. Anatomie complète, pas encore avéré.",
    confusionMessages: {
      issue:
        "Ce n'est pas une issue parce que le règlement n'est pas encore en vigueur, rien n'est constaté. Ici on est sur un risque parce que l'événement est conditionnel : ça pourrait arriver, et alors on devrait agir.",
    },
    theme: "industriel",
  },
  {
    id: ItemId("triage-007"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "risque-canonique", theme: "logiciel" },
    statement:
      "Si Marc part en arrêt comme l'an dernier en mars, on n'a personne qui sait reprendre la maintenance du moteur de règles.",
    expected: "risque",
    rationale:
      "Cause identifiée (mono-compétence), événement incertain (arrêt de Marc), conséquence claire (continuité de service). Forme canonique en langue d'équipe.",
    confusionMessages: {
      issue:
        "Ce n'est pas une issue parce que Marc n'est pas en arrêt aujourd'hui, on est dans le conditionnel. Ici on est sur un risque parce que l'événement peut survenir, et c'est précisément maintenant qu'on peut agir dessus (binôme, doc, formation).",
    },
    theme: "logiciel",
  },
  {
    id: ItemId("triage-013"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "risque-canonique", theme: "evenementiel" },
    statement:
      "Avec deux personnes du staff covid+ à J-3, on pourrait se retrouver sous-staffé à l'accueil samedi si une troisième tombe.",
    expected: "risque",
    rationale:
      "Cause documentée (contagion en cours), événement incertain (3e cas), conséquence opérationnelle (accueil sous-staffé). La présence des deux cas avérés ne suffit pas à transformer ça en issue ; ce qui est nommé reste un événement futur conditionnel.",
    confusionMessages: {
      issue:
        "Les deux cas covid+ sont des faits, mais ici la phrase porte sur le sous-staffing potentiel de samedi, pas sur ce qui est constaté. Ici on est sur un risque parce que l'événement (3e cas) est encore conditionnel.",
    },
    theme: "evenementiel",
  },
  {
    id: ItemId("triage-016"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "confusion-issue-risque", theme: "conseil" },
    statement:
      "Le fournisseur menace de ne pas livrer le module logistique à temps si on ne valide pas le cahier des charges cette semaine.",
    expected: "risque",
    rationale:
      "Piège : le verbe « menace » induit en erreur en sonnant comme un fait présent. Pour trancher, posez-vous : « le fait est-il déjà constaté, ou seulement annoncé comme possible ? ». Ici, la non-livraison n'est pas avérée : elle est annoncée sous condition. C'est donc un risque. Bonus pédagogique : la cause est activable (valider les specs cette semaine), ce qui rend la mitigation directement actionnable en atelier.",
    confusionMessages: {
      issue:
        "Ce n'est pas une issue parce que la non-livraison n'est pas constatée, elle est annoncée comme possible. Ici on est sur un risque parce que l'événement reste conditionnel, et on a même un levier sur la cause (valider cette semaine).",
    },
    theme: "conseil",
  },

  // ──────────────────────────────────────────────────────────────────
  // ISSUE (5)
  // ──────────────────────────────────────────────────────────────────
  {
    id: ItemId("triage-004"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "issue-avere-passe", theme: "logiciel" },
    statement:
      "Hier soir le service de paiement est tombé pendant 47 minutes, on a perdu environ 1 200 transactions.",
    expected: "issue",
    rationale:
      "Passé constaté, faits chiffrés, plus aucune incertitude. C'est un problème avéré à traiter, pas un risque à surveiller.",
    confusionMessages: {
      risque:
        "Ce n'est pas un risque parce que c'est déjà arrivé : passé, chiffré, fini. Ici on est sur une issue parce qu'il n'y a plus rien à évaluer en probabilité, il y a à traiter.",
    },
    theme: "logiciel",
  },
  {
    id: ItemId("triage-005"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "issue-avere-present", theme: "industriel" },
    statement:
      "Notre taux de rebut sur la ligne 3 est à 14 % depuis lundi, on tourne normalement à 3 %.",
    expected: "issue",
    rationale:
      "Présent constaté, écart mesuré, durée installée. Le problème est là, maintenant.",
    confusionMessages: {
      risque:
        "Ce n'est pas un risque parce que l'écart est constaté, pas anticipé : on est passés de 3 % à 14 %, c'est mesuré. Ici on est sur une issue parce que c'est la situation présente, pas un futur conditionnel.",
    },
    theme: "industriel",
  },
  {
    id: ItemId("triage-008"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "confusion-enjeu-issue", theme: "operations" },
    statement:
      "Notre crédibilité auprès de Carrefour est en train d'en prendre un coup : ils nous ont signifié hier qu'ils suspendent les commandes le temps qu'on clarifie.",
    expected: "issue",
    rationale:
      "Piège classique : le mot « crédibilité » déclenche le réflexe « enjeu ». Pour lever l'ambiguïté quand un mot valeur (crédibilité, sécurité, image) apparaît dans un énoncé, posez-vous la question : « est-ce que je nomme la valeur qui est en jeu, ou est-ce que je nomme un fait qui l'a déjà affectée ? ». Ici, la suspension des commandes est signifiée et datée d'hier : c'est une issue. La crédibilité chez Carrefour reste l'enjeu qu'on cherche à préserver, mais ce qui est devant nous à traiter maintenant, c'est le fait.",
    confusionMessages: {
      enjeu:
        "L'enjeu de crédibilité existe bien, mais ici on parle d'un fait : Carrefour a suspendu les commandes hier. Ici on est sur une issue parce que c'est constaté et daté. L'enjeu, c'est ce qui est attaqué ; l'issue, c'est l'attaque qui a eu lieu.",
    },
    theme: "operations",
  },
  {
    id: ItemId("triage-009"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "confusion-issue-risque", theme: "logiciel" },
    statement:
      "Sur la dernière itération le binôme front bloque sur l'API d'auth, ils n'avancent plus depuis trois jours.",
    expected: "issue",
    rationale:
      "Piège : « bloque » peut sembler une menace en cours plutôt qu'un fait avéré. Pour trancher entre risque et issue, cherchez les marqueurs temporels et les faits constatés. Les mots « depuis », « hier », « en cours », un chiffre déjà mesuré désignent une issue. Les mots « si », « pourrait », « en cas de » désignent un risque. Ici, « depuis trois jours » ferme l'incertitude : c'est une issue à traiter, pas un risque à évaluer en probabilité.",
    confusionMessages: {
      risque:
        "Ce n'est pas un risque parce qu'il n'y a pas d'incertitude : le blocage dure depuis trois jours, c'est constaté. Ici on est sur une issue parce que l'événement s'est produit et continue. À traiter, pas à évaluer en probabilité.",
    },
    theme: "logiciel",
  },
  {
    id: ItemId("triage-017"),
    mechanic: MECHANICS.TRI,
    signature: { trapPattern: "issue-avere-present", theme: "logiciel" },
    statement:
      "On vient de découvrir que les sauvegardes ne tournaient plus depuis fin avril sur l'environnement de pré-prod.",
    expected: "issue",
    rationale:
      "Fait découvert mais déjà installé. « Depuis fin avril » ferme l'incertitude. Le risque latent (perte de données) s'est déjà partiellement réalisé (deux mois sans sauvegarde).",
    confusionMessages: {
      risque:
        "Ce n'est pas un risque parce que la défaillance dure depuis deux mois, c'est constaté. Ici on est sur une issue parce que le problème est avéré. Le risque associé (perte de données si incident) reste à formuler à côté, mais ce qui est nommé ici, c'est le fait.",
    },
    theme: "logiciel",
  },
];
