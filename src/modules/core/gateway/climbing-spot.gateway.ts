import {
  CreateClimbingSpotDto,
  GetClimbingSpotsResponse,
  GetClimbingSpotCommentsResponse,
} from "@/modules/core/model/ClimbingSpot";

export interface IClimbingSpotGateway {
  getClimbingSpots(): Promise<GetClimbingSpotsResponse>;
  getClimbingSpotsByRadiusAndCoords(
    radius: number,
    coords: [number, number]
  ): Promise<GetClimbingSpotsResponse>;
  getClimbingSpotsSearch(
    searchQuery: string
  ): Promise<GetClimbingSpotsResponse>;
  createClimbingSpot(climbingSpot: CreateClimbingSpotDto): Promise<void>;
  getClimbingSpotComments(id: string): Promise<GetClimbingSpotCommentsResponse>;
}
