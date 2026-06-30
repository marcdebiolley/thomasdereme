# Thomas Derême — Physiothérapeute (thomasdereme.ch)

Refonte du site de Thomas Derême, physiothérapeute à Lausanne.
**Next.js 16 (App Router) · TypeScript · Tailwind v4 · next-intl (FR/EN) · Sanity v3.**

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
| CMS | **Sanity** (projet neuf, Studio embarqué sur `/studio`) |

## Démarrage

```bash
pnpm install
cp .env.example .env.local   # remplir les valeurs
pnpm dev                     # http://localhost:3000  → redirige vers /fr
```

### Créer le projet Sanity (à faire une fois)

```bash
pnpm dlx sanity@latest init    # crée le projet + dataset "production"
# puis renseigner NEXT_PUBLIC_SANITY_PROJECT_ID / _DATASET dans .env.local
```

Studio d'édition : <http://localhost:3000/studio>.

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
│   ├── (studio)/studio/       # Sanity Studio embarqué (/studio)
│   ├── sitemap.ts · robots.ts
│   └── globals.css            # tokens Tailwind v4 (= maquette)
├── components/{layout,sections,ui,seo,booking}
├── i18n/{routing,navigation,request}.ts
├── lib/{site.ts, jsonld.ts, seo/metadata.ts}
└── middleware.ts
sanity/{env, lib, schemas, structure}.ts · sanity.config.ts
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
(metadata + hreflang + JSON-LD Physiotherapy + sitemap/robots), scaffold Sanity
(schemas article/category/author/treatment/siteSettings + Studio).

**Aussi fait** : pages internes (Le physio / Les soins / Le cabinet) avec photos ;
**consentement nLPD** + GA4 (Consent Mode v2) + **Google Maps gated** ; **blog Sanity**
complet (GROQ, liste + filtres catégories, page article PortableText + articles liés +
JSON-LD Article/Breadcrumb, webhook `/api/revalidate`) avec dégradation propre tant que
le projet Sanity n'existe pas ; **FAQ + FAQPage JSON-LD** (GEO) ; `middleware`→`proxy`
(Next 16) ; politique de confidentialité nLPD.

**À faire** (nécessite des inputs externes) :
1. **Sanity** : `pnpm dlx sanity@latest init` → renseigner `NEXT_PUBLIC_SANITY_*` (le blog s'active alors automatiquement).
2. **OneDoc** : URL/snippet de réservation → branché dans `OneDocEmbed`.
3. **GA4** : `NEXT_PUBLIC_GA_ID` → analytics actif (après consentement).
4. Migration **contenus + photos** restants ; redirections **301** depuis les URL Odoo (`next.config.ts`).
5. **Mentions légales** (IDE/TVA, statut, hébergeur) ; recette perf finale (CWV) ; go-live (DNS/MX, Search Console).

## Workflow

Branche → PR → review. Ne pas commit avant que `pnpm typecheck && pnpm lint && pnpm build`
passent au vert.
