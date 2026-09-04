# Objectif Visa — Style Reference
> horizon administratif clair et rassurant — bleu vif et frais posé sur du blanc, avec une pointe de corail pour l'action et d'or pour l'urgence

**Theme:** light

Le langage visuel d'Objectif Visa est un SaaS-service premium en light mode, ancré par un bleu de marque vif (#129ba6) et une action primaire corail chaleureuse. Des panneaux sombres en charbon (#16191c) alternent avec des sections blanches aérées, créant un rythme sombre→clair→sombre qui installe la confiance sans jamais paraître froid ou institutionnel. La typographie est exclusivement Inter, sur une large échelle (12–60px), avec un tracking légèrement resserré aux grandes tailles qui donne de l'autorité aux titres sans effet clinique. Les composants sont arrondis et généreux — 48px de rayon sur les cartes, 12px sur les boutons — pour une interface qui reste accessible malgré le sujet administratif. Le système à trois couleurs d'accent (bleu pour l'identité de marque, corail pour la conversion, or pour l'urgence promotionnelle) garde une empreinte chromatique minimale mais impactante, pendant qu'une échelle de neutres profonds gère 95% de l'interface.

## Tokens — Couleurs

| Nom | Valeur | Token | Rôle |
|------|-------|-------|------|
| Brand Blue | `#129ba6` | `--color-brand-blue` | Logo, accents, liens, icônes de réassurance — le fil chromatique qui relie logo, titres et texte d'accent |
| Brand Blue Dark | `#0f8189` | `--color-brand-blue-dark` | État hover/actif sur éléments bleus (liens, icônes, boutons outline) — jamais utilisé en aplat de base |
| Coral Pulse | `#fa3556` | `--color-coral-pulse` | Boutons d'action primaire, CTA à forte urgence (Prendre Rendez-Vous, Soumettre une Demande) |
| Promo Gold | `#ffc200` | `--color-promo-gold` | Bandeau promotionnel, offres à durée limitée — réservé exclusivement à l'urgence |
| Charcoal Ink | `#16191c` | `--color-charcoal-ink` | Texte principal, fonds hero sombres, footer, texte de bouton sur corail |
| Pure White | `#ffffff` | `--color-pure-white` | Fond de page, surfaces de carte, texte sur fonds sombres/corail |
| Fog White | `#f9f9f9` | `--color-fog-white` | Fond alternatif, cartes discrètes, différenciation douce entre sections |
| Tide Tint | `#e6f4f6` | `--color-tide-tint` | Wash bleu très clair dérivé du Brand Blue — fond des blocs de réassurance |
| Ash Gray | `#dadadd` | `--color-ash-gray` | Bordures claires, séparateurs |
| Mist Gray | `#bfbfc0` | `--color-mist-gray` | Bordures secondaires, états désactivés |
| Slate | `#5b6065` | `--color-slate` | Texte de corps atténué, copie secondaire |
| Graphite | `#393e41` | `--color-graphite` | Bordures de navigation, éléments tertiaires |
| Carbon | `#000000` | `--color-carbon` | Contours maximum-contraste, icônes SVG |
| Deep Abyss | `#1e2327` | `--color-deep-abyss` | Surface sombre alternative, légèrement plus bleue que Charcoal |

> **Changement clé :** l'ancien teal `#1ebfbf` (qui tirait vers le vert) est remplacé par `#129ba6`, un bleu plus vif et plus froid — mieux adapté à un service de visas où la confiance et le sérieux priment. Le total reste **3 couleurs d'accent** (Bleu / Corail / Or) ; toutes les autres teintes sont des neutres.

## Tokens — Typographie

### Inter — seule typeface du système
400 pour le corps de texte, 600 pour la navigation/sous-titres/emphase, 700 pour les titres d'affichage et les boutons.

| Rôle | Taille | Interligne | Tracking | Token |
|------|------|-------------|----------------|-------|
| caption | 12px | 1.5 | 0.17px | `--text-caption` |
| body-sm | 14px | 1.71 | 0.24px | `--text-body-sm` |
| body | 16px | 1.75 | — | `--text-body` |
| subheading | 18px | 1.67 | — | `--text-subheading` |
| heading-sm | 24px | 1.33 | — | `--text-heading-sm` |
| heading | 32px | 1.3 | — | `--text-heading` |
| heading-lg | 40px | 1.21 | — | `--text-heading-lg` |
| display | 60px | 1.07 | -1.5px | `--text-display` |

## Tokens — Espacement & Formes

**Unité de base :** 4px · **Densité :** confortable

| Nom | Valeur | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |
| 200 | 200px | `--spacing-200` |

### Rayons de bordure
| Élément | Valeur |
|---------|-------|
| cartes | 48px |
| liens | 8px |
| pilules | 96px |
| petit | 8px |
| boutons | 12px |

