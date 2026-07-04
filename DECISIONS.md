# Coach Risques — DECISIONS

Journal des décisions structurantes. Format : contexte / choix / alternative écartée — 3 lignes max.

## D1 — Nouveau projet séparé de Coach Objectifs
- **Contexte** : Risque et Objectif sont deux domaines métier distincts ; coupler les deux dans une même base alourdirait Coach Objectifs déjà conséquent.
- **Choix** : dossier `coach-risques/` à plat, propre archi hexagonale, propre domaine, propres tests.
- **Écarté** : module dans Coach Objectifs (couplage de domaines), ou lib UI partagée upfront (refactoring prématuré).

## D2 — Architecture hexagonale, identique à Coach Objectifs
- **Contexte** : règle non négociable du projet ; le domaine doit rester isolé pour rester validable sans UI.
- **Choix** : `src/domain/` en TS pur (cœur `RiskCoachEngine`, ports d'évaluation et de contenu), `src/ui/` adaptateur React, `src/content/` corpus externalisés.
- **Écarté** : architecture en couches classiques (couplage domaine/UI), ou monolithe React.

## D3 — Stack identique à Coach Objectifs
- **Contexte** : continuité de pratique, build single-file HTML déjà éprouvé, mêmes composants UI à terme réutilisables.
- **Choix** : TypeScript + React + Vite, build single-file HTML, pas de framework supplémentaire.
- **Écarté** : Next.js (overkill pour un outil pédagogique statique), Svelte/Vue (rupture sans bénéfice).

## D4 — Référentiel hybride ISO 31000 / PMBOK 7 / tradition francophone
- **Contexte** : ISO/PMBOK donnent les définitions opérationnelles que les apprenants croisent en entreprise ; la tradition francophone (AFITEP) ajoute le triptyque pédagogique Enjeu/Objectif/Risque sans équivalent international.
- **Choix** : ISO 31000 + PMBOK 7 comme socle (définitions, mécanique probabilité×impact, traitement, risk vs issue). Triptyque francophone comme grille d'entrée pédagogique. SAFe pour le module PI (ROAM, RR&OE, Enabler).
- **Écarté** : pur ISO (trop abstrait), pur francophone (déconnecté de la réalité entreprise internationale), pur SAFe (trop spécifique à un cadre).

## D5 — Pilier explicite : réduction de risque comme valeur livrée
- **Contexte** : Lætitia souhaite que les équipes puissent valoriser leur travail de réduction de risque en Sprint Review / PI System Demo. La doctrine SAFe, Cohn, Pichler, Reinertsen et Matts/Maassen converge sur cette position.
- **Choix** : module dédié dans la Théorie + garde-fou *artefact inspectable* enseigné systématiquement (alerte Scrum.org sur dérive *phase gate* PowerPoint). Formulation type à enseigner pour la revue.
- **Écarté** : « mention contextuelle » (enseigne une bonne pratique sans donner l'outil pour l'appliquer), silence (perd un différenciant pédagogique fort).

## D6 — Validation de DOMAINE par Lætitia avant tout code
- **Contexte** : règle structurante du projet — Lætitia décide du métier, Claude décide de la technique. Cette frontière ne souffre pas d'exception.
- **Choix** : DOMAINE.md v0.1 produit, validation explicite attendue (§1 à §9) avant toute écriture de moteur ou de corpus.
- **Écarté** : démarrer le moteur sur la base implicite du DOMAINE (risque de figer une règle métier non validée).

## D7 — Vocabulaire SAFe : francisation avec VO en titre
- **Contexte** : Lætitia veut comprendre et faire comprendre, mais ses apprenants croisent la VO en entreprise.
- **Choix** : traduction française dans le corps du texte ; titres au format « Traduction française (VO) » — ex. « Risque géré (Owned) », « Activateur (Enabler) », « Démo de PI (PI System Demo) », « Réduction de risque et création d'opportunité (RR&OE) ».
- **Écarté** : VO seule (jargon imposé), traduction seule (perte du repère professionnel).

## D9 — Découpage pédagogique V1 du tronc commun : 4 mécaniques portant 6 objectifs
- **Contexte** : Panel 1 (pédagogue + game designer) divergent — 7 activités vs 2 mécaniques abouties. Synthèse argumentée présentée à Lætitia (`audits/panel-1-synthese.md`), validée en bloc le 2026-06-28.
- **Choix** : 4 mécaniques de jeu (Le Tri, Le Détective, Le Pari, Le Brouillard se lève) portent les 6 objectifs de Bloom (O1 à O6). §5 indicateurs leading/lagging intégré au Brouillard se lève. Le Procès du faux risque = mode défi transverse optionnel. Carte de maîtrise par zone comme dispositif d'orientation. Posture apprenant : coach interne. Voir `DOMAINE.md §8` réécrit.
- **Écarté** : grille 7 activités linéaires (charge extrinsèque trop élevée, redondances) ; grille 2 mécaniques seules (rate O1, O4, O5) ; mécanique dédiée pour §5 indicateurs (bande passante de production limitée).

## D10 — Interdits ludiques non négociables V1
- **Contexte** : convergence pédagogue + game designer sur les pièges de la gamification superficielle pour public adulte expert. Deci & Ryan : la récompense extrinsèque tue la motivation intrinsèque ; sur public Lean-Agile c'est rédhibitoire.
- **Choix** : interdits — badges, points, score global, leaderboard, timers artificiels, streaks, narration héroïque englobante, avatar personnalisable. Validé Lætitia 2026-06-28.
- **Écarté** : « interdire mais sauf en mode défi » (l'exception ouvre la porte à la dérive) ; « activer si demande utilisateur » (la demande exprimée est mauvaise conseillère ici).

## D11 — Architecture UX hub-and-spoke, Carte de maîtrise hexagonale
- **Contexte** : Panel 2 (UX-UI + graphiste) convergent — la grille pédagogique D9 et les interdits D10 disqualifient le tunnel linéaire (Duolingo) ; le public adulte expert refuse le parcours imposé. La Carte de maîtrise doit signifier « cartographier un terrain incertain », pas « gravir un sommet » (différenciation conceptuelle assumée avec Coach Objectifs).
- **Choix** : modèle hub-and-spoke, Carte de maîtrise comme hub central (6 hexagones 2×3, métaphore inspection alvéolaire), 4 spokes = mécaniques, *Procès du faux risque* en onglet secondaire du hub. 3 niveaux d'écran max (Hub / Mécanique / Panneau contextuel). 4 états qualitatifs de maîtrise (non commencée / effleurée / travaillée / consolidée), consolidation par variation. Voir `UX-UI.md §1, §2`.
- **Écarté** : parcours linéaire (insulte au pro), constellation simple sans métaphore (rate l'opportunité de signature), grille rectangulaire (variante de repli seulement). État binaire de tuile (mensonge pédagogique).

## D12 — Système visuel : blanc froid + Inter / Source Serif 4 + palette risque triple-encodée
- **Contexte** : différencier Coach Risques de Coach Objectifs sans rupture, servir le ton « calme attentif » de la matière (vigilance lucide, ni anxiogène ni festif), accessibilité daltoniens non négociable sur la matrice 5×5.
- **Choix** : dominante neutre blanc froid `#F7F8FA` ; duo typographique Inter (UI, corps) + Source Serif 4 (titres, citations doctrinales, formulations canoniques) avec test borné sur 3-4 écrans pilotes et fallback Inter Semibold si effet trop précieux ; palette sémantique du risque (alerte `#B91C1C`, prévention `#C2410C`, accepté `#6B7280` neutre, résolu `#0F766E` teal) ; palette criticité matrice triple-encodée (teinte + trame + bordure) ; cyan `#0891B2` exclusivement réservé au moment *Brouillard se lève* ; accent commun avec Coach Objectifs : bleu marine `#1E40AF`. Voir `UX-UI.md §6`.
- **Écarté** : dégradé vert→rouge sur matrice criticité (exclut daltoniens, caricatural), vert sapin sur résolu (lu comme validation Duolingo), couleur saturée à 100 % (immature), Source Serif 4 sans test (risque précieux).

## D13 — Découpage Lot 1 en deux phases (1a puis 1b)
- **Contexte** : Panel 1 et Panel 2 convergent — la sophistication des 4 mécaniques (en particulier Brouillard se lève et Pari) risque de produire une V1 incohérente si on étale. Vaut mieux deux mécaniques polies que quatre médiocres.
- **Choix** : Lot 1a = Hub + Carte de maîtrise + Le Tri + Le Détective + Théorie §1-§2 + tokens + accessibilité (livrable en autonomie, utilisable seul). Lot 1b = Le Pari + Le Brouillard se lève + Procès du faux risque + Théorie §3-§6 + polissage animations. Voir `UX-UI.md §8`.
- **Écarté** : livrer les 4 mécaniques d'un bloc (risque de qualité étalée), livrer Le Brouillard se lève en premier (manque les prérequis pédagogiques O1-O5).

## D14 — Architecture hexagonale stricte + stack TS/React/Vite parité Coach Objectifs
- **Contexte** : Panel 3 — la promesse UX (feedback qualitatif sophistiqué) doit être tractable, le domaine doit rester testable sans navigateur, l'évolution sur 4 lots × N corpus exige la séparation moteur/contenu.
- **Choix** : arborescence stricte `src/domain/` (TS pur, sans React ni navigateur) + `src/content/` (corpus externalisé Zod-validé) + `src/adapters/` (UI React + persistance + content-loader) + `src/app/` (composition root). Frontière physique vérifiée par `eslint-plugin-boundaries` ou `dependency-cruiser`. Stack identique Coach Objectifs : React 18 + Vite + vite-plugin-singlefile, TypeScript 5+. Bibliothèque icônes Lucide (MIT). Polices Inter + Source Serif 4 inlinées.
- **Écarté** : monolithe React (couplage domaine/UI), Next.js (overkill), couche application séparée des services de domaine (over-engineering).

## D15 — Stratégie d'évaluation à trois étages (corpus + détecteurs + alternatives)
- **Contexte** : le défi technique central est de produire un feedback qualitatif explicable et testable sans NLP fragile ni hard-coding cas-par-cas. La sophistication doit vivre dans le corpus, pas dans le moteur.
- **Choix** : étage 1 (~70 %) règles déclaratives portées par chaque item du corpus, le moteur exécute, ne juge pas — toute formulation de feedback écrite par Lætitia ; étage 2 (~20 %) bibliothèque de 5-7 détecteurs transverses (tautologie, confusion issue/risque, conséquence seule, etc.) en fonctions pures testables ; étage 3 (~10 %) comparaison structurée à des alternatives défendables, sélectionnées dans un set fini écrit par Lætitia, jamais générées. **DSL des règles plafonné à 5-7 `kind`** — au-delà, on a réinventé un moteur d'expert sans le savoir.
- **Écarté** : LLM embarqué (non explicable, coût), tokenizer/NLP maison (fragile), score chiffré générique (anti-pédagogique, interdit D10), template paraphrase (générique = inutile).

## D16 — Garde-fous craftsmanship non négociables : canari d'isolement + intégrité corpus
- **Contexte** : sans tests automatiques, l'isolement hexagonal se contamine silencieusement (un `import` React dans le domaine, et tout est cassé) ; et un corpus mal équilibré rend la règle « consolidée par variation » inatteignable sans qu'on le voie.
- **Choix** : (1) **canari Node d'isolement** — test pur Node qui instancie `RiskCoachEngine` avec adaptateurs fake et joue un scénario complet ; si un `import` React fuit dans le domaine, le test casse à l'install. Vert à chaque commit, premier test écrit. (2) **tests d'intégrité du corpus bloquants en CI** — doublons d'`ItemId` interdits, tout `expected` non vide, tout `SemanticTag` référencé existe, chaque zone DOMAINE a N items avec signatures variées, chaque `ComponentFeedback` a un message français non vide sans `TODO` ni `XXX`.
- **Écarté** : tests manuels (dérive garantie), code review seule (la régression silencieuse passe).

## D17 — État UI : Context + useReducer + Zustand pour l'état transverse
- **Contexte** : le hub-and-spoke (D11) + 4 états de maîtrise + reprise où on s'est arrêté demandent une gestion d'état non triviale, mais le domaine doit rester pur (D2, D14).
- **Choix** : React Context (`EngineProvider`) pour exposer le moteur, `useReducer` local par mécanique pour l'état d'écran, Zustand minuscule pour la seule projection transverse (`MasteryState` affichée + pointeur « reprise »). Le store Zustand est une **projection** du domaine, jamais une copie — source de vérité = `MasteryStore` (port).
- **Écarté** : Redux (cérémonie surdimensionnée), Jotai (granularité atomique tend à disperser), Context API seul (re-renders incontrôlés sur hub à 6 zones).

## D18 — Persistance LocalStorage avec schéma versionné
- **Contexte** : la progression et la reprise impliquent persistance locale. L'apprenant peut revenir 3 mois après — engagement de compatibilité ascendante.
- **Choix** : LocalStorage V1 (IndexedDB plus tard si historiques de productions). Tout payload sérialisé porte `schemaVersion: number`. `LocalStorageMasteryStore` détecte la version, applique migrations en chaîne (`v1 → v2 → v3`). Migration manquante = chargement neutre + log, **jamais crash**. `MasteryStore` est un port — interface de 4 méthodes ; tests Node = `InMemoryMasteryStore`. Pas de `window` dans le domaine.
- **Écarté** : IndexedDB en V1 (complexité inutile), payload non versionné (casse à la première évolution), domaine qui touche `window` (contamination hexagonale).

## D20 — Nouvelle mécanique « Les Briques » : palier avant Le Détective
- **Contexte** : retour terrain sur Le Détective, trop dur d'emblée pour un apprenant novice. La grille pédagogique D9 prévoyait qu'une zone puisse être nourrie par plusieurs mécaniques (UX-UI §2). On ajoute donc une mécanique de reconnaissance/discrimination isolée par composant, en amont de la production libre.
- **Choix** : mécanique « Les Briques » dans la zone Anatomie, trois mini-exercices (Le facteur / Au conditionnel / Et alors ?). **Grammaire d'interaction unifiée quaternaire** : 4 candidats par item, un seul clic, raccourcis clavier 1/2/3/4. Chaque candidat porte un mini-badge nommant sa nature (Cause / Constat / Événement / Antécédent pour Le facteur ; Présent avéré / Passé avéré / Conditionnel / Futur certain pour Au conditionnel ; Tautologie / Mesurable / Affect / Abstrait pour Et alors ?). La grammaire commune allège la charge d'apprentissage d'interaction, la variation porte sur la nature de la discrimination.
- **Écarté** : trois mécaniques d'interaction distinctes proposées par le panel (grille + correction verbe + tri à 3 casiers) — plus riches individuellement mais coût d'apprentissage d'interaction sur un warm-up de 2-3 min. La correction du verbe via menu écartée spécifiquement pour son air d'exercice de conjugaison scolaire (validation Lætitia).

## D21 — Séquence des Briques : Cause → Conséquence → Événement
- **Contexte** : le pédagogue justifie une séquence contre-intuitive linguistiquement. La cause est le composant le plus accessible sémantiquement (jugement frontal, sans conjugaison). La conséquence mobilise un registre analytique familier aux Lean-Agile (mesurabilité). L'événement, verrou technique du conditionnel épistémique, est le plus coûteux cognitivement — il gagne à être abordé quand les deux ancrages voisins sont installés (Salomon & Perkins, *low-road to high-road transfer*).
- **Choix** : les 3 briques s'enchaînent dans l'ordre Cause → Conséquence → Événement. Fil de trois traits horizontaux pour matérialiser la position sans compteur numérique.
- **Écarté** : ordre linguistique naturel (Cause → Événement → Conséquence) — plus intuitif à décrire mais pédagogiquement moins efficace pour l'ancrage.

## D22 — Règle de consolidation Anatomie : Les Briques valent au maximum *travaillée*
- **Contexte** : Les Briques travaillent la reconnaissance isolée (Bloom 2). Le Détective travaille la production composée (Bloom 3-4). Ce sont deux niveaux distincts de compétence. Laisser Les Briques suffire pour *acquise* mentirait sur la maîtrise réelle.
- **Choix** : la complétion des 3 briques déclenche *travaillée* sur Anatomie. Le passage à *consolidée* exige de jouer Le Détective sur signatures variées (règle générale D11). Aucun verrouillage d'accès : l'apprenant peut aller directement au Détective s'il veut. La proposition « on vous recommande de commencer par Les Briques » est un conseil, pas un prérequis.
- **Écarté** : verrouillage du Détective tant que Les Briques ne sont pas complétées (contre self-direction Knowles et D11). Consolidation possible via Les Briques seules (mensonge pédagogique).

## D23 — Bascule vers doctrine visuelle-ludique enrichie (jeu d'atelier)
- **Contexte** : le brief initial du projet exigeait un outil « ludique, simple, intuitif, agréable, pédagogique ». Le panel game designer initial (2026-06-28) a produit une doctrine de sobriété extrême qui a évacué la dimension jeu au profit d'une rigueur éditoriale. Retour terrain de Lætitia après plusieurs itérations : l'outil est correct pédagogiquement mais manque de plaisir. Le brief initial n'a pas été honoré.
- **Choix** : Coach Risques bascule d'une doctrine « rigueur éditoriale apaisée » vers une doctrine « expérience de jeu d'atelier ». Quatre changements structurants :
  1. **Narration légère assumée** — posture coach interne (déjà validée D9) matérialisée par un contexte projet fictif cohérent.
  2. **Iconographie riche et différenciée** — chaque catégorie porte une illustration schématique, pas seulement une couleur. Références : Brilliant, NYT Games, cartes éducatives adultes.
  3. **Cartes tangibles + animations expressives** — items deviennent des cartes avec dos/recto, se retournent, glissent, se posent. Animations sobres mais présentes (300-400ms). Métaphore board game assumée.
  4. **Session rythmée type tournoi** — les Briques deviennent un enchaînement de mini-jeux plutôt qu'une liste d'exercices. Chaque mécanique a son plateau propre.
- **Écarté** : maintien de la doctrine sobre du Panel 2 initial (contredit le brief), copie de BoardGameArena (trop clinquant, public gamer, perd la confiance des équipes SAFe/Lean), narration héroïque type Duolingo (interdit maintenu). D10 (badges, points, streaks, leaderboards, timers, avatar) reste intégralement en vigueur : le jeu vient des mécaniques et de la matière visuelle, pas des artifices de récompense.
- **Conséquence** : refonte visuelle progressive prévue. Cohérence avec Coach Objectifs à trancher ultérieurement (soit alignement futur, soit deux esthétiques assumées dans la famille d'outils).

## D19 — Publication GitHub sous CC BY-SA 4.0, servi par GitHub Pages depuis /docs/
- **Contexte** : Lætitia veut publier Coach Risques sur GitHub avec un lien cliquable pour lancer l'outil, sur le modèle de Coach Objectifs. Le projet est un outil pédagogique où contenu et code coexistent. Il faut une licence unique qui protège l'ouverture du contenu comme du code.
- **Choix** : licence **Creative Commons BY-SA 4.0** sur l'ensemble du projet (code + contenu pédagogique) — attribution + partage aux mêmes conditions ; empêche qu'un dérivé soit refermé. **GitHub Pages** activé depuis `main /docs/`. Le build produit `docs/index.html` (single-file autoporté). URL publique : `https://lettyduf.github.io/Coach_Risques/`. `index.html` de dev à la racine conservé pour ne pas casser `npm run dev`.
- **Écarté** : MIT sur le code + CC-BY-SA sur le contenu (complexité inutile pour un mono-repo pédagogique), CC-BY (permet la fermeture des dérivés), CC-BY-NC-SA (bloque la formation professionnelle rémunérée, contraire à la vocation), branche gh-pages séparée (coût de maintenance supérieur à /docs/).

## D8 — Doctrine de conception : panel d'experts à chaque étape, pas de parité-réflexe
- **Contexte** : Lætitia recadre le 2026-06-28 — l'objectif n'est pas de copier Coach Objectifs mais de créer un outil ludique, simple, intuitif, agréable, pédagogique. Le nombre d'exercices et la nature des interactions doivent sortir d'une analyse pédagogique propre au domaine du risque, pas d'un calque sur l'outil voisin.
- **Choix** : à chaque étape de création, mobiliser un panel d'experts en sous-agents — (1) conception pédagogique : pédagogue + créateur de jeux ; (2) conception UX/UI : UX-UI + graphiste ; (3) conception technique : architecte logiciel (hexagonale, craftsmanship). Lætitia valide les sorties expertes avant intégration. Je tranche la technique, elle tranche le métier et la pédagogie.
- **Écarté** : réplication mécanique de Coach Objectifs (Drill/Warmup/Composer/Analyser × N exercices) sans validation pédagogique propre. La réutilisation de composants UI techniques reste possible *si* elle sert la pédagogie cible, pas si elle la contraint.

## D24 — Charte cabinet appliquée au Tri en premier ; Hub différé
- **Contexte** : la doctrine visuelle-ludique (D23) demande une refonte cabinet façon jeu de plateau. Le panel jeu-plateau (`audits/panel-jeu-plateau-synthese.md`) a produit un mockup validé pour Le Tri (v10, sauge, IM Fell + Lora, cadre or, cibles biseautées). Aucun mockup n'a été validé pour le Hub.
- **Choix** : appliquer la charte cabinet exclusivement à `TriBoard` dans ce lot. Le Hub garde sa charte studio actuelle jusqu'à ce qu'un mockup Hub cabinet soit produit par le panel et validé par Lætitia. Introduction d'un jeu de tokens `--cabinet-*` complémentaire aux `--risk-*` : la palette sémantique du risque (rouge/orange/gris/teal) reste utilisée pour les états post-validation ; l'écrin change (fond page sauge léger, plateaux gradient sauge, papier vergé, or antique).
- **Écarté** : refondre le Hub en cabinet sans mockup validé (violerait la doctrine [[doctrine-outils-pedagogiques-panel-experts]]) ; réécrire tous les tokens sémantiques en cabinet (perte du triple-encodage du risque, régression accessibilité, dette pour DetectiveBoard/BricksBoard qui reposent dessus).
- **Conséquence** : chaque nouvelle mécanique portée en cabinet devra passer par un mockup dédié. Une session ultérieure produira le mockup Hub cabinet (question ouverte : le Hub reste-t-il une carte hexagonale sobre servant de « salon » avant les plateaux, ou devient-il lui-même un plateau ?).
