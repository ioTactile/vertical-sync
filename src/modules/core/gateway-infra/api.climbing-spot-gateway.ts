import {
  CreateClimbingSpotDto,
  GetClimbingSpotsResponse,
} from "@/modules/core/model/ClimbingSpot";
import { IClimbingSpotGateway } from "@/modules/core/gateway/climbing-spot.gateway";
import { axiosInstance } from "@/lib/globals";

export class ApiClimbingSpotGateway implements IClimbingSpotGateway {
  async getClimbingSpots(): Promise<GetClimbingSpotsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotsResponse>(
      "/api/climbing-spot"
    );
    return response.data;
  }

  async getClimbingSpotsByRadiusAndCoords(
    radius: number,
    coords: [number, number]
  ): Promise<GetClimbingSpotsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotsResponse>(
      `/api/climbing-spot?radius=${radius}&coords=${JSON.stringify(coords)}`
    );
    return response.data;
  }

  async getClimbingSpotsSearch(
    searchQuery: string
  ): Promise<GetClimbingSpotsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotsResponse>(
      `/api/climbing-spot?search=${searchQuery}`
    );
    return response.data;
  }

  async createClimbingSpot(climbingSpot: CreateClimbingSpotDto): Promise<void> {
    const response = await axiosInstance.post<void>(
      "/api/climbing-spot",
      climbingSpot
    );
    return response.data;
  }
}

export const climbingSpotGateway = new ApiClimbingSpotGateway();