### Mise en page
- **Largeur max page :** 1200px
- **Espace entre sections :** 64px
- **Padding de carte :** 32px
- **Espace entre éléments :** 8px

## Composants

### Bandeau promo
Bande 40px pleine largeur, fond `#ffc200`, texte 14px Inter 400 centré, sans bordure ni rayon. Réservé aux offres limitées dans le temps, au-dessus de la navigation.

### Navigation principale
Fond blanc `#ffffff`, 64px de hauteur. Logo Objectif Visa à gauche (icône en Brand Blue), liens 16px Inter 600, CTA corail à droite.

### Hero Card (sombre)
Fond `#16191c`, rayon 64px, pleine largeur jusqu'à 1200px max. Colonne gauche : titre 60px Inter 700 blanc, texte d'accent bleu `#129ba6` à 24px, liste à coches blanche (16px), CTA corail. Colonne droite : photo. Padding interne généreux 48–64px. *(Remplace le formulaire long actuel : un CTA unique + réassurance suffisent en hero.)*

### Bouton plein corail
`#fa3556` fond, texte blanc, rayon 12px, padding 16px × 24px, 16px Inter 600. Seul bouton entièrement chromatique du système — une seule action primaire par vue.

### Bouton plein sombre
`#16191c` fond, texte blanc, rayon 12px, padding 16px × 24px. Utilisé quand le corail entrerait en concurrence avec un CTA primaire voisin.

### Lien texte avec flèche
16px Inter 600 `#16191c`, flèche de suite — "Découvrez-en plus" etc.

### Liste à coches
Icône coche bleue `#129ba6` (16px) + texte 16px Inter 400 blanc ou charcoal, espacement 8–12px, aligné à gauche.

### Feature Card (claire)
Fond `#ffffff` ou `#f9f9f9`, rayon 48px, padding 32px, sans ombre (bordure 1px `#dadadd` optionnelle). Titre 24–32px Inter 700 charcoal, texte 16px `#5b6065`.

### Feature Card (sombre)
Fond `#16191c` ou `#1e2327`, rayon 48px, padding 32px. Titre blanc 32px, texte `#bfbfc0`/`#dadadd`, accent bleu optionnel.

### Bloc réassurance (3 piliers)
Fond `--surface-tinted-wash` (`#e6f4f6`), 3 cartes côte à côte, icône bleue, titre 18px Inter 700, texte 14px `#5b6065`. Remplace les blocs Fiabilité/Disponibilité/Transparence actuels avec plus d'air.

### Bloc statistiques
Fond `#16191c` ou `#1e2327`, chiffres en 48px Inter 700 blanc/bleu, libellé 14px `#bfbfc0` en dessous. Pour "8+ années d'expérience" — à enrichir avec 2-3 chiffres additionnels (clients accompagnés, taux de dossiers acceptés).

### Footer
Fond `#16191c`, colonnes de liens blancs 16px sous titres 14px Inter 700, 32px de gap entre colonnes, 48px padding vertical. Logo répété en haut en blanc/bleu.

## Do's and Don'ts

### Do
- Utiliser Inter exclusivement.
- Appliquer la règle des 3 couleurs d'accent : bleu = identité de marque, corail = conversion, or = urgence promotionnelle uniquement.
- Rayon 12px pour les boutons standards, 48px pour les cartes — ces deux valeurs définissent la personnalité du système.
- Maintenir le rythme sombre→clair→sombre entre sections, à 64px d'écart.
- Titres d'affichage à 60px Inter 700, tracking -1.5px.
- Un seul bouton corail plein par vue ; le reste en sombre ou en outline.

### Don't
- Ne pas utiliser `#129ba6` en fond de bouton plein — le bleu sert à l'identité, aux icônes, au texte d'accent, pas aux surfaces de conversion.
- Ne pas appliquer d'ombres aux cartes — le contraste de fond et le rayon 48px suffisent.
- Ne pas sortir des rayons de l'échelle : 8, 12, 32, 48, 64, 96px.
- Ne pas mettre deux CTA corail dans la même vue.
- Ne pas utiliser l'or `#ffc200` hors des bandeaux promotionnels.
- Ne pas descendre sous 16px pour le corps de texte marketing (14px réservé aux captions/micro-copy).
- Ne pas remplir un hero avec un formulaire de 8 champs — un CTA clair + une réassurance visuelle valent mieux qu'un formulaire complet dès l'arrivée.

## Imagerie

