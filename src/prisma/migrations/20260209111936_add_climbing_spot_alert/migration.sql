-- CreateTable
CREATE TABLE "ClimbingSpotAlert" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "climbingSpotId" TEXT NOT NULL,
    "minTempC" DOUBLE PRECISION,
    "maxTempC" DOUBLE PRECISION,
    "maxWindKmh" DOUBLE PRECISION,
    "onlyWeekends" BOOLEAN NOT NULL DEFAULT false,
    "avoidRain" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClimbingSpotAlert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClimbingSpotAlert_userId_idx" ON "ClimbingSpotAlert"("userId");

-- CreateIndex
CREATE INDEX "ClimbingSpotAlert_climbingSpotId_idx" ON "ClimbingSpotAlert"("climbingSpotId");

-- CreateIndex
CREATE UNIQUE INDEX "ClimbingSpotAlert_userId_climbingSpotId_key" ON "ClimbingSpotAlert"("userId", "climbingSpotId");

-- AddForeignKey
ALTER TABLE "ClimbingSpotAlert" ADD CONSTRAINT "ClimbingSpotAlert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClimbingSpotAlert" ADD CONSTRAINT "ClimbingSpotAlert_climbingSpotId_fkey" FOREIGN KEY ("climbingSpotId") REFERENCES "ClimbingSpot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
