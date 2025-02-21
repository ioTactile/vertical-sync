import {
  CreateClimbingSpotDto,
  GetClimbingSpotsResponse,
} from "@/modules/core/model/ClimbingSpot";

export interface IClimbingSpotGateway {
  getClimbingSpots(): Promise<GetClimbingSpotsResponse>;
  createClimbingSpot(climbingSpot: CreateClimbingSpotDto): Promise<void>;
}
