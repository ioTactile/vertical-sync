/*
  Warnings:

  - You are about to drop the column `latitude` on the `ClimbingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `ClimbingSpot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClimbingSpot" DROP COLUMN "latitude",
DROP COLUMN "longitude";
