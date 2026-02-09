-- CreateEnum
CREATE TYPE "RockState" AS ENUM ('DRY', 'DAMP', 'WET');

-- CreateEnum
CREATE TYPE "CrowdLevel" AS ENUM ('EMPTY', 'FEW_PEOPLE', 'BUSY', 'PACKED');

-- CreateTable
CREATE TABLE "ClimbingSpotConditionReport" (
    "id" TEXT NOT NULL,
    "climbingSpotId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "rockState" "RockState" NOT NULL,
    "crowdLevel" "CrowdLevel" NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClimbingSpotConditionReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClimbingSpotConditionReport_climbingSpotId_idx" ON "ClimbingSpotConditionReport"("climbingSpotId");

-- CreateIndex
CREATE INDEX "ClimbingSpotConditionReport_authorId_idx" ON "ClimbingSpotConditionReport"("authorId");

-- AddForeignKey
ALTER TABLE "ClimbingSpotConditionReport" ADD CONSTRAINT "ClimbingSpotConditionReport_climbingSpotId_fkey" FOREIGN KEY ("climbingSpotId") REFERENCES "ClimbingSpot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClimbingSpotConditionReport" ADD CONSTRAINT "ClimbingSpotConditionReport_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE CASCADE;
