/**
 * « Le Tri » (O1) — discrimination enjeu / objectif / risque / issue.
 *
 * Spec UX-UI §3 (Le Tri) + §4 (divulgation progressive : panneau Théorie escamotable).
 * Charte cabinet (D24) : plateau sauge, carte-énoncé parchemin cadre or,
 * quatre cibles biseautées avec seaux héraldiques.
 */

import { useEffect, useMemo, useState } from "react";
import { useEngine } from "@adapters/ui/hooks/useEngine";
import {
  MECHANICS,
  ZONES,
  type EvaluationResult,
  type ItemId,
  type TriageVerdict,
} from "@domain/index";
import type { TriageItem, TriageTheme } from "@content/triage/types";
import { TRIPTYQUE_THEORY } from "@content/theory/triptyque";
import ZoomControl, { useZoom } from "@adapters/ui/shared/ZoomControl";
import "@adapters/ui/shared/ZoomControl.css";
import "./TriBoard.css";

type ZoneCard = {
  verdict: TriageVerdict;
  label: string;
  hint: string;
  shortcut: string;
};

/**
 * Les 4 cibles catégorielles (bas du plateau).
 * `hint` = phrase courte en italique sous le titre.
 */
const ZONE_CARDS: ReadonlyArray<ZoneCard> = [
  {
    verdict: "enjeu",
    label: "Enjeu",
    hint: "ce qu'il faut préserver",
    shortcut: "1",
  },
  {
    verdict: "objectif",
    label: "Objectif",
    hint: "la cible qu'on vise",
    shortcut: "2",
  },
  {
    verdict: "risque",
    label: "Risque",
    hint: "l'incertain qui approche",
    shortcut: "3",
  },
  {
    verdict: "issue",
    label: "Issue",
    hint: "le fait déjà survenu",
    shortcut: "4",
  },
];

const THEME_LABEL: Record<TriageTheme, string> = {
  logiciel: "Logiciel",
  evenementiel: "Événementiel",
  industriel: "Industriel",
  conseil: "Conseil",
  rh: "Ressources",
  operations: "Opérations",
};

export type TriBoardProps = {
  onExit: () => void;
};

