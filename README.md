# Vertical Sync

Plateforme communautaire dédiée à l’escalade en France : spots cartographiés, discussions, blog collaboratif et alertes météo personnalisées.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## Fonctionnalités

| Domaine | Description |
| --- | --- |
| **Spots** | Cartographie interactive (Leaflet), filtres type/difficulté, recherche géolocalisée, conditions terrain |
| **Alertes météo** | Critères personnalisés (température, vent, pluie, week-ends) + évaluation quotidienne via cron |
| **Blog** | Articles publiés / admin, tags, commentaires, likes |
| **Discussions** | Threads communautaires avec réponses imbriquées |
| **Signalements** | Modération des contenus (articles, talks, spots, commentaires) |
| **Admin** | Back-office de gestion (spots, articles, tags, talks, commentaires) |

---

## Stack technique

| Couche | Technologies |
| --- | --- |
| **Frontend** | Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, shadcn/ui, TipTap, Leaflet |
| **Auth** | Clerk |
| **Data** | Prisma 7, PostgreSQL + PostGIS (Neon), React Query |
| **Storage** | AWS S3 (uploads d’images) |
| **Météo** | Open-Meteo |
| **Tests** | Vitest, Testing Library, Playwright |
| **CI / Deploy** | Vercel (cron jobs), Docker |

---

## Architecture

Le backend applicatif suit une **architecture hexagonale / clean** :

```
src/
├── app/                    # Next.js — pages, API routes, UI, providers
├── modules/
│   ├── core/               # Cœur métier (indépendant de la UI)
│   │   ├── domain/         # Enums & erreurs métier
│   │   ├── model/          # Entités / DTOs (sans Prisma)
│   │   ├── schemas/        # Contrats Zod
│   │   ├── ports/          # Ports (ex. Notifier)
│   │   ├── service/        # Use-cases / règles métier
│   │   ├── repository/     # Adapters driven (Prisma, S3, Open-Meteo)
│   │   ├── gateway/        # Ports driving (interfaces HTTP client)
│   │   ├── gateway-infra/  # Adapters HTTP (axios)
│   │   ├── di/             # Composition root
│   │   ├── hooks/          # React Query (lectures)
│   │   ├── mutations/      # React Query (écritures)
│   │   └── queries/        # Wrappers SSR / metadata
│   └── react/              # Présentation
│       ├── pages/          # Façades branchées sur `app/**/page.tsx`
│       └── sections/       # UI par feature
└── prisma/                 # Schéma, migrations, client généré
```

**Flux nominal**

```
UI (sections) → hooks / mutations → gateway-infra
      → API routes → services → repositories (Prisma / S3 / Open-Meteo)
```

Les services sont câblés via le composition root (`modules/core/di/container.ts`). Les erreurs métier (`DomainError`) sont mappées en réponses HTTP cohérentes.

---

## Prérequis

- **Node.js** ≥ 20
- **pnpm** ≥ 9
- **PostgreSQL** 16 avec **PostGIS** (local via Docker, ou Neon)
- Comptes : **Clerk**, **AWS S3** (uploads), optionnellement **Google Maps**

---

## Démarrage rapide

### 1. Cloner et installer

```bash
git clone <repository-url>
cd micro-services
pnpm install
```

### 2. Variables d’environnement

Créer un fichier `.env` à la racine :

```env
# App
BASE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database (Neon ou Postgres local PostGIS)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# AWS S3
AWS_BUCKET_NAME=
AWS_BUCKET_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# Optionnel
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
CRON_SECRET=
```

### 3. Base de données

```bash
# Postgres + PostGIS local (image custom)
docker compose up -d postgres

# Schéma
pnpm migrate:dev

# Données de démo (optionnel)
pnpm db:seed
```

### 4. Lancer l’app

```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Commande | Description |
| --- | --- |
| `pnpm dev` | Serveur de développement (Turbopack) |
| `pnpm build` | Build de production |
| `pnpm start` | Serveur de production |
| `pnpm lint` | ESLint (flat config Next.js) |
| `pnpm test` | Tests unitaires / intégration (Vitest) |
| `pnpm test:coverage` | Couverture de code |
| `pnpm test:e2e` | Tests end-to-end (Playwright) |
| `pnpm migrate:dev` | Migrations Prisma (dev) |
| `pnpm migrate:prod` | Déploiement des migrations |
| `pnpm db:seed` | Seed de la base |

---

## Tests

```bash
# Unitaires & intégration (gateways, services, utils, routes API)
pnpm test

# Couverture
pnpm test:coverage

# E2E
pnpm test:e2e
```

Les services sont testés avec des **fakes / mocks** d’interfaces repository (isolation hexagonale). Les routes API critiques mockent le composition root.

---

## Déploiement

### Vercel (recommandé)

1. Connecter le dépôt à Vercel.
2. Configurer les variables d’environnement (voir ci-dessus).
3. Le cron d’évaluation des alertes est déclaré dans `vercel.json` :

```json
{
  "crons": [{ "path": "/api/jobs/evaluate-alerts", "schedule": "0 7 * * *" }]
}
```

Protéger l’endpoint avec `CRON_SECRET` (`Authorization: Bearer <secret>`).

### Docker

```bash
docker compose up -d --build
```

- App : [http://localhost:3001](http://localhost:3001)
- Postgres : `localhost:5432`
- Prisma Studio (optionnel) : [http://localhost:5555](http://localhost:5555)

---

## Structure des features

| Feature | Routes principales | Core |
| --- | --- | --- |
| Spots | `/spots`, `/admin/spots` | `climbing-spot.*`, alertes, conditions |
| Blog | `/blog`, `/admin/articles` | `article.*` |
| Talks | `/talks`, `/admin/talks` | `talk.*` |
| Tags | `/admin/tags` | `tag.*` |
| Notifications | UI header | `notification.*` |
| Jobs | `/api/jobs/evaluate-alerts` | `alert-evaluation.*` |

---

## Contribution

1. Créer une branche depuis `main`.
2. Respecter l’architecture : logique métier dans `modules/core`, UI dans `modules/react`.
3. Ajouter / mettre à jour les tests concernés.
4. Vérifier avant PR :

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm test -- --run
```

---

## Licence

Distribué sous licence [MIT](./LICENSE).

---

**Vertical Sync** — communauté escalade · spots · discussions · blog  
Auteur : [ioTactile](https://github.com/ioTactile)
