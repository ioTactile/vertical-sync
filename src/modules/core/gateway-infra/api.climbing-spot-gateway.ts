import {
  CreateClimbingSpotDto,
  GetClimbingSpotCommentsResponse,
  GetClimbingSpotResponse,
  GetClimbingSpotsResponse,
  UpdateClimbingSpotDto,
} from "@/modules/core/model/ClimbingSpot";
import { IClimbingSpotGateway } from "@/modules/core/gateway/climbing-spot.gateway";
import { axiosInstance } from "@/lib/globals";

export class ApiClimbingSpotGateway implements IClimbingSpotGateway {
  async getClimbingSpot(id: string): Promise<GetClimbingSpotResponse> {
    const response = await axiosInstance.get<GetClimbingSpotResponse>(
      `/api/climbing-spot/${id}`
    );
    return response.data;
  }

  async getPublicClimbingSpots(): Promise<GetClimbingSpotsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotsResponse>(
      "/api/climbing-spot"
    );
    return response.data;
  }

  async getAdminClimbingSpots(): Promise<GetClimbingSpotsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotsResponse>(
      "/api/admin/climbing-spot"
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

  async getClimbingSpotComments(
    id: string
  ): Promise<GetClimbingSpotCommentsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotCommentsResponse>(
      `/api/climbing-spot/${id}/comments`,
      {
        params: {
          id,
        },
      }
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

  async updateClimbingSpot(climbingSpot: UpdateClimbingSpotDto): Promise<void> {
    const response = await axiosInstance.patch<void>(
      `/api/climbing-spot/${climbingSpot.id}`,
      climbingSpot
    );
    return response.data;
  }

  async deleteClimbingSpot(id: string): Promise<void> {
    const response = await axiosInstance.delete<void>(
      `/api/climbing-spot/${id}`
    );
    return response.data;
  }
}

export const climbingSpotGateway = new ApiClimbingSpotGateway();
