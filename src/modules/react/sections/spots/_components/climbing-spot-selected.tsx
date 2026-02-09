import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import useClimbingSpotComments from "@/modules/core/hooks/use-climbing-spot-comments";
import useClimbingSpotConditions from "@/modules/core/hooks/use-climbing-spot-conditions";
import useUserClimbingSpotAlerts from "@/modules/core/hooks/use-user-climbing-spot-alerts";
import useSpotWeather from "@/modules/core/hooks/use-spot-weather";
import { ExtendedClimbingSpot } from "@/modules/core/model/ClimbingSpot";
import type { GetClimbingSpotConditionReportResponse } from "@/modules/core/model/ClimbingSpotConditions";
import { Author } from "@/modules/core/model/User";
import { getTimeBetweenDateAndNow } from "@/modules/core/utils/date";
import {
  CLIMBING_SPOT_DIFFICULTY_LABELS,
  CLIMBING_SPOT_TYPE_LABELS,
} from "@/types/enum";
import {
  Bell,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import ClimbingSpotAlertForm from "./climbing-spot-alert-form";
import CommentForm from "./comment-form";
import SpotConditionsForm from "./spot-conditions-form";
import { useComment } from "@/modules/react/sections/spots/_hooks/use-comment";
import { useDeleteClimbingSpotAlert } from "@/modules/core/mutations/useDeleteClimbingSpotAlert";
import { useToast } from "@/app/_hooks/use-toast";
import { useUserStore } from "@/modules/core/store/store";
import WeatherPanel from "@/modules/react/sections/spots/_components/weather-panel";

interface ClimbingSpotSelectedProps {
  spot: ExtendedClimbingSpot;
  onClose: () => void;
}

const ROCK_STATE_LABELS: Record<string, string> = {
  DRY: "Sèche",
  DAMP: "Humide",
  WET: "Mouillée",
};
const CROWD_LEVEL_LABELS: Record<string, string> = {
  EMPTY: "Vide",
  FEW_PEOPLE: "Quelques personnes",
  BUSY: "Fréquenté",
  PACKED: "Comblé",
};

const OUTDOOR_SPOT_TYPES = [
  "OUTDOOR",
  "OUTDOOR_BOULDER",
  "OUTDOOR_LEAD",
] as const;

const ClimbingSpotSelected = ({ spot, onClose }: ClimbingSpotSelectedProps) => {
  const hasOutdoorType = spot.types.some((t) =>
    (OUTDOOR_SPOT_TYPES as readonly string[]).includes(t),
  );
  const [tabs, setTabs] = React.useState<
    "infos" | "comments" | "conditions"
  >("infos");
  const [isConditionsModalOpen, setIsConditionsModalOpen] =
    React.useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState(false);

  const { data: comments, isLoading: isCommentsLoading } =
    useClimbingSpotComments(spot.id, tabs === "comments");

  const { data: conditions, isLoading: isConditionsLoading } =
    useClimbingSpotConditions(spot.id, tabs === "conditions");

  const { user } = useUserStore();
  const { data: userAlerts } = useUserClimbingSpotAlerts(
    user?.id,
    !!user?.id,
  );
  const existingAlertForSpot = React.useMemo(
    () => userAlerts?.find((a) => a.climbingSpotId === spot.id),
    [userAlerts, spot.id],
  );
  const deleteAlert = useDeleteClimbingSpotAlert();
  const { toast } = useToast();

  const {
    data: weather,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
  } = useSpotWeather({
    latitude: spot.latitude,
    longitude: spot.longitude,
    enabled: hasOutdoorType,
  });
  const showWeatherAndConditions = hasOutdoorType;

  React.useEffect(() => {
    if (!showWeatherAndConditions && tabs === "conditions") {
      setTabs("infos");
    }
  }, [showWeatherAndConditions, tabs]);

  const { isCommentModalOpen, setIsCommentModalOpen } = useComment();

  const isUserAlreadyCommented = React.useMemo(() => {
    return comments?.some((comment) => comment.authorId === user?.id);
  }, [comments, user?.id]);

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
            onValueChange={(value) =>
              setTabs(value as "infos" | "comments" | "conditions")
            }
          >
            <TabsList className="w-full">
              <TabsTrigger value="infos" className="w-full">
                Infos
              </TabsTrigger>
              {showWeatherAndConditions && (
                <TabsTrigger value="conditions" className="w-full">
                  Conditions
                </TabsTrigger>
              )}
              <TabsTrigger value="comments" className="w-full">
                Commentaires
              </TabsTrigger>
            </TabsList>
            <TabsContent value="infos" className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {showWeatherAndConditions && !isWeatherError && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold">Météo</h3>
                    <WeatherPanel weather={weather} isLoading={isWeatherLoading} />
                  </div>
                )}

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

              {showWeatherAndConditions && (
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold">Alerte bon jour</h3>
                  <p className="text-sm text-muted-foreground">
                    Soyez notifié quand la météo sera favorable pour grimper ici.
                  </p>
                  <Dialog
                    open={isAlertModalOpen}
                    onOpenChange={setIsAlertModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full gap-2">
                        <Bell className="h-4 w-4" />
                        {existingAlertForSpot
                          ? "Gérer mon alerte"
                          : "Créer une alerte"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="z-2000 flex flex-col max-h-[90dvh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {existingAlertForSpot
                            ? "Modifier l'alerte"
                            : "Alerte bon jour"}
                        </DialogTitle>
                      </DialogHeader>
                      <ClimbingSpotAlertForm
                        spotId={spot.id}
                        existingAlert={existingAlertForSpot}
                        onSuccess={() => setIsAlertModalOpen(false)}
                        onDelete={
                          existingAlertForSpot
                            ? () => {
                                deleteAlert.mutate(existingAlertForSpot.id, {
                                  onSuccess: () => {
                                    toast({
                                      title: "Alerte supprimée",
                                      description:
                                        "Vous ne recevrez plus de notification pour ce spot.",
                                    });
                                    setIsAlertModalOpen(false);
                                  },
                                });
                              }
                            : undefined
                        }
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </TabsContent>
            {showWeatherAndConditions && (
              <TabsContent value="conditions" className="flex flex-col gap-4">
              <Dialog
                open={isConditionsModalOpen}
                onOpenChange={setIsConditionsModalOpen}
              >
                <DialogTrigger asChild>
                  <Button className="w-full">Signaler les conditions</Button>
                </DialogTrigger>
                <DialogContent className="z-2000 flex flex-col max-h-[90dvh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Signaler les conditions</DialogTitle>
                  </DialogHeader>
                  <SpotConditionsForm
                    spotId={spot.id}
                    onSuccess={() => setIsConditionsModalOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              {isConditionsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : !conditions?.length ? (
                <div className="text-center text-muted-foreground">
                  Aucun signalement pour le moment. Soyez le premier à indiquer
                  les conditions (roche et affluence).
                </div>
              ) : (
                conditions.map((report) => (
                  <ConditionReportRow
                    key={report.id}
                    report={report}
                    rockStateLabel={
                      ROCK_STATE_LABELS[report.rockState] ?? report.rockState
                    }
                    crowdLevelLabel={
                      CROWD_LEVEL_LABELS[report.crowdLevel] ?? report.crowdLevel
                    }
                  />
                ))
              )}
            </TabsContent>
            )}
            <TabsContent value="comments" className="flex flex-col gap-4">
              {!isUserAlreadyCommented && (
                <Dialog
                  open={isCommentModalOpen}
                  onOpenChange={setIsCommentModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full">Laisser un commentaire</Button>
                  </DialogTrigger>
                  <DialogContent className="z-2000 flex flex-col h-full sm:h-[90dvh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Laisser un commentaire</DialogTitle>
                    </DialogHeader>
                    <CommentForm
                      spotId={spot.id}
                      onSuccess={() => setIsCommentModalOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              )}
              {isCommentsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : comments?.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  Aucun commentaire pour le moment
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

interface ConditionReportRowProps {
  report: GetClimbingSpotConditionReportResponse;
  rockStateLabel: string;
  crowdLevelLabel: string;
}

const ConditionReportRow = ({
  report,
  rockStateLabel,
  crowdLevelLabel,
}: ConditionReportRowProps) => {
  return (
    <div className="flex flex-col gap-2 py-4 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <Avatar
          alt={report.author.name ?? ""}
          src={report.author.imageUrl}
          className="w-8 h-8"
        />
        <div className="flex flex-col">
          <span className="font-medium">{report.author.name ?? "Anonyme"}</span>
          <span className="text-sm text-muted-foreground">
            il y a {getTimeBetweenDateAndNow(report.createdAt)}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="font-medium">Roche:</span>
        <span className="text-muted-foreground">{rockStateLabel}</span>
        <span className="font-medium">Affluence:</span>
        <span className="text-muted-foreground">{crowdLevelLabel}</span>
      </div>
      {report.comment && (
        <p className="text-sm text-muted-foreground">{report.comment}</p>
      )}
    </div>
  );
};

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
