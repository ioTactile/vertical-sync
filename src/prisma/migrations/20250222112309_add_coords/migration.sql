/*
  Warnings:

  - You are about to drop the column `latitude` on the `ClimbingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `ClimbingSpot` table. All the data in the column will be lost.
  - Added the required column `coords` to the `ClimbingSpot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClimbingSpot" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "coords" geography(Point, 4326) NOT NULL;
