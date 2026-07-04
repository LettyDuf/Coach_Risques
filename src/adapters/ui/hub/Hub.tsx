/**
 * Hub — Carte de maîtrise hexagonale (UX-UI §2).
 *
 * 6 hexagones disposés en grille 2×3. Chaque hexagone porte le nom
 * de la zone, son intention, et un anneau de progression visualisant
 * l'état de maîtrise.
 *
 * V1 du Lot 1a : seule la zone TRIPTYQUE est active (mécanique Le Tri).
 * Les 5 autres affichent « À découvrir » et sont désactivées.
 */

import { ZONES, type ZoneId } from "@domain/index";
import "./Hub.css";

type ZoneSpec = {
  id: ZoneId;
  name: string;
  intent: string;
  available: boolean;
  /** Couleur sémantique de la zone (pour le filet interne coloré, V4). */
  color: string;
};

const ZONE_SPECS: ReadonlyArray<ZoneSpec> = [
  {
    id: ZONES.TRIPTYQUE,
    name: "Triptyque",
    intent: "Enjeu, objectif, risque, issue.",
    available: true,
    color: "var(--risk-ink-violet)",
  },
  {
    id: ZONES.ANATOMIE,
    name: "Anatomie",
    intent: "Cause, événement, conséquence.",
    available: true,
    color: "var(--risk-alerte)",
  },
  {
    id: ZONES.EVALUATION,
    name: "Évaluation",
    intent: "Probabilité, impact, contexte.",
    available: false,
    color: "var(--risk-focus)",
  },
  {
    id: ZONES.TRAITEMENT,
    name: "Traitement",
    intent: "Éviter, réduire, transférer, accepter.",
    available: false,
    color: "var(--risk-prevention)",
  },
  {
    id: ZONES.INDICATEURS,
    name: "Indicateurs",
    intent: "Signaux faibles et constats.",
    available: false,
    color: "var(--risk-accepte)",
  },
  {
    id: ZONES.REDUCTION_VALEUR,
    name: "Réduction-valeur",
    intent: "Présenter une réduction de risque en revue.",
    available: false,
    color: "var(--risk-resolu)",
  },
];



export type HubProps = {
  onOpenMechanic: (zoneId: ZoneId) => void;
};

export default function Hub(props: HubProps) {


  return (
    <main className="hub">
      <header className="hub__header">
        <p className="hub__eyebrow">Coach Risques</p>
        <h1 className="hub__title">Carte de maîtrise</h1>
        <p className="hub__lede">
          Six zones d'apprentissage. Vous pouvez les aborder dans
          l'ordre que vous voulez. On vous recommande de commencer par{" "}
          <strong>Triptyque</strong>, c'est le « clic » qui débloque le
          reste.
        </p>
      </header>

      <ul className="hub__grid" aria-label="Carte de maîtrise, 6 zones">
        {ZONE_SPECS.map((spec) => {
          return (
            <HexCell
              key={spec.id as unknown as string}
              spec={spec}
              onClick={() => props.onOpenMechanic(spec.id)}
            />
          );
        })}
      </ul>
    </main>
  );
}

function HexCell(props: {
  spec: ZoneSpec;
  onClick: () => void;
}) {
  const { spec, onClick } = props;
  const disabled = !spec.available;

  // Hexagone SVG « pointy-top » dans une viewBox 100×115.
  const points = "50,2 96,29 96,86 50,113 4,86 4,29";

  return (
    <li className="hub__cell">
      <button
        type="button"
        className={`hex ${disabled ? "hex--disabled" : "hex--active"}`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        style={{ ["--zone-color" as string]: spec.color }}
        aria-label={
          disabled
            ? `${spec.name}, bientôt disponible`
            : `${spec.name}, ouvrir l'exercice`
        }
      >
        <svg
          className="hex__svg"
          viewBox="0 0 100 115"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polygon points={points} className="hex__bg" />
          <polygon
            points="50,10 88,32 88,83 50,105 12,83 12,32"
            className="hex__inner-frame"
          />
        </svg>
        <div className="hex__content">
          <h2 className="hex__name">{spec.name}</h2>
          <p className="hex__intent">{spec.intent}</p>
          <p className="hex__level">{disabled ? "Bientôt" : ""}</p>
        </div>
      </button>
    </li>
  );
}
