/**
 * Tests DetectiveBoard — mécanique « Le Détective ».
 */

import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetectiveBoard from "@adapters/ui/mechanics/DetectiveBoard";
import { renderWithEngine } from "./test-utils";

beforeEach(() => {
  try {
    localStorage.clear();
  } catch {
    /* ignore */
  }
});

describe("DetectiveBoard — Le Détective", () => {
  it("affiche le titre, le scénario et les trois cases (1 donnée + 2 à produire)", () => {
    renderWithEngine(<DetectiveBoard onExit={() => {}} />);

    expect(
      screen.getByRole("heading", { name: /reconstituer une chaîne risque/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/scénario/i)).toBeInTheDocument();

    // Exactement deux textareas (les 2 composants à produire).
    const editables = screen.getAllByRole("textbox");
    expect(editables).toHaveLength(2);

    // Exactement un tag "Donné".
    expect(screen.getByText("Donné")).toBeInTheDocument();
    // Au moins deux tags "À produire".
    expect(screen.getAllByText("À produire").length).toBeGreaterThanOrEqual(2);
  });

  it("le bouton « Évaluer la chaîne » est désactivé tant que les 2 cases ne sont pas remplies", () => {
    renderWithEngine(<DetectiveBoard onExit={() => {}} />);
    const submitBtn = screen.getByRole("button", { name: /évaluer la chaîne/i });
    expect(submitBtn).toBeDisabled();
  });

  it("activation du bouton + évaluation affiche la comparaison et l'auto-évaluation", async () => {
    const user = userEvent.setup();
    renderWithEngine(<DetectiveBoard onExit={() => {}} />);

    const editables = screen.getAllByRole("textbox");
    // On remplit les deux cases avec une formulation conditionnelle correcte.
    await user.type(
      editables[0]!,
      "une cause hypothétique non triviale liée au scénario donné",
    );
    await user.type(
      editables[1]!,
      "il pourrait se produire un événement plausible avec conséquence mesurable",
    );

    const submitBtn = screen.getByRole("button", { name: /évaluer la chaîne/i });
    expect(submitBtn).not.toBeDisabled();
    await user.click(submitBtn);

    expect(await screen.findByText(/comparons/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /formulation défendable/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /j'ai compris/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /à revoir/i }),
    ).toBeInTheDocument();
  });

  it("le bouton retour appelle onExit", async () => {
    const user = userEvent.setup();
    let exited = false;
    renderWithEngine(<DetectiveBoard onExit={() => (exited = true)} />);

    const back = screen.getByRole("button", { name: /carte de maîtrise/i });
    await user.click(back);

    expect(exited).toBe(true);
  });
});
