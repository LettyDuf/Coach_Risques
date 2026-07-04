/**
 * Théorie du triptyque pédagogique — Coach Risques.
 *
 * Source : DOMAINE.md §1 (validé par Lætitia).
 *
 * Discipline (D14) : contenu pédagogique externalisé. Deux niveaux :
 *  - `quickCard` : version ultra-compacte utilisée en activité (panneau
 *    Théorie escamotable). Question + essence + repère temporel.
 *    Conçue pour servir de référence mentale.
 *  - `details`   : fiche complète, utilisée dans une future page
 *    Théorie dédiée accessible depuis le Hub.
 */

import type { TriageVerdict } from "@domain/index";

export type QuickCard = {
  /** La question-déclic qui doit revenir à l'apprenant face à un énoncé. */
  readonly question: string;
  /** L'essence en un verbe et un complément court. */
  readonly essence: string;
  /** Le repère temporel — la grille mentale pour positionner la catégorie. */
  readonly temporalCue: string;
};

export type TriptyqueDetails = {
  readonly definition: string;
  readonly howToSpot: ReadonlyArray<string>;
  readonly example: string;
};

export type TriptyqueDefinition = {
  readonly verdict: TriageVerdict;
  readonly label: string;
  readonly quickCard: QuickCard;
  readonly details: TriptyqueDetails;
};

export const TRIPTYQUE_THEORY: ReadonlyArray<TriptyqueDefinition> = [
  {
    verdict: "enjeu",
    label: "Enjeu",
    quickCard: {
      question: "« À quoi tenons-nous ici ? »",
      essence: "Une valeur à préserver",
      temporalCue: "Existe avant, pendant, après",
    },
    details: {
      definition:
        "Notion francophone sans équivalent anglais direct. L'enjeu désigne ce qu'on peut gagner ou perdre, ce qui justifie d'agir. Il est qualitatif et antérieur à toute mesure ou plan d'action. C'est la raison derrière l'objectif.",
      howToSpot: [
        "Aucune cible chiffrée, aucune échéance.",
        "Formulé en termes de valeur, de crédibilité, de sécurité, d'image, de mission.",
        "Existait déjà avant le projet et continuera après.",
      ],
      example:
        "« La sécurité physique des visiteurs » est un enjeu. L'objectif qui le sert pourrait être : « disposer de 12 agents de sécurité présents à l'ouverture des portes ».",
    },
  },
  {
    verdict: "objectif",
    label: "Objectif",
    quickCard: {
      question: "« Quoi atteindre ? »",
      essence: "Une cible mesurable à viser",
      temporalCue: "Pendant le projet, daté",
    },
    details: {
      definition:
        "Cible concrète à atteindre, mesurable et bornée dans le temps. Sert un enjeu sans s'y confondre : il est l'action de viser, l'enjeu est la raison de viser.",
      howToSpot: [
        "Cible chiffrée ou observable (taux, volume, présence/absence).",
        "Échéance ou horizon explicite.",
        "Verbe d'atteinte : viser, atteindre, livrer, réduire à, passer de X à Y.",
      ],
      example:
        "« Faire passer le taux de réponse au support de 72 % à 90 % avant fin septembre » est un objectif.",
    },
  },
  {
    verdict: "risque",
    label: "Risque",
    quickCard: {
      question: "« Et si... ? »",
      essence: "Ce qui pourrait l'affecter",
      temporalCue: "Futur incertain",
    },
    details: {
      definition:
        "Au sens ISO 31000, le risque est « l'effet de l'incertitude sur les objectifs ». C'est un événement qui n'a pas eu lieu mais qui pourrait, et qui, s'il survenait, affecterait l'atteinte d'un objectif. Il est mesuré par probabilité × impact.",
      howToSpot: [
        "Formulé au conditionnel : si X arrivait, alors…",
        "Cause identifiable + événement encore incertain + conséquence.",
        "Pas encore avéré, on peut agir dessus dès maintenant.",
      ],
      example:
        "« Si le règlement entre en vigueur avant qu'on ait validé la cellule, on devra revoir toute la chaîne d'assemblage » est un risque.",
    },
  },
  {
    verdict: "issue",
    label: "Issue",
    quickCard: {
      question: "« Qu'est-ce qui l'a déjà affectée ? »",
      essence: "Ce qui a déjà affecté la valeur",
      temporalCue: "Déjà constaté",
    },
    details: {
      definition:
        "Faux-ami du mot français « enjeu ». En anglais (et en gestion de projet PMBOK), une issue désigne un risque qui s'est matérialisé, ou un problème déjà constaté qui demande une action immédiate. Sort du registre des risques pour entrer dans le registre des issues à traiter.",
      howToSpot: [
        "Verbe au passé constaté ou au présent installé : « est tombé », « tourne à 14 % depuis lundi ».",
        "Plus rien d'incertain : le fait est avéré, daté, chiffré.",
        "Demande une action immédiate, pas une évaluation de probabilité.",
      ],
      example:
        "« Hier soir le service de paiement est tombé pendant 47 minutes » est une issue.",
    },
  },
];
