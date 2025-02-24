import { CreateClimbingSpotInputs } from "@/modules/react/sections/spots/_schemas/create-climbing-spot";
import { ClimbingSpot, ClimbingSpotComment } from "@prisma/client";
import { Author } from "@/modules/core/model/User";

export type GetClimbingSpotResponse = ClimbingSpot & {
  coords: `POINT(${number} ${number})`;
};

export type GetClimbingSpotsResponse = GetClimbingSpotResponse[];

export type ExtendedClimbingSpot = Omit<
  GetClimbingSpotResponse,
  "coords" | "notation"
> & {
  latitude: number;
  longitude: number;
  notation: string;
};

export type ExtendedClimbingSpots = ExtendedClimbingSpot[];

export type GetClimbingSpotSearchResponse = {
  id: string;
  name: string;
  description: string;
  country: string;
  city: string;
};

export type GetClimbingSpotsSearchResponse = GetClimbingSpotsSearchResponse[];

export type CreateClimbingSpotDto = {
  authorId: string;
  coords: {
    type: "Point";
    coordinates: [number, number];
  };
} & Omit<CreateClimbingSpotInputs, "latitude" | "longitude">;

export type GetClimbingSpotCommentResponse = ClimbingSpotComment & {
  author: Author & {
    _count: {
      climbingSpotComments: number;
    };
  };
};

export type GetClimbingSpotCommentsResponse = GetClimbingSpotCommentResponse[];
