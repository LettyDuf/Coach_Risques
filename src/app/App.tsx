/**
 * Application racine — branche le Hub et la mécanique active.
 *
 * V1 : routing manuel ultra-simple (un seul state `view`). Pas de
 * react-router — surdimensionné pour 2 vues.
 */

import { useState } from "react";
import { ZONES, type ZoneId } from "@domain/index";
import Hub from "@adapters/ui/hub/Hub";
import TriBoard from "@adapters/ui/mechanics/TriBoard";
import DetectiveBoard from "@adapters/ui/mechanics/DetectiveBoard";
import BricksBoard from "@adapters/ui/mechanics/BricksBoard";
import AnatomiePicker from "@adapters/ui/mechanics/AnatomiePicker";
import "./App.css";

type View =
  | { kind: "hub" }
  | { kind: "tri" }
  | { kind: "anatomie-picker" }
  | { kind: "bricks" }
  | { kind: "detective" };

export default function App() {
  const [view, setView] = useState<View>({ kind: "hub" });

  function openMechanic(zone: ZoneId) {
    if (zone === ZONES.TRIPTYQUE) {
      setView({ kind: "tri" });
    } else if (zone === ZONES.ANATOMIE) {
      setView({ kind: "anatomie-picker" });
    }
    // Autres zones désactivées.
  }

  if (view.kind === "tri") {
    return <TriBoard onExit={() => setView({ kind: "hub" })} />;
  }
  if (view.kind === "anatomie-picker") {
    return (
      <AnatomiePicker
        onOpenBricks={() => setView({ kind: "bricks" })}
        onOpenDetective={() => setView({ kind: "detective" })}
        onExit={() => setView({ kind: "hub" })}
      />
    );
  }
  if (view.kind === "bricks") {
    return <BricksBoard onExit={() => setView({ kind: "anatomie-picker" })} />;
  }
  if (view.kind === "detective") {
    return <DetectiveBoard onExit={() => setView({ kind: "anatomie-picker" })} />;
  }

  return <Hub onOpenMechanic={openMechanic} />;
}
