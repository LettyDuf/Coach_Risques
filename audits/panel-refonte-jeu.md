# Note DA — Refonte visuelle jeu d'atelier

*Sous-agent DA « jeu éditorial », 2026-07-01. Rupture assumée avec la note du Panel 2 initial (rejetée en tant que trop rigoureuse). Basé sur D23.*

## Manifeste

> **Coach Risques est un cabinet de cartes** — un jeu d'atelier tangible où l'apprenant manipule des artefacts sobres, colorés et signifiants pour cartographier l'incertitude d'un projet, dans l'esthétique d'un jeu de société moderne pour adultes lettrés (Wingspan × NYT Games × New Yorker).

Trois mots pour se souvenir : **cartes, cabinet, cartographie**.

## Palette clé (nouveaux tokens)

- `--rc-paper` `#F4EFE6` — fond principal, papier crème (remplace le blanc froid)
- `--rc-card` `#FFFCF6` — recto de carte, blanc chaud
- `--rc-ink` `#1B1D22` — encre principale
- `--rc-hairline` `#C9BFAA` — filets de carte

**Palette catégorie** (nouveauté — teinte chaque zone) :
- Triptyque `#3E5E8F` bleu ardoise (vue d'ensemble, horizon)
- Anatomie `#8E4B7A` prune (dissection, matière vivante)
- Évaluation `#B85A1E` terre cuite (balance)
- Traitement `#1F6B5C` lichen (action, remède)
- Indicateurs `#0891B2` cyan (signal, réservé du D12)
- Réduction-valeur `#5B21B6` violet d'encre (valeur livrée, sceau)

**Palette sémantique risque** — conservée mais saturée : alerte `#B02A2A`, prévention `#B85A1E`, accepté `#7A7466` grège, résolu `#1F6B5C` lichen.

## Iconographie (19 pictos schématiques + 6 emblèmes de hub)

Style commun : trait linéaire 1.75px, angles ronds 1.5px, grille 32×32, remplissage crème translucide.

- **Triptyque** : Enjeu = bougeoir à flamme / Objectif = cible archer / Risque = nuage à contour discontinu, goutte pointillée / Issue = nuage plein, goutte tombée au sol.
- **Anatomie** : Cause = engrenages imbriqués / Événement = éclair discontinu / Conséquence = onde à cercles concentriques.
- **Briques Cause** (famille racines) : cause / constat = loupe / événement = éclair / antécédent = engrenage retourné.
- **Briques Événement** (famille nuages) : conditionnel = nuage-goutte-pointillé / présent-avéré = nuage plein / passé-avéré = nuage-flèche-arrière / futur-certain = nuage-calendrier.
- **Briques Conséquence** (famille échelles) : mesurable = règle graduée / tautologie = ouroboros mini / affect = courbe émotionnelle / abstrait = nuage flou.

## Système de cartes

Format 3:4 (288×384 pleine taille), fond `--rc-card`, bordure double (2px hairline + 4px méplat), ombre `lg` au repos. Dos identique par mécanique (sigil calligraphié + trame ton-sur-ton), recto en trois zones (bandeau catégorie / corps texte / pied id+action). Retournement dos→recto 420ms `cubic-bezier(0.4, 0, 0.2, 1)`, sans son. Glissement main→plateau 260ms + overshoot léger.

## Hub refondu

Sous-plateau `--rc-paper-deep` avec grille hexagonale ton-sur-ton, hexagones teintés par zone (Non commencée 0% / Effleurée 12% / Travaillée 30% / Consolidée 55%), emblème central 56×56, libellé Source Serif 4 21px, anneau de progression comme **liseré hexagonal courant** (pas un arc de cercle). Micro-signalétique de 1 à 4 disques 6px sous les Travaillée/Consolidée. Onglet Procès du faux risque devient médaillon octogonal séparé.

## Narration légère

Trois équipes récurrentes : **Kraken** (SRE), **Colibri** (mobile e-commerce), **Bibliothèque** (RH interne). Pictogramme d'équipe dans un médaillon en haut à droite de chaque carte de corpus. Pas de personnage nommé, pas de dialogue, pas de scénario qui avance. Juste une présence humaine récurrente qui donne de la matière.

## Ordre de bataille recommandé (5 vagues)

1. **Vague 1** — Tokens couleur+typo (2-3j). Bascule d'un coup, sans nouveau code.
2. **Vague 2** — Iconographie (4-6j). 19 pictos + 6 emblèmes.
3. **Vague 3** — Refonte Le Tri (3-4j). La mécanique la plus mature.
4. **Vague 4** — Refonte Carte de maîtrise (4-5j). Hub après avoir vu tourner l'esthétique.
5. **Vague 5** — Cartes tangibles + animations (5-7j). Le luxe animé en dernier.

Contexte fictif Kraken/Colibri/Bibliothèque en Vague 6.

## Auto-critique

Risque n°1 : **préciosité éditoriale déguisée en jeu**. Si en revue Vague 3 quelqu'un dit « c'est beau mais je n'ai pas envie de cliquer », on a raté. Remède : accepter une couleur de plus, un motif plus marqué.

Risque n°2 : **charge de production des pictos**. Mitigation : 5-7 sur-mesure (emblèmes hub + 3 pictos Anatomie), le reste en Lucide teinté.

Risque n°3 : **cohérence avec Coach Objectifs**. Ma proposition assume l'esthétique distincte. À trancher.

## Recommandation tranchée

Signature : *un cabinet de cartes sur papier crème, où chaque catégorie porte son pictogramme dessiné et chaque manipulation a son tempo — jamais spectaculaire, toujours tangible.*

Trois décisions structurantes :
1. Papier crème `#F4EFE6` remplace le blanc froid.
2. Iconographie sur-mesure pour emblèmes + pictos Anatomie, Lucide teinté pour le reste.
3. Format carte 3:4 avec dos/recto et retournement 420ms.

Première refonte à attaquer : **Vague 1 (tokens) + Vague 3 (Le Tri)**. 6-7 jours ouvrés → démo testable qui a déjà changé de nature.
