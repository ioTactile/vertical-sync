-- CreateIndex
CREATE INDEX "coords_idx" ON "ClimbingSpot" USING GIST ("coords");
