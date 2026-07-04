# Synthèse Panel jeu de plateau (2026-07-03)

Deux notes croisées : **concepteur de jeux de plateau** (mécanique, pacing, satisfaction du geste) et **DA spécialisé jeux de société** (matérialité de carte physique, palette Wingspan/Terra Mystica).

## Signature commune retenue

*« Un plateau de bois clair sur fond sauge, où des cartes en papier crème grainé, encadrées à la Wingspan, se posent dans des plaquettes héraldiques illustrées d'objets tangibles (coffret, arc, tarot, rocher), scellées par des tampons Terra Mystica avec une micro-rotation à la main. »*

## Palette consolidée (fond sauge B validé)

- Fond global : **sauge** `#B8C7B0`
- Plateau bois clair (zone centrale de jeu) : `#C9B487`
- Carte-énoncé recto : crème parchemin `#F4EDD8`
- Encadré intérieur : ivoire vieilli `#E8DFC4`
- Dos de carte : vert-bouteille sourd `#3B4B3E` + motif losanges or patiné `#B08A3E`
- Encre : brun-noir de plume `#2A2622`
- Filet : brun sépia `#7A6A4E`, ornement or `#B08A3E`

## Palette catégorielle

| Catégorie | Fond | Encre / sceau | Illustration objet |
|---|---|---|---|
| Enjeu | Bleu ardoise `#3E5C7A` | Or `#C9A24A` | Coffret entrouvert avec rai de lumière |
| Objectif | Terre cuite `#A0522D` | Crème `#F4EDD8` | Arc bandé, flèche partie, corde vibrante |
| Risque | Prune sombre `#5C3B5C` | Argent `#A8ADB4` | Carte de tarot à moitié retournée |
| Issue | Ocre gris `#8A6E4A` | Rouille `#7A3B1E` | Rocher tombé sur chemin, herbes couchées |

## Typographie

Deux familles seulement, Google Fonts :
- **IM Fell DW Pica** — titres de mécanique
- **IM Fell English SC** — noms de catégorie (petites capitales dessinées)
- **Lora** — corps de carte + hints italiques

## Anatomie carte-énoncé

- Ratio 63×88 (252×352 px de base), coins arrondis 6px
- Double filet : extérieur sépia 1.5px + intérieur or 0.75px, retrait 4px
- Rosace végétale 14×14 aux 4 coins
- Bandeau supérieur 34px : nom équipe IM Fell 11pt à gauche + picto oiseau/kraken/livre 20×20 à droite
- Zone centrale : vignette éditoriale en filigrane (opacité 20%) qui évoque le domaine + texte Lora 18pt centré
- Bas de carte : palmette héraldique or 22×8 + filets qui s'écartent
- Ombre chaude `0 6px 14px rgba(42,38,34,0.22)`
- Grain SVG overlay 8%
- Relief : bande claire 1px `#FFFFFF/40%` bord haut, bande sombre 1px `#2A2622/20%` bord bas

## Anatomie cible catégorielle

- Plaquette héraldique 3:4 (200×267 px)
- Coins coupés en biseau (héraldique, pas arrondis)
- Cadre à double filet
- Illustration principale au tiers supérieur (100×100 objet tangible)
- Sceau rond 32px en bas gauche, contour or 1.5px, pictogramme central simple (clé/flèche/spirale/empreinte)
- Nom en IM Fell English SC 22pt, petites capitales
- Sous-titre Lora italique 12pt sous le titre

## Mécanique de jeu

**Arrivée** : la carte remonte de la pile de tirage à gauche (translation Y +24px + opacité 0→1, 280ms `cubic-bezier(0.2,0.8,0.2,1)`), s'arrête au centre du plateau, légère rotation -2°→0°.

**Sélection** : trois modes de saisie coexistent — drag souris, clic sur cible, ou raccourci clavier `1/2/3/4`.

**Pose** : glissement 320ms en courbe de Bézier vers la cible, léger overshoot 4px, rotation aléatoire finale entre `-3°` et `+3°` (seedée sur l'ItemId pour reproductibilité), scale 1→0.72 pour signifier que la carte prend sa place dans le tas.

**Empilement** : les cartes déjà classées forment un tas éventaillé dans chaque zone-cible, décalage 6px en X et Y à chaque nouvelle carte.

**Feedback** : à deux temps.
1. Kinesthésique : la carte est *dans* la cible, satisfaction immédiate.
2. Chromatique déférée : après 400ms, bordure fine vert forestier `#166534` si juste, ocre `#B45309` si à revoir. Pas de rouge alerte, pas de vert Duolingo. Couleurs de vieux jeux allemands.

**Tampon** : au moment de la pose, le sceau de la catégorie se dédouble — l'original reste sur la plaquette, un exemplaire vient se poser en tampon sur le coin bas-droit de la carte engagée, avec micro-rotation aléatoire `-4°` à `+4°` et overshoot (`1.0 → 1.05 → 1.0` en 280ms `cubic-bezier(0.34,1.56,0.64,1)`). C'est le seul overshoot autorisé.

**Pas de son. Jamais.**

## Pacing

- Set de **7 cartes** fabriquées (pas généré au hasard) avec au moins **une carte-piège** ambiguë par set
- Entre deux items : 800ms de repos, la pile de gauche fait un petit mouvement de préparation
- Fin de set : la 7e carte se pose, 3 secondes de silence, puis bandeau bas discret « Nouveau set / Revoir mes classements / Passer à autre chose »
- Pas de « bravo, niveau suivant »
- Bouton animateur « Fin de set anticipée » toujours accessible en coin

## Cinq gestes signature

1. **Prendre** — la carte se soulève sous le curseur
2. **Peser** — retard 16ms de la carte sur le curseur
3. **Poser** — chute avec overshoot et rotation main
4. **Retourner** — flip 3D 240ms au survol d'une carte posée
5. **Feuilleter** — le tas s'étale en éventail au clic en fin de set

## Interdictions non négociables

- Compteur en temps réel type `3/7`
- Son de validation
- Barre de progression fluide (métaphore SaaS)
- Animation célébrant (confettis, glow doré)
- Compte à rebours

## Recommandation d'attaque

**Première mécanique à coder** : la carte-qui-remonte-de-la-pile-et-se-pose-avec-overshoot-et-rotation-main. Sans ce geste, tout le reste est du vernis sur du formulaire.

**Première pièce visuelle à produire** : la carte-énoncé Colibri complète (252×352 avec cadre, palmette, rosaces, vignette engrenage en filigrane, Lora 18pt, grain 8%, ombre chaude). Si cette carte tient debout seule sur le sauge, tout le reste s'aligne.
