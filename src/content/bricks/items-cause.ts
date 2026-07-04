/**
 * Corpus « Le facteur » (brique Cause). 8 items validés Lætitia 2026-07-01.
 * Chaque item : 1 bonne cause + 3 pièges typés (constat, evenement, antecedent).
 */

import { ItemId, MECHANICS } from "@domain/index";
import type { BrickCauseItem } from "./types";

export const BRICKS_CAUSE_ITEMS: ReadonlyArray<BrickCauseItem> = [
  {
    id: ItemId("bricks-cause-001"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "cause-vs-constat", theme: "ops" },
    component: "cause",
    theme: "ops",
    correctNature: "cause",
    candidates: [
      { nature: "cause", text: "L'astreinte N2 tourne à trois personnes depuis le départ de deux ops le mois dernier, sans embauche prévue avant la rentrée." },
      { nature: "constat", text: "Notre équipe ops est sous-dimensionnée.", feedback: "C'est un constat général, pas un facteur qui explique un risque précis. Une cause raconte un mécanisme, pas un état." },
      { nature: "evenement", text: "Un incident P1 pourrait tomber un dimanche sans personne pour répondre.", feedback: "Là vous décrivez ce qui pourrait arriver, pas ce qui rend l'arrivée possible. L'événement est le quoi, la cause est le pourquoi." },
      { nature: "antecedent", text: "L'année dernière on a eu un incident P1 non couvert un dimanche à cause de l'astreinte.", feedback: "C'est un récit du passé, utile en postmortem mais pas actionnable comme cause présente. Une cause vit maintenant." },
    ],
  },
  {
    id: ItemId("bricks-cause-002"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "cause-vs-constat", theme: "securite" },
    component: "cause",
    theme: "securite",
    correctNature: "cause",
    candidates: [
      { nature: "cause", text: "Le connecteur SSO SAML utilise une bibliothèque en fin de support depuis mars, non budgétée pour être remplacée sur ce PI." },
      { nature: "constat", text: "Notre stack d'authentification n'est pas parfaitement à jour.", feedback: "Trop vague pour porter un risque. Une cause pointe un facteur nommé avec sa temporalité, pas une impression générale." },
      { nature: "evenement", text: "Un attaquant pourrait exploiter une faille du connecteur SSO.", feedback: "Vous formulez déjà l'événement redouté. La cause serait plutôt : pourquoi cette exploitation est-elle possible aujourd'hui ?" },
      { nature: "antecedent", text: "En 2024, une bibliothèque périmée avait déjà causé un incident de sécurité.", feedback: "C'est un précédent historique, pas un facteur actif sur le risque en cours. Une cause pèse sur l'événement d'aujourd'hui." },
    ],
  },
  {
    id: ItemId("bricks-cause-003"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "cause-vs-antecedent", theme: "sre" },
    component: "cause",
    theme: "sre",
    correctNature: "cause",
    candidates: [
      { nature: "cause", text: "Le runbook de bascule DR pointe encore vers l'ancienne région AWS retirée du périmètre en avril, personne ne l'a mis à jour." },
      { nature: "constat", text: "Notre documentation SRE a besoin d'un rafraîchissement.", feedback: "Vrai mais générique. Une cause désigne un artefact précis dont l'obsolescence produit un effet concret." },
      { nature: "evenement", text: "Une bascule DR pourrait échouer le jour où on en aura besoin.", feedback: "C'est l'événement redouté. La cause est ce qui rend cet échec possible, pas l'échec lui-même." },
      { nature: "antecedent", text: "Lors du dernier gameday DR, on avait détecté que le runbook était partiellement faux.", feedback: "Un enseignement du passé, pas un facteur mobilisable. Si rien n'a été corrigé depuis, la vraie cause est l'inaction, pas le gameday." },
    ],
  },
  {
    id: ItemId("bricks-cause-004"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "cause-vs-evenement", theme: "produit" },
    component: "cause",
    theme: "produit",
    correctNature: "cause",
    candidates: [
      { nature: "cause", text: "Les hypothèses d'usage du nouveau parcours de checkout n'ont jamais été testées avec de vrais utilisateurs, la discovery a été sautée pour tenir le PI." },
      { nature: "constat", text: "Notre parcours de checkout est nouveau.", feedback: "Un état neutre, pas un facteur de risque. Une cause explique pourquoi la nouveauté est problématique, pas qu'elle existe." },
      { nature: "evenement", text: "Les utilisateurs pourraient abandonner le nouveau checkout.", feedback: "C'est l'événement à redouter. La cause est ce qui rend cet abandon plausible, ici l'absence de test préalable." },
      { nature: "antecedent", text: "En 2024, on avait déjà lancé un checkout sans discovery et ça avait posé problème.", feedback: "Un précédent, pas un facteur actif. La cause vit dans le contexte présent, elle pèse sur le risque de ce sprint-ci." },
    ],
  },
  {
    id: ItemId("bricks-cause-005"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "cause-vs-constat", theme: "data" },
    component: "cause",
    theme: "data",
    correctNature: "cause",
    candidates: [
      { nature: "cause", text: "Le pipeline ETL nuit dépend d'un extract SFTP d'un fournisseur qui n'a signé aucun SLA de disponibilité pour son endpoint." },
      { nature: "constat", text: "Notre chaîne data intègre plusieurs fournisseurs externes.", feedback: "C'est une topologie, pas une cause. Un fait structurel ne devient cause qu'en pointant précisément ce qui coince." },
      { nature: "evenement", text: "Le pipeline pourrait tomber en échec une nuit sans qu'on récupère à temps.", feedback: "Ça, c'est l'événement redouté. La cause explique pourquoi cette panne devient probable maintenant." },
      { nature: "antecedent", text: "En janvier, l'endpoint SFTP du fournisseur avait déjà été indisponible deux nuits.", feedback: "Ce serait une cause si l'incident se répétait ou si rien n'avait été corrigé. Formulé au passé isolé, c'est un récit." },
    ],
  },
  {
    id: ItemId("bricks-cause-006"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "cause-vs-antecedent", theme: "cloud" },
    component: "cause",
    theme: "cloud",
    correctNature: "cause",
    candidates: [
      { nature: "cause", text: "La politique IAM du compte production a été ouverte à un rôle admin partagé lors du dernier hotfix et n'a pas été refermée depuis." },
      { nature: "constat", text: "Notre gouvernance IAM n'est pas au niveau attendu.", feedback: "Une évaluation globale, pas un facteur. Une cause s'écrit avec un sujet précis et un verbe qui décrit un état actif." },
      { nature: "evenement", text: "Un rôle admin partagé pourrait servir à une action non tracée.", feedback: "Vous décrivez déjà ce qui pourrait arriver. La cause est ce qui rend cette action non tracée possible aujourd'hui." },
      { nature: "antecedent", text: "Il y a deux ans, un rôle admin partagé avait été utilisé par erreur.", feedback: "Un fait passé documenté. Il éclaire, mais ne remplace pas la cause qui pèse maintenant sur la prod." },
    ],
  },
  {
    id: ItemId("bricks-cause-007"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "cause-vs-constat", theme: "dev" },
    component: "cause",
    theme: "dev",
    correctNature: "cause",
    candidates: [
      { nature: "cause", text: "La suite de tests d'intégration du monolithe core met 42 minutes à tourner, donc les développeurs la court-circuitent avant merge." },
      { nature: "constat", text: "Nos tests d'intégration sont lents.", feedback: "Vrai mais insuffisant. La cause est le comportement de contournement que la lenteur déclenche, pas la lenteur seule." },
      { nature: "evenement", text: "Une régression pourrait passer inaperçue jusqu'en prod.", feedback: "C'est l'événement redouté. La cause explique pourquoi elle peut échapper aux garde-fous existants." },
      { nature: "antecedent", text: "Le mois dernier, une régression est passée en prod parce que les tests avaient été skippés.", feedback: "Un incident du passé. S'il n'a rien changé au comportement de l'équipe, la cause d'aujourd'hui reste la même : le contournement toléré." },
    ],
  },
  {
    id: ItemId("bricks-cause-008"),
    mechanic: MECHANICS.BRICKS,
    signature: { trapPattern: "cause-vs-antecedent", theme: "ci-cd" },
    component: "cause",
    theme: "ci-cd",
    correctNature: "cause",
    candidates: [
      { nature: "cause", text: "Le token GitHub qui authentifie les runners CI de l'équipe expire dans onze jours et son renouvellement dépend d'une personne actuellement en congé." },
      { nature: "constat", text: "On a des dépendances sur un token GitHub pour la CI.", feedback: "C'est une topologie, pas un facteur. La cause tient dans la combinaison expiration + personne indisponible, pas dans la dépendance seule." },
      { nature: "evenement", text: "La CI pourrait s'arrêter et bloquer tous les merges.", feedback: "C'est l'événement à éviter. La cause est ce qui rend cet arrêt probable dans la fenêtre à venir." },
      { nature: "antecedent", text: "En 2025, un token expiré avait déjà bloqué la CI pendant 36 heures.", feedback: "Un précédent utile en rétrospective mais pas actif sur le risque présent. La cause est la temporalité de ce token-ci." },
    ],
  },
];
