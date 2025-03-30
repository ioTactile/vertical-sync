-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ReportEntityType" ADD VALUE 'TALK_COMMENT';
ALTER TYPE "ReportEntityType" ADD VALUE 'ARTICLE_COMMENT';
ALTER TYPE "ReportEntityType" ADD VALUE 'CLIMBING_SPOT';
ALTER TYPE "ReportEntityType" ADD VALUE 'CLIMBING_SPOT_COMMENT';
