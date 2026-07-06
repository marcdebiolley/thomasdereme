# Thomas Derême — Physiothérapeute (thomasdereme.ch)

Refonte du site de Thomas Derême, physiothérapeute à Lausanne.
**Next.js 16 (App Router) · TypeScript · Tailwind v4 · next-intl (FR/EN) · blog MDX.**

Design : reproduction fidèle de la maquette validée **« Thomas Dereme Serif »**
(`Thomas Derême - Physiothérapie.html`).

## Direction artistique (source de vérité = la maquette)

- **Type** : `Spectral` (serif — titres, logo, numéros de soins ; italique pour
  l’emphase), `Hanken Grotesk` (sans — corps, nav, boutons, eyebrows).
  Polices auto-hébergées via `next/font`.
- **Palette** (tokens dans `src/app/globals.css`) : `sand #F4F4F2` (fond),
  `dark #23231F` (barres d’accent, section sombre, pills), `ink #1F1E18` (titres),
  `body #26251F`, `muted #56544C`, `taupe #7C7468` (accent — italiques, numéros),
  `line #CFCBC0`, `cream #ECEAE2` (texte sur fond sombre).
- **Layout éditorial** : barres d’accent 8px en haut/bas, hero serif avec emphase
  italique, soins en lignes (chiffres romains I/II/III), section cabinet sombre,
  section contact centrée. Reveal au scroll (`IntersectionObserver`).

## Décisions actées avec le client

| Sujet | Choix |
|---|---|
| Hébergement | **Vercel** |
| Analytics / carte | **GA4 + Google Maps** → bandeau de consentement nLPD requis |
| Réservation | **OneDoc** — widget embarqué + liens CTA |
| Blog | **MDX en fichiers** (`content/blog/`), publié via l’admin **blog-cms** (commit GitHub, comme marcodb.be) |

## Démarrage

```bash
pnpm install
cp .env.example .env.local   # remplir les valeurs
pnpm dev                     # http://localhost:3000  → redirige vers /fr
```

### Publier un article

Un article = un fichier `content/blog/<slug>.<locale>.mdx` (front-matter
`title/description/date/category/image`), publié soit à la main (commit),
soit via une instance de **blog-cms** pointée sur ce repo (env
`GITHUB_OWNER/GITHUB_REPO/GITHUB_BRANCH`).

## Scripts

```bash
pnpm dev         # serveur de dev
pnpm build       # build de prod
pnpm start       # serveur de prod
pnpm lint        # ESLint
pnpm typecheck   # tsc --noEmit
```

## Structure

```
src/
├── app/
│   ├── (frontend)/[locale]/   # site bilingue (FR défaut + EN), pathnames localisés
│   ├── sitemap.ts · robots.ts
│   └── globals.css            # tokens Tailwind v4 (= maquette)
├── components/{layout,sections,ui,seo,booking}
├── i18n/{routing,navigation,request}.ts
├── lib/{site.ts, jsonld.ts, seo/metadata.ts}
└── middleware.ts
content/blog/                  # articles MDX (<slug>.<fr|en>.mdx)
messages/{fr,en}.json          # toutes les chaînes UI
```

## Internationalisation

- Locales : `fr` (défaut) + `en`, toujours préfixées (`/fr`, `/en`).
- URLs traduites (`/fr/les-traitements` ↔ `/en/treatments`) via `src/i18n/routing.ts`.
- Toujours importer `Link`/`redirect` depuis `@/i18n/navigation`, href **sans** préfixe.
- Toute chaîne visible → `messages/{fr,en}.json` (jamais de texte en dur).

## État & prochaines étapes

**Fait** : design system « Serif », home page fidèle (hero serif, soins en lignes,
section cabinet sombre, contact), i18n FR/EN, header/footer + sélecteur de langue, pages
stub (physio, traitements, cabinet, articles, RDV, légal), SEO de base
(metadata + hreflang + JSON-LD Physiotherapy + sitemap/robots)).

**Aussi fait** : pages internes (Le physio / Les soins / Le cabinet) avec photos ;
**consentement nLPD** + GA4 (Consent Mode v2) + **Google Maps gated** ; **blog MDX**
complet (liste + filtres catégories + pagination + RSS, page article + articles liés +
JSON-LD Article/Breadcrumb), publiable via blog-cms ; **FAQ + FAQPage JSON-LD** (GEO) ; `middleware`→`proxy`
(Next 16) ; politique de confidentialité nLPD.

**À faire** (nécessite des inputs externes) :
1. **blog-cms** : déployer une instance pointée sur ce repo (login pour Thomas).
2. **OneDoc** : URL/snippet de réservation → branché dans `OneDocEmbed`.
3. **GA4** : `NEXT_PUBLIC_GA_ID` → analytics actif (après consentement).
4. Migration **contenus + photos** restants ; redirections **301** depuis les URL Odoo (`next.config.ts`).
5. **Mentions légales** (IDE/TVA, statut, hébergeur) ; recette perf finale (CWV) ; go-live (DNS/MX, Search Console).

## Workflow

Branche → PR → review. Ne pas commit avant que `pnpm typecheck && pnpm lint && pnpm build`
passent au vert.
