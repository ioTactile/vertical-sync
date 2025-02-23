import { CreateClimbingSpotInputs } from "@/modules/react/sections/spots/_schemas/create-climbing-spot";
import { ClimbingSpot } from "@prisma/client";

export type GetClimbingSpotResponse = ClimbingSpot & {
  coords: `POINT(${number} ${number})`;
};

export type GetClimbingSpotsResponse = GetClimbingSpotResponse[];

export type ExtendedClimbingSpot = Omit<GetClimbingSpotResponse, "coords"> & {
  latitude: number;
  longitude: number;
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
