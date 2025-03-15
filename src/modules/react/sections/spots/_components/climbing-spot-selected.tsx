import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import useClimbingSpotComments from "@/modules/core/hooks/use-climbing-spot-comments";
import { ExtendedClimbingSpot } from "@/modules/core/model/ClimbingSpot";
import { Author } from "@/modules/core/model/User";
import { getTimeBetweenDateAndNow } from "@/modules/core/utils/date";
import {
  CLIMBING_SPOT_DIFFICULTY_LABELS,
  CLIMBING_SPOT_TYPE_LABELS,
} from "@/types/enum";
import {
  CircleParking,
  CircleParkingOff,
  Globe,
  Loader2,
  LucideProps,
  Mail,
  MapPin,
  Phone,
  Star,
  StarHalf,
  Toilet,
} from "lucide-react";
import Image from "next/image";
import Avatar from "@/modules/react/sections/_components/avatar";
import * as React from "react";
import { Button } from "@/app/_components/ui/button";

interface ClimbingSpotSelectedProps {
  spot: ExtendedClimbingSpot;
  onClose: () => void;
}

const ClimbingSpotSelected = ({ spot, onClose }: ClimbingSpotSelectedProps) => {
  const [tabs, setTabs] = React.useState<"infos" | "comments">("infos");

  const { data: comments, isLoading: isCommentsLoading } =
    useClimbingSpotComments(spot.id, tabs === "comments");

  return (
    <div
      className="absolute top-0 left-0 w-full sm:min-w-[300px] sm:max-w-[400px] h-screen-minus-header sm:h-[600px] border-r border-r-border  
      bg-background z-2000 sm:z-500 shadow-[2px_0px_5px_rgba(0,0,0,0.1)]"
    >
      <div className="flex flex-col h-full overflow-y-auto pb-14 md:pb-0">
        {spot.imageUrls.length > 0 ? (
          <Image
            src={spot.imageUrls[0]}
            alt={spot.name}
            width={400}
            height={200}
            className="w-full max-h-[200px] object-cover"
          />
        ) : (
          <Image
            src="/assets/vertical-sync.png"
            alt="vertical-sync"
            width={400}
            height={200}
            className="w-full max-h-[200px] object-cover"
          />
        )}

        <div className="flex flex-col gap-8 px-4 py-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-bold">{spot.name}</h2>
            <Notation
              notation={spot.notation}
              notationCount={spot.notationCount}
            />
            <p className="text-sm text-muted-foreground">{spot.description}</p>
          </div>

          <Tabs
            defaultValue={tabs}
            className="flex flex-col gap-2"
            onValueChange={(value) => setTabs(value as "infos" | "comments")}
          >
            <TabsList className="w-full">
              <TabsTrigger value="infos" className="w-full">
                Infos
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="w-full"
                disabled={!spot.notationCount}
              >
                Commentaires
              </TabsTrigger>
            </TabsList>
            <TabsContent value="infos" className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold">Difficultés</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {spot.difficulties.map((difficulty, index) => (
                      <span
                        key={difficulty}
                        className="text-sm text-muted-foreground"
                      >
                        {CLIMBING_SPOT_DIFFICULTY_LABELS[difficulty]}{" "}
                        {index < spot.difficulties.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold">Types</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {spot.types.map((type, index) => (
                      <span
                        key={type}
                        className="text-sm text-muted-foreground"
                      >
                        {CLIMBING_SPOT_TYPE_LABELS[type]}
                        {index < spot.types.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>

                {spot.bestPeriod && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold">Meilleur période</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {spot.bestPeriod}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold">Contact</h3>
                <div className="flex flex-col gap-2">
                  <Element icon={MapPin} label={spot.address} />
                  <Element
                    icon={Globe}
                    label={spot.websiteUrl}
                    link={spot.websiteUrl}
                  />
                  <Element
                    icon={Phone}
                    label={spot.phoneNumber}
                    link={`tel:${spot.phoneNumber}`}
                  />
                  <Element
                    icon={Mail}
                    label={spot.email}
                    link={`mailto:${spot.email}`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold">
                  Informations complémentaires
                </h3>
                <div className="flex items-center gap-2">
                  {spot.toiletsAvailable && (
                    <Toilet className="h-6 w-6 text-primary" />
                  )}
                  {spot.parkingAvailable ? (
                    <CircleParking className="h-6 w-6 text-primary" />
                  ) : (
                    <CircleParkingOff className="h-6 w-6 text-primary" />
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="comments" className="flex flex-col gap-4">
              {isCommentsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                comments?.map((comment, index) => (
                  <Comment
                    key={index}
                    author={comment.author}
                    content={comment.content}
                    notation={comment.notation}
                    createdAt={comment.createdAt}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        <Button
          onClick={onClose}
          className="w-full absolute bottom-0 left-0 rounded-none md:hidden h-14 text-base"
        >
          Fermer
        </Button>
      </div>
    </div>
  );
};

interface ElementProps {
  icon: React.ComponentType<LucideProps>;
  label: string | null;
  link?: string | null;
}

const Element = (item: ElementProps) => {
  if (!item.label) return null;

  return (
    <div className="flex items-center gap-4">
      {item.icon && <item.icon className="h-6 w-6 text-primary" />}
      {item.link ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          <span className="text-sm text-muted-foreground">{item.label}</span>
        </a>
      ) : (
        <span className="text-sm text-muted-foreground">{item.label}</span>
      )}
    </div>
  );
};

const Notation = ({
  notation,
  notationCount,
}: {
  notation: string;
  notationCount: number | null;
}) => {
  if (notation === "0") return null;

  const notationNumber = parseFloat(notation);
  const fullStars = Math.floor(notationNumber);
  const hasHalfStar = notationNumber % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {notationNumber.toFixed(1)}
      </span>
      <div className="flex">
        {/* Étoiles pleines */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={`full-${index}`}
            className="h-4 w-4 text-yellow-500 fill-yellow-500"
          />
        ))}
        {/* Demi-étoile si nécessaire */}
        {hasHalfStar && (
          <div className="relative">
            <Star className="absolute h-4 w-4 text-gray-300 fill-gray-300" />
            <StarHalf className="relative h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
        )}
        {/* Étoiles vides */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star
            key={`empty-${index}`}
            className="h-4 w-4 text-gray-300 fill-gray-300"
          />
        ))}
      </div>
      {notationCount && notationCount > 0 && (
        <span className="text-sm text-muted-foreground">({notationCount})</span>
      )}
    </div>
  );
};

interface CommentProps {
  author: Author & {
    _count: {
      climbingSpotComments: number;
    };
  };
  content: string;
  notation: number;
  createdAt: Date;
}

const Comment = ({ author, content, notation, createdAt }: CommentProps) => {
  const notationNumber = notation.toString();

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex items-center gap-3">
        <Avatar alt={author.name} src={author.imageUrl} className="w-8 h-8" />
        <div className="flex flex-col">
          <span className="font-medium">{author.name}</span>
          {author._count.climbingSpotComments && (
            <span className="text-sm text-muted-foreground">
              {author._count.climbingSpotComments} avis
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Notation notation={notationNumber} notationCount={null} />
        <span className="text-sm text-muted-foreground">
          il y a {getTimeBetweenDateAndNow(createdAt)}
        </span>
      </div>

      <p className="text-sm text-gray-700">{content}</p>
    </div>
  );
};

export default ClimbingSpotSelected;
