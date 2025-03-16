#!/bin/bash
# Installation des dépendances
npm install

# Génération de Prisma Client
npm run postinstall

# Migration de la base de données
npm run migrate:prod

# Seeding de la base de données
npm run db:seed

# Build de l'application
npm run build

# Démarrage de l'application
npm run start 