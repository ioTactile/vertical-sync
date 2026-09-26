# Vertical Sync

Plateforme communautaire dédiée à l’escalade en France : spots cartographiés, discussions, blog collaboratif et alertes météo personnalisées.

## Features

| Domaine           | Description                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| **Spots**         | Cartographie interactive (Leaflet), filtres type/difficulté, recherche géolocalisée, conditions terrain |
| **Alertes météo** | Critères personnalisés (température, vent, pluie, week-ends) + évaluation quotidienne via cron          |
| **Blog**          | Articles publiés / admin, tags, commentaires, likes                                                     |
| **Discussions**   | Threads communautaires avec réponses imbriquées                                                         |
| **Signalements**  | Modération des contenus (articles, talks, spots, commentaires)                                          |
| **Admin**         | Back-office de gestion (spots, articles, tags, talks, commentaires)                                     |

## Stack

| Couche      | Technologies                                                                             |
| ----------- | ---------------------------------------------------------------------------------------- |
| Frontend    | Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, shadcn/ui, TipTap, Leaflet |
| Auth        | Clerk                                                                                    |
| Data        | Prisma 7, PostgreSQL + PostGIS (Neon), React Query                                       |
| Storage     | AWS S3 (uploads d’images)                                                                |
| Météo       | Open-Meteo                                                                               |
| Tests       | Vitest, Testing Library, Playwright                                                      |
| CI / Deploy | Vercel (cron jobs), Docker                                                               |

## Prérequis

- **Node.js** ≥ 20
- **pnpm** ≥ 9
- **PostgreSQL** 16 avec **PostGIS** (local via Docker, ou Neon)
- Comptes : **Clerk**, **AWS S3** (uploads), optionnellement **Google Maps**

## Démarrage

### 1. Cloner et installer

```bash
git clone <repository-url>
cd vertical-sync
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
docker compose up -d postgres
pnpm migrate:dev
pnpm db:seed   # optionnel
```

### 4. Lancer l’app

```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Déploiement

**Vercel** : connecter le dépôt, configurer les variables d’environnement. Le cron d’évaluation des alertes est déclaré dans `vercel.json` (`/api/jobs/evaluate-alerts`, schedule `0 7 * * *`). Protéger avec `CRON_SECRET`.

**Docker** :

```bash
docker compose up -d --build
```

- App : [http://localhost:3001](http://localhost:3001)
- Postgres : `localhost:5432`
- Prisma Studio (optionnel) : [http://localhost:5555](http://localhost:5555)

## Scripts

| Commande             | Description                            |
| -------------------- | -------------------------------------- |
| `pnpm dev`           | Serveur de développement (Turbopack)   |
| `pnpm build`         | Build de production                    |
| `pnpm start`         | Serveur de production                  |
| `pnpm lint`          | ESLint (flat config Next.js)           |
| `pnpm test`          | Tests unitaires / intégration (Vitest) |
| `pnpm test:coverage` | Couverture de code                     |
| `pnpm test:e2e`      | Tests end-to-end (Playwright)          |
| `pnpm migrate:dev`   | Migrations Prisma (dev)                |
| `pnpm migrate:prod`  | Déploiement des migrations             |
| `pnpm db:seed`       | Seed de la base                        |

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

**Flux nominal :** UI (sections) → hooks / mutations → gateway-infra → API routes → services → repositories (Prisma / S3 / Open-Meteo).

Les services sont câblés via le composition root (`modules/core/di/container.ts`). Les erreurs métier (`DomainError`) sont mappées en réponses HTTP cohérentes.

| Feature       | Routes principales          | Core                                   |
| ------------- | --------------------------- | -------------------------------------- |
| Spots         | `/spots`, `/admin/spots`    | `climbing-spot.*`, alertes, conditions |
| Blog          | `/blog`, `/admin/articles`  | `article.*`                            |
| Talks         | `/talks`, `/admin/talks`    | `talk.*`                               |
| Tags          | `/admin/tags`               | `tag.*`                                |
| Notifications | UI header                   | `notification.*`                       |
| Jobs          | `/api/jobs/evaluate-alerts` | `alert-evaluation.*`                   |

## Licence

Propriétaire — tous droits réservés. Voir [LICENSE](./LICENSE).
