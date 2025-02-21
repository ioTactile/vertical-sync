import { CreateClimbingSpotInputs } from "@/modules/react/sections/spots/_schemas/create-climbing-spot";
import { ClimbingSpot } from "@prisma/client";

export type GetClimbingSpotsResponse = ClimbingSpot[];

export type CreateClimbingSpotDto = {
  authorId: string;
  notation: number;
  notationCount: number;
} & CreateClimbingSpotInputs;