Photographie chaleureuse et humaine : professionnels et clients dans des contextes de confiance (bureau, entretien, voyage). Éviter le vide administratif froid — privilégier des visages, des mains qui tiennent un passeport, des moments de départ. Les icônes sont plats, trait unique, bleu `#129ba6` sur fond clair ou blancs sur fond sombre. Ratio image/texte modéré (~35-40% de l'écran), concentré sur le hero et les cartes de service plutôt qu'en pleine largeur éditoriale.

## Mise en page

Conteneur centré max-width 1200px, 64px d'écart entre sections. Le hero est une carte sombre pleine largeur arrondie (64px), en deux colonnes texte-gauche/image-droite, **sans formulaire complet** — juste un CTA. En dessous : réassurance (3 piliers sur wash bleu clair) → à propos condensé (stats) → services (grille de cartes aérée, 1 ligne de description max) → process en 3 étapes → témoignages → CTA final → footer. Rythme linéaire, empilé verticalement, avec un vrai espace de respiration entre chaque bloc.

## Guide agent

action primaire : `#fa3556` (bouton plein)
Créer un bouton d'action primaire : fond `#fa3556`, texte `#ffffff`, rayon 12px, padding 16px × 24px.

action de marque/lien : `#129ba6` (icônes, liens, accents)

## Quick Start

### CSS Custom Properties

```css
:root {
  --color-brand-blue: #129ba6;
  --color-brand-blue-dark: #0f8189;
  --color-coral-pulse: #fa3556;
  --color-promo-gold: #ffc200;
  --color-charcoal-ink: #16191c;
  --color-pure-white: #ffffff;
  --color-fog-white: #f9f9f9;
  --color-tide-tint: #e6f4f6;
  --color-ash-gray: #dadadd;
  --color-mist-gray: #bfbfc0;
  --color-slate: #5b6065;
  --color-graphite: #393e41;
  --color-carbon: #000000;
  --color-deep-abyss: #1e2327;

  --font-inter: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --text-caption: 12px; --leading-caption: 1.5; --tracking-caption: 0.17px;
  --text-body-sm: 14px; --leading-body-sm: 1.71; --tracking-body-sm: 0.24px;
  --text-body: 16px; --leading-body: 1.75;
  --text-subheading: 18px; --leading-subheading: 1.67;
  --text-heading-sm: 24px; --leading-heading-sm: 1.33;
  --text-heading: 32px; --leading-heading: 1.3;
  --text-heading-lg: 40px; --leading-heading-lg: 1.21;
  --text-display: 60px; --leading-display: 1.07; --tracking-display: -1.5px;

  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --spacing-unit: 4px;
  --spacing-4: 4px; --spacing-8: 8px; --spacing-12: 12px; --spacing-16: 16px;
  --spacing-24: 24px; --spacing-32: 32px; --spacing-48: 48px; --spacing-64: 64px;
  --spacing-96: 96px; --spacing-200: 200px;

  --page-max-width: 1200px;
  --section-gap: 64px;
  --card-padding: 32px;
  --element-gap: 8px;

  --radius-lg: 8px; --radius-xl: 12px; --radius-2xl: 16px; --radius-3xl: 32px;
  --radius-full: 48px; --radius-full-2: 64px; --radius-full-3: 96px;

  --radius-cards: 48px;
  --radius-links: 8px;
  --radius-pills: 96px;
  --radius-small: 8px;
  --radius-buttons: 12px;

  --surface-canvas: #f9f9f9;
  --surface-card: #ffffff;
  --surface-tinted-wash: #e6f4f6;
  --surface-dark-panel: #16191c;
  --surface-deep-abyss: #1e2327;
}
```

### Tailwind v4

```css
@theme {
  --color-brand-blue: #129ba6;
  --color-brand-blue-dark: #0f8189;
  --color-coral-pulse: #fa3556;
  --color-promo-gold: #ffc200;
  --color-charcoal-ink: #16191c;
  --color-pure-white: #ffffff;
  --color-fog-white: #f9f9f9;
  --color-tide-tint: #e6f4f6;
  --color-ash-gray: #dadadd;
  --color-mist-gray: #bfbfc0;
  --color-slate: #5b6065;
  --color-graphite: #393e41;
  --color-carbon: #000000;
  --color-deep-abyss: #1e2327;

  --font-inter: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --text-caption: 12px; --leading-caption: 1.5; --tracking-caption: 0.17px;
  --text-body-sm: 14px; --leading-body-sm: 1.71; --tracking-body-sm: 0.24px;
  --text-body: 16px; --leading-body: 1.75;
  --text-subheading: 18px; --leading-subheading: 1.67;
  --text-heading-sm: 24px; --leading-heading-sm: 1.33;
  --text-heading: 32px; --leading-heading: 1.3;
  --text-heading-lg: 40px; --leading-heading-lg: 1.21;
  --text-display: 60px; --leading-display: 1.07; --tracking-display: -1.5px;

  --spacing-4: 4px; --spacing-8: 8px; --spacing-12: 12px; --spacing-16: 16px;
  --spacing-24: 24px; --spacing-32: 32px; --spacing-48: 48px; --spacing-64: 64px;
  --spacing-96: 96px; --spacing-200: 200px;

  --radius-lg: 8px; --radius-xl: 12px; --radius-2xl: 16px; --radius-3xl: 32px;
  --radius-full: 48px; --radius-full-2: 64px; --radius-full-3: 96px;
}
```
