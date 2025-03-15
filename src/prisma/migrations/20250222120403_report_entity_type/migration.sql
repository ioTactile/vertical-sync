/*
  Warnings:

  - The primary key for the `Report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `entityType` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ReportEntityType" AS ENUM ('TALK', 'ARTICLE');

-- AlterTable
ALTER TABLE "Report" DROP CONSTRAINT "Report_pkey",
DROP COLUMN "entityType",
ADD COLUMN     "entityType" "ReportEntityType" NOT NULL,
ADD CONSTRAINT "Report_pkey" PRIMARY KEY ("reporterId", "entityType", "entityId");

-- CreateIndex
CREATE INDEX "Report_entityType_entityId_idx" ON "Report"("entityType", "entityId");
