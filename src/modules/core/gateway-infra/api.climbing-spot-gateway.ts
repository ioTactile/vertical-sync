import {
  CreateClimbingSpotCommentDto,
  CreateClimbingSpotDto,
  GetClimbingSpotCommentsResponse,
  GetClimbingSpotResponse,
  GetClimbingSpotsResponse,
  UpdateClimbingSpotDto,
} from '@/modules/core/model/ClimbingSpot';
import type {
  CreateClimbingSpotAlertDto,
  GetClimbingSpotAlertsResponse,
  UpdateClimbingSpotAlertDto,
} from '@/modules/core/model/ClimbingSpotAlert';
import type {
  CreateClimbingSpotConditionReportDto,
  GetClimbingSpotConditionsResponse,
} from '@/modules/core/model/ClimbingSpotConditions';
import { IClimbingSpotGateway } from '@/modules/core/gateway/climbing-spot.gateway';
import { axiosInstance } from '@/lib/globals';

export class ApiClimbingSpotGateway implements IClimbingSpotGateway {
  async getClimbingSpot(id: string): Promise<GetClimbingSpotResponse> {
    const response = await axiosInstance.get<GetClimbingSpotResponse>(`/api/climbing-spot/${id}`);
    return response.data;
  }

  async getPublicClimbingSpots(): Promise<GetClimbingSpotsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotsResponse>('/api/climbing-spot');
    return response.data;
  }

  async getAdminClimbingSpots(): Promise<GetClimbingSpotsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotsResponse>('/api/admin/climbing-spot');
    return response.data;
  }

  async getClimbingSpotsByRadiusAndCoords(
    radius: number,
    coords: [number, number],
  ): Promise<GetClimbingSpotsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotsResponse>(
      `/api/climbing-spot?radius=${radius}&coords=${JSON.stringify(coords)}`,
    );
    return response.data;
  }

  async getClimbingSpotsSearch(searchQuery: string): Promise<GetClimbingSpotsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotsResponse>(
      `/api/climbing-spot?search=${searchQuery}`,
    );
    return response.data;
  }

  async getClimbingSpotComments(id: string): Promise<GetClimbingSpotCommentsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotCommentsResponse>(
      `/api/climbing-spot/${id}/comments`,
    );
    return response.data;
  }

  async createClimbingSpot(climbingSpot: CreateClimbingSpotDto): Promise<void> {
    const response = await axiosInstance.post<void>('/api/climbing-spot', climbingSpot);
    return response.data;
  }

  async updateClimbingSpot(climbingSpot: UpdateClimbingSpotDto): Promise<void> {
    const response = await axiosInstance.patch<void>(
      `/api/climbing-spot/${climbingSpot.id}`,
      climbingSpot,
    );
    return response.data;
  }

  async deleteClimbingSpot(id: string): Promise<void> {
    const response = await axiosInstance.delete<void>(`/api/climbing-spot/${id}`, {
      data: {
        id,
      },
    });
    return response.data;
  }

  async createClimbingSpotComment(comment: CreateClimbingSpotCommentDto): Promise<void> {
    const response = await axiosInstance.post<void>(
      `/api/climbing-spot/${comment.climbingSpotId}/comments`,
      comment,
    );
    return response.data;
  }

  async getClimbingSpotConditions(id: string): Promise<GetClimbingSpotConditionsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotConditionsResponse>(
      `/api/climbing-spot/${id}/conditions`,
    );
    return response.data;
  }

  async createClimbingSpotConditionReport(
    data: CreateClimbingSpotConditionReportDto,
  ): Promise<void> {
    const response = await axiosInstance.post<void>(
      `/api/climbing-spot/${data.climbingSpotId}/conditions`,
      data,
    );
    return response.data;
  }

  async getClimbingSpotAlerts(userId: string): Promise<GetClimbingSpotAlertsResponse> {
    const response = await axiosInstance.get<GetClimbingSpotAlertsResponse>(
      '/api/climbing-spot/alerts',
      { params: { userId } },
    );
    return response.data;
  }

  async createClimbingSpotAlert(spotId: string, data: CreateClimbingSpotAlertDto): Promise<void> {
    const response = await axiosInstance.post<void>(`/api/climbing-spot/${spotId}/alerts`, data);
    return response.data;
  }

  async updateClimbingSpotAlert(alertId: string, data: UpdateClimbingSpotAlertDto): Promise<void> {
    const response = await axiosInstance.patch<void>(`/api/climbing-spot/alerts/${alertId}`, data);
    return response.data;
  }

  async deleteClimbingSpotAlert(alertId: string): Promise<void> {
    const response = await axiosInstance.delete<void>(`/api/climbing-spot/alerts/${alertId}`);
    return response.data;
  }
}

export const climbingSpotGateway = new ApiClimbingSpotGateway();
