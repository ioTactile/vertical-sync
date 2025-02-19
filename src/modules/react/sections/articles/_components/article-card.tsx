import { GetArticleResponse } from "@/modules/core/model/Article";
import { getTimeBetweenDateAndNow } from "@/modules/core/utils/date";
import { getCapitalize } from "@/modules/core/utils/string";
import { useRouter } from "next/navigation";
import Avatar from "@/modules/react/sections/_components/avatar";
import { Button } from "@/app/_components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useShare } from "@/app/_hooks/use-share";
import Tags from "@/modules/react/sections/_components/tags";
import Image from "next/image";
import useArticleLike from "@/modules/react/sections/articles/_hooks/use-article-like";
import useArticleLikeStatus from "@/modules/react/sections/articles/_hooks/use-article-like-status";
import RedactorEditButton from "@/modules/react/sections/articles/_components/redactor-edit-button";

interface ArticleCardProps {
  article: GetArticleResponse;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const router = useRouter();
  const { handleShare } = useShare();
  const { isLiked, likesCount } = useArticleLikeStatus(article);
  const { handletoggleLike } = useArticleLike(article.id, isLiked);

  const handleCardClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("a")
    ) {
      e.stopPropagation();
      return;
    }
    router.push(`/blog/${article.slug}`);
  };

  return (
    <div
      className="relative flex flex-col bg-card rounded-xl text-card-foreground overflow-hidden hover:bg-secondary/20 transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <RedactorEditButton
        articleId={article.id}
        articleAuthorId={article.authorId}
      />

      <div className="relative w-full aspect-video">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageName ?? article.title}
            className="object-cover"
            fill
          />
        ) : (
          <Image
            src="/assets/vertical-sync.png"
            alt="vertical-sync"
            className="object-cover"
            fill
          />
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2 text-sm">
          <Avatar
            alt={article.author.name}
            src={article.author.imageUrl}
            className="w-6 h-6"
          />
          <span className="font-bold">
            {getCapitalize(article.author.name ?? "")}
          </span>
          <span>•</span>
          <span className="text-muted-foreground">
            il y a {getTimeBetweenDateAndNow(article.updatedAt)}
          </span>
        </div>

        <h2 className="text-xl font-semibold">{article.title}</h2>

        <p className="text-muted-foreground">{article.excerpt}</p>

        <Tags tags={article.articleTags} />

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className={`rounded-full ${
              isLiked ? "bg-primary/20" : ""
            } hover:bg-primary/40`}
            onClick={handletoggleLike}
          >
            <Heart
              className={`w-4 h-4 mr-1 ${isLiked ? "fill-current" : ""}`}
            />
            {likesCount}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full hover:bg-primary/40"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            {article._count.articleComments}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full hover:bg-primary/40"
            onClick={(e) =>
              handleShare(
                `${window.location.origin}/blog/${article.slug}`,
                "Le lien a été copié dans le presse-papiers",
                e
              )
            }
          >
            <Share2 className="w-4 h-4 mr-1" />
            Partager
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
