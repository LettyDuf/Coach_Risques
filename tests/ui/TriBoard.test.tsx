/**
 * Tests TriBoard — mécanique « Le Tri ».
 *
 * On valide :
 *  - l'affichage de l'énoncé à classer
 *  - la disponibilité des 4 zones
 *  - le verdict visuel après réponse (Juste / À revoir)
 *  - le panneau Théorie escamotable
 */

import { describe, it, expect, beforeEach } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TriBoard from "@adapters/ui/mechanics/TriBoard";
import { renderWithEngine } from "./test-utils";

beforeEach(() => {
  // Reset du flag « intro vue » entre tests pour rendre le comportement
  // déterministe (sinon l'ordre des tests change l'ouverture du panneau).
  try {
    localStorage.clear();
  } catch {
    /* ignore */
  }
});

describe("TriBoard — Le Tri", () => {
  it("affiche le titre du plateau et l'énoncé à classer", () => {
    renderWithEngine(<TriBoard onExit={() => {}} />);
    // Titre en cartouche vertical gauche (h1 « Le Tri »).
    expect(
      screen.getByRole("heading", { name: /^Le Tri$/i, level: 1 }),
    ).toBeInTheDocument();
    // Un énoncé entre guillemets est affiché.
    expect(screen.getByLabelText(/énoncé à classer/i)).toBeInTheDocument();
  });

  it("propose les 4 zones avec raccourcis clavier", () => {
    renderWithEngine(<TriBoard onExit={() => {}} />);

    expect(
      screen.getByRole("button", { name: /Classer comme Enjeu \(touche 1\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Classer comme Objectif \(touche 2\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Classer comme Risque \(touche 3\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Classer comme Issue \(touche 4\)/i }),
    ).toBeInTheDocument();
  });

  it("affiche un verdict explicite après une réponse", async () => {
    const user = userEvent.setup();
    renderWithEngine(<TriBoard onExit={() => {}} />);

    // On clique sur Enjeu (réponse au hasard — peut être juste ou faux selon
    // l'item tiré). On vérifie que le verdict s'affiche dans tous les cas.
    const enjeuBtn = screen.getByRole("button", {
      name: /Classer comme Enjeu/i,
    });
    await user.click(enjeuBtn);

    // Le tag verdict apparaît : « JUSTE » ou « À REVOIR ».
    const verdict = await screen.findByText(/^(Juste|À revoir)$/);
    expect(verdict).toBeInTheDocument();
  });

  it("le panneau Théorie s'ouvre à la demande via le bouton", async () => {
    const user = userEvent.setup();
    renderWithEngine(<TriBoard onExit={() => {}} />);

    // Pas de théorie ouverte par défaut (mode atelier, D22 bis).
    expect(
      screen.queryByLabelText(/Référence mentale pour distinguer/i),
    ).not.toBeInTheDocument();

    // Un clic sur "Théorie" l'ouvre.
    await user.click(screen.getByRole("button", { name: /^Théorie$/i }));
    const theoryPanel = screen.getByLabelText(
      /Référence mentale pour distinguer/i,
    );
    expect(theoryPanel).toBeInTheDocument();

    // La phrase d'amorce contient « valeur à préserver » — elle apparaît
    // aussi dans la carte Enjeu (essence). On vérifie donc au moins 2 occurrences.
    const matches = within(theoryPanel).getAllByText(/valeur à préserver/i);
    expect(matches.length).toBeGreaterThanOrEqual(2);

    // Quatre cartes : Enjeu / Objectif / Risque / Issue (label de chaque carte).
    expect(
      within(theoryPanel).getByText("Enjeu", { selector: ".theory__card-label" }),
    ).toBeInTheDocument();
    expect(
      within(theoryPanel).getByText("Objectif", { selector: ".theory__card-label" }),
    ).toBeInTheDocument();
    expect(
      within(theoryPanel).getByText("Risque", { selector: ".theory__card-label" }),
    ).toBeInTheDocument();
    expect(
      within(theoryPanel).getByText("Issue", { selector: ".theory__card-label" }),
    ).toBeInTheDocument();
  });

  it("le bouton retour appelle onExit", async () => {
    const user = userEvent.setup();
    let exited = false;
    renderWithEngine(<TriBoard onExit={() => (exited = true)} />);

    const back = screen.getByRole("button", { name: /Carte de maîtrise/i });
    await user.click(back);

    expect(exited).toBe(true);
  });
});
