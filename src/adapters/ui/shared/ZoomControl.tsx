/**
 * Contrôle de zoom réutilisable (Hub, TriBoard, …).
 *
 * Zoom continu de 60 % à 140 % par pas de 10 %. Préférence persistée
 * par écran via une clé de stockage passée en prop (`storageKey`).
 *
 * Charte cabinet (D24) : pastilles Small Caps IM Fell + or antique.
 */

import { useState } from "react";

const ZOOM_MIN = 0.6;
const ZOOM_MAX = 1.4;
const ZOOM_STEP = 0.1;
const ZOOM_DEFAULT = 1;

function clampZoom(z: number): number {
  const clamped = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z));
  return Math.round(clamped * 100) / 100;
}

function loadZoom(storageKey: string): number {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw !== null) {
      const n = Number(raw);
      if (Number.isFinite(n)) return clampZoom(n);
    }
  } catch {
    /* ignore */
  }
  return ZOOM_DEFAULT;
}

function persistZoom(storageKey: string, z: number): void {
  try {
    localStorage.setItem(storageKey, String(z));
  } catch {
    /* ignore */
  }
}

/**
 * Hook local pour gérer un état de zoom persistant par écran.
 * Renvoie la valeur courante et un setter clampé + persisté.
 */
export function useZoom(storageKey: string) {
  const [zoom, setZoom] = useState<number>(() => loadZoom(storageKey));
  function change(next: number): void {
    const z = clampZoom(next);
    setZoom(z);
    persistZoom(storageKey, z);
  }
  return { zoom, change };
}

export type ZoomControlProps = {
  zoom: number;
  onChange: (next: number) => void;
  className?: string;
};

export default function ZoomControl(props: ZoomControlProps) {
  const { zoom, onChange, className } = props;
  return (
    <div
      className={`zoom-ctrl${className ? " " + className : ""}`}
      role="group"
      aria-label="Ajuster la taille d'affichage"
    >
      <button
        type="button"
        className="zoom-ctrl__btn"
        onClick={() => onChange(zoom - ZOOM_STEP)}
        disabled={zoom <= ZOOM_MIN + 0.001}
        aria-label="Réduire l'affichage"
        title="Réduire"
      >
        A−
      </button>
      <button
        type="button"
        className="zoom-ctrl__value"
        onClick={() => onChange(ZOOM_DEFAULT)}
        aria-label={`Affichage à ${Math.round(zoom * 100)} %. Cliquer pour revenir à 100 %.`}
        title="Revenir à 100 %"
      >
        {Math.round(zoom * 100)} %
      </button>
      <button
        type="button"
        className="zoom-ctrl__btn"
        onClick={() => onChange(zoom + ZOOM_STEP)}
        disabled={zoom >= ZOOM_MAX - 0.001}
        aria-label="Agrandir l'affichage"
        title="Agrandir"
      >
        A+
      </button>
    </div>
  );
}
