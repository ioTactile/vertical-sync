-- CreateEnum
CREATE TYPE "ClimbingSpotType" AS ENUM ('ALL', 'OUTDOOR', 'INDOOR', 'OUTDOOR_BOULDER', 'OUTDOOR_LEAD', 'INDOOR_BOULDER', 'INDOOR_LEAD', 'INDOOR_SPEED');

-- CreateEnum
CREATE TYPE "ClimbingSpotDifficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT', 'ELITE', 'GRADE_4A', 'GRADE_4B', 'GRADE_4C', 'GRADE_5A', 'GRADE_5B', 'GRADE_5C', 'GRADE_6A', 'GRADE_6B', 'GRADE_6C', 'GRADE_7A', 'GRADE_7B', 'GRADE_7C', 'GRADE_8A', 'GRADE_8B', 'GRADE_8C', 'GRADE_9A', 'GRADE_9A_PLUS', 'GRADE_9B', 'GRADE_9B_PLUS');

-- CreateEnum
CREATE TYPE "ClimbingSpotStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'RESOLVED', 'REJECTED');

-- CreateTable
CREATE TABLE "ArticleComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "articleId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "replyToId" TEXT,
    "replyToUserId" TEXT,

    CONSTRAINT "ArticleComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleLike" (
    "articleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticleLike_pkey" PRIMARY KEY ("articleId","userId")
);

-- CreateTable
CREATE TABLE "ArticleTag" (
    "tagId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticleTag_pkey" PRIMARY KEY ("tagId","articleId")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageName" TEXT,
    "excerpt" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClimbingSpotComment" (
    "content" TEXT NOT NULL,
    "notation" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "climbingSpotId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ClimbingSpot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "country" TEXT,
    "city" TEXT,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "imageUrls" TEXT[],
    "types" "ClimbingSpotType"[],
    "difficulties" "ClimbingSpotDifficulty"[],
    "notation" DECIMAL(3,2) DEFAULT 0,
    "notationCount" INTEGER DEFAULT 0,
    "bestPeriod" TEXT,
    "address" TEXT,
    "websiteUrl" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "parkingAvailable" BOOLEAN,
    "toiletsAvailable" BOOLEAN,
    "status" "ClimbingSpotStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "ClimbingSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "reason" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reporterId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("reporterId","entityType","entityId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalkComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "talkId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "replyToId" TEXT,
    "replyToUserId" TEXT,

    CONSTRAINT "TalkComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talk" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Talk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ArticleComment_articleId_idx" ON "ArticleComment"("articleId");

-- CreateIndex
CREATE INDEX "ArticleComment_authorId_idx" ON "ArticleComment"("authorId");

-- CreateIndex
CREATE INDEX "ArticleComment_replyToId_idx" ON "ArticleComment"("replyToId");

-- CreateIndex
CREATE INDEX "ArticleComment_replyToUserId_idx" ON "ArticleComment"("replyToUserId");

-- CreateIndex
CREATE INDEX "ArticleLike_articleId_idx" ON "ArticleLike"("articleId");

-- CreateIndex
CREATE INDEX "ArticleLike_userId_idx" ON "ArticleLike"("userId");

-- CreateIndex
CREATE INDEX "ArticleTag_articleId_idx" ON "ArticleTag"("articleId");

-- CreateIndex
CREATE INDEX "ArticleTag_tagId_idx" ON "ArticleTag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_authorId_idx" ON "Article"("authorId");

-- CreateIndex
CREATE INDEX "ClimbingSpotComment_climbingSpotId_idx" ON "ClimbingSpotComment"("climbingSpotId");

-- CreateIndex
CREATE INDEX "ClimbingSpotComment_authorId_idx" ON "ClimbingSpotComment"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "ClimbingSpotComment_climbingSpotId_authorId_key" ON "ClimbingSpotComment"("climbingSpotId", "authorId");

-- CreateIndex
CREATE INDEX "ClimbingSpot_status_idx" ON "ClimbingSpot"("status");

-- CreateIndex
CREATE INDEX "ClimbingSpot_types_idx" ON "ClimbingSpot"("types");

-- CreateIndex
CREATE INDEX "ClimbingSpot_difficulties_idx" ON "ClimbingSpot"("difficulties");

-- CreateIndex
CREATE INDEX "ClimbingSpot_country_idx" ON "ClimbingSpot"("country");

-- CreateIndex
CREATE INDEX "ClimbingSpot_city_idx" ON "ClimbingSpot"("city");

-- CreateIndex
CREATE INDEX "Report_reporterId_idx" ON "Report"("reporterId");

-- CreateIndex
CREATE INDEX "Report_entityType_entityId_idx" ON "Report"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "TalkComment_talkId_idx" ON "TalkComment"("talkId");

-- CreateIndex
CREATE INDEX "TalkComment_authorId_idx" ON "TalkComment"("authorId");

-- CreateIndex
CREATE INDEX "TalkComment_replyToId_idx" ON "TalkComment"("replyToId");

-- CreateIndex
CREATE INDEX "TalkComment_replyToUserId_idx" ON "TalkComment"("replyToUserId");

-- CreateIndex
CREATE INDEX "Talk_authorId_idx" ON "Talk"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "ArticleComment"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_replyToUserId_fkey" FOREIGN KEY ("replyToUserId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleLike" ADD CONSTRAINT "ArticleLike_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleLike" ADD CONSTRAINT "ArticleLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTag" ADD CONSTRAINT "ArticleTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTag" ADD CONSTRAINT "ArticleTag_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClimbingSpotComment" ADD CONSTRAINT "ClimbingSpotComment_climbingSpotId_fkey" FOREIGN KEY ("climbingSpotId") REFERENCES "ClimbingSpot"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClimbingSpotComment" ADD CONSTRAINT "ClimbingSpotComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClimbingSpot" ADD CONSTRAINT "ClimbingSpot_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkComment" ADD CONSTRAINT "TalkComment_talkId_fkey" FOREIGN KEY ("talkId") REFERENCES "Talk"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkComment" ADD CONSTRAINT "TalkComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkComment" ADD CONSTRAINT "TalkComment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "TalkComment"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkComment" ADD CONSTRAINT "TalkComment_replyToUserId_fkey" FOREIGN KEY ("replyToUserId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE CASCADE;
