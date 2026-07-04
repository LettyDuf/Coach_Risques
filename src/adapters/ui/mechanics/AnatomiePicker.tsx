/**
 * Écran d'entrée de la zone Anatomie (D20, UX-UI §2 zone nourrie par
 * plusieurs mécaniques).
 *
 * Deux entrées : Les Briques (débutant, warm-up) et Le Détective
 * (production complète). Recommandation forte de commencer par Les Briques
 * mais aucun verrouillage (D22, self-direction Knowles).
 */

import "./AnatomiePicker.css";

export type AnatomiePickerProps = {
  onOpenBricks: () => void;
  onOpenDetective: () => void;
  onExit: () => void;
};

export default function AnatomiePicker(props: AnatomiePickerProps) {
  return (
    <main className="anatpick">
      <header className="anatpick__header">
        <button
          type="button"
          className="anatpick__back"
          onClick={props.onExit}
        >
          ← Carte de maîtrise
        </button>
      </header>

      <div className="anatpick__intro">
        <p className="anatpick__eyebrow">Zone Anatomie</p>
        <h1 className="anatpick__title">
          Deux entrées pour travailler l'anatomie d'un risque
        </h1>
        <p className="anatpick__lede">
          Un risque bien rédigé a trois composants : cause, événement,
          conséquence. Vous pouvez les travailler <strong>un par un</strong> avec
          Les Briques, ou les <strong>composer ensemble</strong> avec Le
          Détective. On vous recommande de commencer par Les Briques si c'est
          votre première fois, mais rien ne vous empêche d'aller directement à
          la composition.
        </p>
      </div>

      <div className="anatpick__cards">
        <button
          type="button"
          className="anatpick__card anatpick__card--recommended"
          onClick={props.onOpenBricks}
        >
          <span className="anatpick__card-tag">Recommandé pour commencer</span>
          <h2 className="anatpick__card-title">Les Briques</h2>
          <p className="anatpick__card-lede">
            Trois mini-exercices de reconnaissance, un par composant. Choisir la
            bonne cause parmi 4, l'événement bien formulé, la conséquence utile
            au pilotage.
          </p>
          <p className="anatpick__card-meta">
            2 à 3 minutes · reconnaissance · 4 candidats par item
          </p>
        </button>

        <button
          type="button"
          className="anatpick__card"
          onClick={props.onOpenDetective}
        >
          <h2 className="anatpick__card-title">Le Détective</h2>
          <p className="anatpick__card-lede">
            Reconstituer une chaîne complète à partir d'un scénario. Une case
            vous est donnée, vous produisez les deux autres en texte libre,
            comparez avec une formulation défendable.
          </p>
          <p className="anatpick__card-meta">
            5 à 10 minutes · production · saisie libre
          </p>
        </button>
      </div>
    </main>
  );
}
