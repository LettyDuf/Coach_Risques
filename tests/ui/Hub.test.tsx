/**
 * Tests Hub — Carte de maîtrise hexagonale.
 *
 * On vérifie ici la sémantique et l'interaction, pas le pixel.
 */

import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hub from "@adapters/ui/hub/Hub";
import { ZONES } from "@domain/index";
import { renderWithEngine } from "./test-utils";

describe("Hub — Carte de maîtrise", () => {
  it("rend le titre et les six zones", () => {
    renderWithEngine(<Hub onOpenMechanic={() => {}} />);

    expect(
      screen.getByRole("heading", { name: /carte de maîtrise/i }),
    ).toBeInTheDocument();

    // Les 6 zones du DOMAINE — repérées par leur heading dans la tuile.
    expect(
      screen.getByRole("heading", { name: "Triptyque", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Anatomie", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Évaluation", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Traitement", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Indicateurs", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Réduction-valeur", level: 2 }),
    ).toBeInTheDocument();
  });

  it("la zone Triptyque est cliquable et déclenche le callback avec son ZoneId", async () => {
    const user = userEvent.setup();
    const onOpenMechanic = vi.fn();

    renderWithEngine(<Hub onOpenMechanic={onOpenMechanic} />);

    const button = screen.getByRole("button", {
      name: /Triptyque, ouvrir l'exercice/i,
    });
    await user.click(button);

    expect(onOpenMechanic).toHaveBeenCalledTimes(1);
    expect(onOpenMechanic).toHaveBeenCalledWith(ZONES.TRIPTYQUE);
  });

  it("les zones non disponibles sont désactivées et marquées « bientôt »", () => {
    renderWithEngine(<Hub onOpenMechanic={() => {}} />);

    const evalBtn = screen.getByRole("button", {
      name: /Évaluation, bientôt disponible/i,
    });
    expect(evalBtn).toBeDisabled();
  });

  it("affiche « À découvrir » sur les zones non commencées", () => {
    renderWithEngine(<Hub onOpenMechanic={() => {}} />);
    // Au moins 4 zones non-commencées + bientôt (sur 6) car aucune passe enregistrée
    // et 2 zones actives (Triptyque, Anatomie) en V1a.
    const labels = screen.getAllByText(/À découvrir|Bientôt/i);
    expect(labels.length).toBeGreaterThanOrEqual(4);
  });
});
