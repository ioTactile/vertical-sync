-- DropForeignKey
ALTER TABLE "ArticleComment" DROP CONSTRAINT "ArticleComment_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleComment" DROP CONSTRAINT "ArticleComment_replyToId_fkey";

-- DropForeignKey
ALTER TABLE "ClimbingSpotComment" DROP CONSTRAINT "ClimbingSpotComment_climbingSpotId_fkey";

-- DropForeignKey
ALTER TABLE "TalkComment" DROP CONSTRAINT "TalkComment_replyToId_fkey";

-- DropForeignKey
ALTER TABLE "TalkComment" DROP CONSTRAINT "TalkComment_talkId_fkey";

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "ArticleComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClimbingSpotComment" ADD CONSTRAINT "ClimbingSpotComment_climbingSpotId_fkey" FOREIGN KEY ("climbingSpotId") REFERENCES "ClimbingSpot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkComment" ADD CONSTRAINT "TalkComment_talkId_fkey" FOREIGN KEY ("talkId") REFERENCES "Talk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkComment" ADD CONSTRAINT "TalkComment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "TalkComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
