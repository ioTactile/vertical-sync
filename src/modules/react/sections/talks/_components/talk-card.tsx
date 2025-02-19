import { TalkWithRelations } from "@/modules/core/model/Talk";
import { getTimeBetweenDateAndNow } from "@/modules/core/utils/date";
import { getCapitalize } from "@/modules/core/utils/string";
import { useRouter } from "next/navigation";
import Avatar from "@/modules/react/sections/_components/avatar";
import { Button } from "@/app/_components/ui/button";
import { MessageCircle, Share2 } from "lucide-react";
import { useShare } from "@/app/_hooks/use-share";
import TalkActionButton from "@/modules/react/sections/talks/_components/talk-action-button";

interface TalkCardProps {
  talk: TalkWithRelations;
}

const TalkCard = ({ talk }: TalkCardProps) => {
  const router = useRouter();

  const { handleShare } = useShare();

  return (
    <div
      className="relative flex flex-col gap-3 bg-card rounded-xl text-card-foreground px-4 py-1 my-1 cursor-pointer hover:bg-accent/20 transition-all duration-300"
      onClick={() => router.push(`/talks/${talk.id}/${talk.title}`)}
    >
      <TalkActionButton talkId={talk.id} talkAuthorId={talk.author.clerkId} />

      <div className="flex items-center gap-2 text-xs">
        <Avatar
          alt={talk.author.name}
          src={talk.author.imageUrl}
          className="w-6 h-6"
        />

        <span className="font-bold">
          {getCapitalize(talk.author.name ?? "")}
        </span>

        <span>•</span>

        <span className="text-muted-foreground">
          il y a {getTimeBetweenDateAndNow(talk.updatedAt)}
        </span>
      </div>

      <h2 className="text-lg font-semibold">{talk.title}</h2>

      <p className="text-muted-foreground">{talk.content}</p>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="rounded-full">
          <MessageCircle className="w-4 h-4 mr-1" />
          {talk._count.talkComments}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={(e) =>
            handleShare(
              `${window.location.origin}/talks/${talk.id}/${talk.title}`,
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
  );
};

export default TalkCard;
