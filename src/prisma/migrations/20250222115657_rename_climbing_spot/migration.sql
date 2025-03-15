-- AlterTable
ALTER TABLE "ClimbingSpot" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- RenameIndex
ALTER INDEX "coords_idx" RENAME TO "location_idx";
