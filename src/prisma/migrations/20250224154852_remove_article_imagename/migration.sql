/*
  Warnings:

  - You are about to drop the column `imageName` on the `Article` table. All the data in the column will be lost.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "imageName";