export default function TriBoard(props: TriBoardProps) {
  const engine = useEngine();
  const [currentId, setCurrentId] = useState<ItemId | null>(null);
  const [chosen, setChosen] = useState<TriageVerdict | null>(null);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [showWhy, setShowWhy] = useState(false);
  const [showTheory, setShowTheory] = useState<boolean>(false);
  const { zoom, change: changeZoom } = useZoom("coach-risques-triboard-zoom");

  useEffect(() => {
    const next = engine.nextItem({ mechanic: MECHANICS.TRI });
    setCurrentId(next);
  }, [engine]);

  const item = useMemo<TriageItem | null>(() => {
    if (!currentId) return null;
    return getItemUntyped(currentId);
  }, [currentId]);

  useEffect(() => {
    if (!currentId || result) return;
    function handler(e: KeyboardEvent) {
      const card = ZONE_CARDS.find((c) => c.shortcut === e.key);
      if (card) submitVerdict(card.verdict);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  function submitVerdict(verdict: TriageVerdict) {
    if (!currentId || result) return;
    const evalResult = engine.evaluateTriage(currentId, verdict);
    setChosen(verdict);
    setResult(evalResult);
    engine.registerOutcome(ZONES.TRIPTYQUE, currentId, evalResult);
  }

  function nextRound() {
    setResult(null);
    setChosen(null);
    setShowWhy(false);
    const next = engine.nextItem({ mechanic: MECHANICS.TRI });
    setCurrentId(next);
  }

  if (!item) {
    return (
      <main className="triboard triboard--empty">
        <p>Aucun item disponible pour le moment.</p>
        <button type="button" className="btn" onClick={props.onExit}>
          Retour à la carte
        </button>
      </main>
    );
  }

  const isCorrect = result?.outcome === "success";
  const expectedVerdict = item.expected;

  return (
    <main className="triboard">
      <header className="triboard__header">
        <button
          type="button"
          className="triboard__back"
          onClick={props.onExit}
        >
          ← Carte de maîtrise
        </button>
        <ZoomControl zoom={zoom} onChange={changeZoom} className="triboard__zoom" />
        <button
          type="button"
          className="triboard__theory-toggle"
          onClick={() => setShowTheory((v) => !v)}
          aria-expanded={showTheory}
          aria-controls="theory-panel"
        >
          {showTheory ? "Fermer la théorie" : "Théorie"}
        </button>
      </header>

      <div
        className="triboard__viewport"
        style={{ zoom }}
      >

      {showTheory && <TheoryPanel onClose={() => setShowTheory(false)} />}

      <section
        className="plateau"
        aria-label="Le Tri — plateau du cabinet"
      >
        <div
          className="plateau__rail plateau__rail--left"
          aria-hidden="true"
        />
        <div
          className="plateau__rail plateau__rail--right"
          aria-hidden="true"
        />
        <h1 className="plateau__cartouche plateau__cartouche--left">
          Le Tri
        </h1>
        <span
          className="plateau__cartouche plateau__cartouche--right"
          aria-hidden="true"
        >
          Le Cabinet
        </span>

        <div className="plateau__grid">
          <div className="pile" aria-hidden="true">
            <div className="pile__cards">
              <div className="pile__back" />
              <div className="pile__back" />
              <div className="pile__back" />
            </div>
            <span className="pile__label">Pile</span>
          </div>

          <div className="aire-lecture" aria-label="Énoncé à classer">
            <article className="card" key={String(currentId)}>
              <span className="card__rosace card__rosace--tl" aria-hidden="true">
                ❦
              </span>
              <span className="card__rosace card__rosace--tr" aria-hidden="true">
                ❦
              </span>
              <span className="card__rosace card__rosace--bl" aria-hidden="true">
                ❦
              </span>
              <span className="card__rosace card__rosace--br" aria-hidden="true">
                ❦
              </span>

              <div className="card__band">
                <span className="card__band-team">{THEME_LABEL[item.theme]}</span>
                <span className="card__band-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 14c2 -1 4 -2 7 -2c3 0 4 2 5 3l2 -1c1 0 3 0 3 -2c-1 -2 -4 -4 -8 -4c-5 0 -8 3 -9 6z" />
                    <circle cx="17" cy="10" r="0.7" fill="currentColor" />
                    <path d="M4 14l-2 3M6 15l-1 3M8 15l-1 3" />
                  </svg>
                </span>
              </div>

              <div className="card__body">
                <div className="card__vignette" aria-hidden="true">
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="50" cy="50" r="20" />
                    <circle cx="50" cy="50" r="7" />
                    <g strokeLinecap="round">
                      <line x1="50" y1="18" x2="50" y2="30" />
                      <line x1="50" y1="70" x2="50" y2="82" />
                      <line x1="18" y1="50" x2="30" y2="50" />
                      <line x1="70" y1="50" x2="82" y2="50" />
                      <line x1="28" y1="28" x2="35" y2="35" />
                      <line x1="65" y1="65" x2="72" y2="72" />
                      <line x1="28" y1="72" x2="35" y2="65" />
                      <line x1="65" y1="35" x2="72" y2="28" />
                    </g>
                  </svg>
                </div>
                <p className="card__text">« {item.statement} »</p>
              </div>

              <div className="card__foot" aria-hidden="true">
                ✧ ∼ ✧
              </div>
            </article>
          </div>

          <div className="plateau__spacer" aria-hidden="true" />

          <section className="cibles" aria-label="Quatre catégories">
            {ZONE_CARDS.map((card) => {
              const wasChosen = chosen === card.verdict;
              const isExpected = expectedVerdict === card.verdict;
              const showAsCorrect = result && isExpected;
              const showAsWrongChoice = result && wasChosen && !isCorrect;

              const stateClass = !result
                ? ""
                : showAsCorrect
                  ? " cible--state-correct"
                  : showAsWrongChoice
                    ? " cible--state-wrong"
                    : " cible--state-dimmed";

              return (
                <button
                  key={card.verdict}
                  type="button"
                  className={`cible cible--${card.verdict}${stateClass}`}
                  onClick={() => submitVerdict(card.verdict)}
                  disabled={result !== null}
                  aria-label={`Classer comme ${card.label} (touche ${card.shortcut})`}
                >
                  <span className="cible__shortcut" aria-hidden="true">
                    {card.shortcut}
                  </span>
                  <div className="cible__illu" aria-hidden="true">
                    <TargetIllustration verdict={card.verdict} />
                  </div>
                  <p className="cible__title">{card.label}</p>
                  <p className="cible__hint">{card.hint}</p>
                  <span className="cible__seal" aria-hidden="true">
                    <TargetSeal verdict={card.verdict} />
                  </span>
                  {showAsCorrect && (
                    <span className="cible__badge cible__badge--correct">
                      Bonne réponse
                    </span>
                  )}
                  {showAsWrongChoice && (
                    <span className="cible__badge cible__badge--wrong">
                      Votre choix
                    </span>
                  )}
                </button>
              );
            })}
          </section>
        </div>
      </section>

      {result && (
        <section
          className={`feedback feedback--${isCorrect ? "success" : "miss"}`}
          aria-live="polite"
        >
          <div className="feedback__verdict">
            <span
              className={`feedback__verdict-tag ${isCorrect ? "feedback__verdict-tag--ok" : "feedback__verdict-tag--miss"}`}
            >
              {isCorrect ? "Juste" : "À revoir"}
            </span>
            <p className="feedback__verdict-text">
              {isCorrect ? (
                <>
                  C'est bien une formulation de type « {labelOf(expectedVerdict)} ».
                </>
              ) : (
                <>
                  <strong>
                    La bonne réponse est « {labelOf(expectedVerdict)} ».
                  </strong>{" "}
                  <em>{result.feedbacks[0]?.message}</em>
                </>
              )}
            </p>
          </div>

          <div className="feedback__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setShowWhy((v) => !v)}
            >
              {showWhy ? "Masquer le pourquoi" : "Voir le pourquoi"}
            </button>
            <button type="button" className="btn btn--primary" onClick={nextRound}>
              Piocher la suivante →
            </button>
          </div>

          {showWhy && (
            <aside className="feedback__theory">
              <h3>Pourquoi cette catégorie</h3>
              <p>{item.rationale}</p>
            </aside>
          )}
        </section>
      )}
      </div>
    </main>
  );
}

function labelOf(v: TriageVerdict): string {
  return ZONE_CARDS.find((c) => c.verdict === v)?.label ?? v;
}

// ─────────────────────────────────────────────────────────────────────
// Illustrations (SVG inline) — pédagogiques et héraldiques
// ─────────────────────────────────────────────────────────────────────

function TargetIllustration({ verdict }: { verdict: TriageVerdict }) {
  switch (verdict) {
    case "enjeu":
      // Coffre à trésor : corps rectangulaire, couvercle bombé, rehausses or
      // horizontales et verticales, cadenas doré central bien visible.
      // Métaphore : ce qui a de la valeur et qu'on garde sous clé.
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Ombre au sol */}
          <ellipse cx="50" cy="90" rx="34" ry="3" fill="#000" opacity="0.35" />

          {/* Corps rectangulaire (base du coffre) */}
          <rect
            x="14"
            y="52"
            width="72"
            height="34"
            fill="var(--cabinet-target-enjeu-ink)"
            stroke="var(--cabinet-or-sceau)"
            strokeWidth="2.2"
          />

          {/* Couvercle bombé */}
          <path
            d="M14 52 Q50 24 86 52 L86 46 Q50 22 14 46 Z"
            fill="var(--cabinet-target-enjeu)"
            stroke="var(--cabinet-or-sceau)"
            strokeWidth="2.2"
          />

          {/* Bande médiane sur le couvercle (arête haute) */}
          <path
            d="M14 46 Q50 22 86 46"
            stroke="var(--cabinet-or-sceau)"
            strokeWidth="1.2"
            opacity="0.75"
            fill="none"
          />

          {/* Rehausses or VERTICALES (bandes de renfort classiques d'un coffre) */}
          <path
            d="M28 46 Q28 32 30 24 M72 46 Q72 32 70 24"
            stroke="var(--cabinet-or-sceau)"
            strokeWidth="2"
            opacity="0.85"
            fill="none"
          />
          <line
            x1="28"
            y1="52"
            x2="28"
            y2="86"
            stroke="var(--cabinet-or-sceau)"
            strokeWidth="2"
          />
          <line
            x1="72"
            y1="52"
            x2="72"
            y2="86"
            stroke="var(--cabinet-or-sceau)"
            strokeWidth="2"
          />

          {/* Bande or HORIZONTALE médiane sur le corps */}
          <line
            x1="14"
            y1="66"
            x2="86"
            y2="66"
            stroke="var(--cabinet-or-sceau)"
            strokeWidth="1.5"
            opacity="0.75"
          />

          {/* CADENAS DORÉ (pièce maîtresse, signal fort de coffre) */}
          {/* Anse en fer à cheval */}
          <path
            d="M44 60 L44 55 Q44 48 50 48 Q56 48 56 55 L56 60"
            stroke="var(--cabinet-or-sceau)"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Corps du cadenas */}
          <rect
            x="41"
            y="60"
            width="18"
            height="16"
            rx="2"
            fill="var(--cabinet-or-sceau)"
            stroke="#2A2622"
            strokeWidth="1"
          />
          {/* Trou de serrure */}
          <circle cx="50" cy="66" r="1.8" fill="#2A2622" />
          <path d="M50 67.5 L50 72" stroke="#2A2622" strokeWidth="1.6" />

          {/* Reflet sur le corps */}
          <path
            d="M18 56 L18 82"
            stroke="var(--cabinet-parchment)"
            strokeWidth="0.6"
            opacity="0.35"
            fill="none"
          />
        </svg>
      );

    case "objectif":
      // Cible d'archerie avec flèche plantée en plein cœur.
      // Métaphore : le but visé, atteint avec précision.
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Cible : 4 anneaux concentriques */}
          <circle
            cx="40"
            cy="54"
            r="32"
            fill="var(--cabinet-parchment)"
            stroke="var(--cabinet-or-sceau)"
            strokeWidth="1.5"
          />
          <circle cx="40" cy="54" r="24" fill="var(--cabinet-target-objectif)" />
          <circle cx="40" cy="54" r="16" fill="var(--cabinet-parchment)" />
          <circle cx="40" cy="54" r="9" fill="var(--cabinet-target-objectif)" />
          <circle cx="40" cy="54" r="3" fill="var(--cabinet-parchment)" />
          {/* Ombre portée de la flèche sur la cible */}
          <line
            x1="42"
            y1="56"
            x2="78"
            y2="20"
            stroke="#000"
            strokeWidth="2"
            opacity="0.15"
          />
          {/* Hampe de la flèche */}
          <line
            x1="40"
            y1="54"
            x2="80"
            y2="14"
            stroke="var(--cabinet-parchment)"
            strokeWidth="2.4"
          />
          {/* Pointe métallique (dans la cible) */}
          <path
            d="M40 54 L45 51 L44 58 Z"
            fill="var(--cabinet-parchment)"
            stroke="var(--cabinet-parchment)"
            strokeWidth="0.5"
          />
          {/* Empennage à plumes (3 plumes) */}
          <path
            d="M78 16 L88 6 L86 18 Z"
            fill="var(--cabinet-parchment)"
            stroke="var(--cabinet-parchment)"
            strokeWidth="0.8"
          />
          <path
            d="M82 20 L92 10 L90 22 Z"
            fill="var(--cabinet-or-sceau)"
            stroke="var(--cabinet-parchment)"
            strokeWidth="0.6"
            opacity="0.9"
          />
          {/* Éclat lumineux (impact) */}
          <path
            d="M40 54 L44 50 M40 54 L36 50 M40 54 L44 58"
            stroke="var(--cabinet-parchment)"
            strokeWidth="0.8"
            opacity="0.7"
          />
        </svg>
      );

    case "risque":
      // Nuage d'orage stylisé avec éclair jaune.
      // Métaphore : la menace incertaine qui approche.
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Nuage principal : silhouette bosselée */}
          <path
            d="M22 46
               C 18 38 26 30 34 32
               C 36 22 52 20 58 30
               C 68 26 82 32 80 44
               C 86 48 84 58 74 58
               L 30 58
               C 20 60 14 52 22 46 Z"
            fill="#C4B8C4"
            stroke="var(--cabinet-parchment)"
            strokeWidth="1.8"
          />
          {/* Ombre du dessous du nuage */}
          <path
            d="M28 54 Q50 62 72 54"
            stroke="#7A5479"
            strokeWidth="1.4"
            opacity="0.75"
            fill="none"
          />
          {/* Éclair jaune (Z inversé) */}
          <path
            d="M52 58 L44 74 L54 74 L46 92 L64 68 L54 68 L60 58 Z"
            fill="var(--cabinet-or-sceau)"
            stroke="var(--cabinet-parchment)"
            strokeWidth="1.2"
          />
          {/* Gouttes de pluie suggérées */}
          <path
            d="M30 64 L28 70 M38 66 L36 72 M72 66 L74 72 M80 64 L82 70"
            stroke="var(--cabinet-parchment)"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Petites étoiles/étincelles autour de l'éclair */}
          <circle cx="42" cy="80" r="0.8" fill="var(--cabinet-parchment)" opacity="0.6" />
          <circle cx="66" cy="82" r="0.8" fill="var(--cabinet-parchment)" opacity="0.6" />
        </svg>
      );

    case "issue":
      // Chandelle éteinte fumante sur son chandelier doré.
      // Métaphore : l'événement s'est produit, la lumière s'est éteinte,
      // il ne reste que la fumée qui monte encore.
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Ombre au sol */}
          <ellipse cx="50" cy="92" rx="22" ry="2.5" fill="#000" opacity="0.4" />

          {/* Base circulaire du chandelier (dorée) */}
          <ellipse
            cx="50"
            cy="88"
            rx="18"
            ry="4"
            fill="var(--cabinet-or-sceau)"
            stroke="var(--cabinet-parchment)"
            strokeWidth="1.2"
          />
          <ellipse
            cx="50"
            cy="87"
            rx="12"
            ry="2"
            fill="var(--cabinet-or-sceau)"
            stroke="#2A2622"
            strokeWidth="0.6"
            opacity="0.7"
          />

          {/* Colonne du chandelier */}
          <path
            d="M46 86 L46 74 L44 72 L44 68 L46 66 L54 66 L56 68 L56 72 L54 74 L54 86 Z"
            fill="var(--cabinet-or-sceau)"
            stroke="var(--cabinet-parchment)"
            strokeWidth="1"
          />

          {/* Coupelle (rebord évasé pour recueillir la cire) */}
          <path
            d="M38 66 Q50 62 62 66 L58 68 Q50 65 42 68 Z"
            fill="var(--cabinet-or-sceau)"
            stroke="var(--cabinet-parchment)"
            strokeWidth="1"
          />

          {/* Bougie (raccourcie, elle a longuement brûlé) */}
          <rect
            x="45"
            y="42"
            width="10"
            height="24"
            fill="var(--cabinet-parchment)"
            stroke="#7A6A4E"
            strokeWidth="1"
          />

          {/* Coulée de cire figée sur le côté (elle a brûlé longtemps) */}
          <path
            d="M45 50 Q42 58 43 66 L45 66 Q45 58 45 50 Z"
            fill="var(--cabinet-parchment)"
            stroke="#7A6A4E"
            strokeWidth="0.7"
            fillOpacity="0.95"
          />
          <path
            d="M55 54 Q57 62 56 66 L55 66 Q55 60 55 54 Z"
            fill="var(--cabinet-parchment)"
            stroke="#7A6A4E"
            strokeWidth="0.6"
            fillOpacity="0.9"
          />

          {/* Petit résidu de cire fondue à la surface */}
          <path
            d="M45 42 Q50 40 55 42 L55 44 Q50 42 45 44 Z"
            fill="var(--cabinet-parchment)"
            stroke="#7A6A4E"
            strokeWidth="0.6"
          />

          {/* Mèche éteinte (noircie, courbée) */}
          <path
            d="M50 42 L50 36 Q51 33 49 30"
            stroke="#2A2622"
            strokeWidth="2"
            fill="none"
          />
          <ellipse cx="49" cy="30" rx="1.6" ry="2" fill="#2A2622" />

          {/* VOLUTES DE FUMÉE qui montent (signal fort : la bougie vient de s'éteindre) */}
          <path
            d="M49 28 Q46 22 50 17 Q54 12 48 6"
            stroke="var(--cabinet-parchment)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M49 28 Q52 24 49 20"
            stroke="var(--cabinet-parchment)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Petites particules de fumée qui s'échappent */}
          <circle cx="48" cy="4" r="1.1" fill="var(--cabinet-parchment)" opacity="0.55" />
          <circle cx="52" cy="10" r="0.9" fill="var(--cabinet-parchment)" opacity="0.5" />
          <circle cx="47" cy="14" r="0.7" fill="var(--cabinet-parchment)" opacity="0.45" />
        </svg>
      );
  }
}

