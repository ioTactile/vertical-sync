import {
  CreateClimbingSpotDto,
  GetClimbingSpotsResponse,
  GetClimbingSpotCommentsResponse,
  GetClimbingSpotResponse,
  UpdateClimbingSpotDto,
  CreateClimbingSpotCommentDto,
} from "@/modules/core/model/ClimbingSpot";

export interface IClimbingSpotGateway {
  getClimbingSpot(id: string): Promise<GetClimbingSpotResponse>;
  getPublicClimbingSpots(): Promise<GetClimbingSpotsResponse>;
  getAdminClimbingSpots(): Promise<GetClimbingSpotsResponse>;
  getClimbingSpotsByRadiusAndCoords(
    radius: number,
    coords: [number, number]
  ): Promise<GetClimbingSpotsResponse>;
  getClimbingSpotsSearch(
    searchQuery: string
  ): Promise<GetClimbingSpotsResponse>;
  getClimbingSpotComments(id: string): Promise<GetClimbingSpotCommentsResponse>;
  createClimbingSpot(climbingSpot: CreateClimbingSpotDto): Promise<void>;
  updateClimbingSpot(climbingSpot: UpdateClimbingSpotDto): Promise<void>;
  deleteClimbingSpot(id: string): Promise<void>;
  createClimbingSpotComment(
    comment: CreateClimbingSpotCommentDto
  ): Promise<void>;
}