function TargetSeal({ verdict }: { verdict: TriageVerdict }) {
  switch (verdict) {
    case "enjeu":
      // Bouclier héraldique
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3l7 2v6c0 4 -3 8 -7 10c-4 -2 -7 -6 -7 -10v-6z" />
        </svg>
      );
    case "objectif":
      // Cible bull's eye
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "risque":
      // Éclair
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2l-8 12h6l-2 8l8 -12h-6z" />
        </svg>
      );
    case "issue":
      // Croix héraldique
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 3h4v7h7v4h-7v7h-4v-7h-7v-4h7z" />
        </svg>
      );
  }
}

// ─────────────────────────────────────────────────────────────────────
// Panneau Théorie escamotable (UX-UI §4)
// ─────────────────────────────────────────────────────────────────────

function TheoryPanel(props: { onClose: () => void }) {
  return (
    <section
      id="theory-panel"
      className="theory"
      aria-label="Référence mentale pour distinguer enjeu, objectif, risque, issue"
    >
      <header className="theory__header">
        <h2 className="theory__title">Quatre questions pour trier</h2>
        <button
          type="button"
          className="theory__close"
          onClick={props.onClose}
          aria-label="Fermer la théorie"
        >
          ×
        </button>
      </header>

      <p className="theory__contrast">
        <strong>L'enjeu est une valeur à préserver</strong>, le{" "}
        <strong>risque</strong> est ce qui pourrait l'affecter,{" "}
        l'<strong>issue</strong> est ce qui l'a déjà affectée.
      </p>

      <ul className="theory__cards">
        {TRIPTYQUE_THEORY.map((def) => (
          <li
            key={def.verdict}
            className={`theory__card theory__card--${def.verdict}`}
          >
            <p className="theory__card-label">{def.label}</p>
            <p className="theory__card-question">{def.quickCard.question}</p>
            <p className="theory__card-essence">{def.quickCard.essence}</p>
            <p className="theory__card-time">{def.quickCard.temporalCue}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Repo singleton (V1 — sera remplacé par une méthode propre sur l'engine)
// ─────────────────────────────────────────────────────────────────────
import { createJsonContentRepository } from "@adapters/content-loader/JsonContentRepository";

let _repoSingleton: ReturnType<typeof createJsonContentRepository> | null = null;
function getRepo() {
  if (!_repoSingleton) _repoSingleton = createJsonContentRepository();
  return _repoSingleton;
}

function getItemUntyped(id: ItemId): TriageItem | null {
  return getRepo().findById<TriageItem>(id);
}
