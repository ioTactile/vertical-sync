import {
  CreateClimbingSpotDto,
  GetClimbingSpotsResponse,
  GetClimbingSpotCommentsResponse,
  GetClimbingSpotResponse,
  UpdateClimbingSpotDto,
  CreateClimbingSpotCommentDto,
} from '@/modules/core/model/ClimbingSpot';
import type {
  CreateClimbingSpotConditionReportDto,
  GetClimbingSpotConditionsResponse,
} from '@/modules/core/model/ClimbingSpotConditions';
import type {
  CreateClimbingSpotAlertDto,
  GetClimbingSpotAlertsResponse,
  UpdateClimbingSpotAlertDto,
} from '@/modules/core/model/ClimbingSpotAlert';

export interface IClimbingSpotGateway {
  getClimbingSpot(id: string): Promise<GetClimbingSpotResponse>;
  getPublicClimbingSpots(): Promise<GetClimbingSpotsResponse>;
  getAdminClimbingSpots(): Promise<GetClimbingSpotsResponse>;
  getClimbingSpotsByRadiusAndCoords(
    radius: number,
    coords: [number, number],
  ): Promise<GetClimbingSpotsResponse>;
  getClimbingSpotsSearch(searchQuery: string): Promise<GetClimbingSpotsResponse>;
  getClimbingSpotComments(id: string): Promise<GetClimbingSpotCommentsResponse>;
  createClimbingSpot(climbingSpot: CreateClimbingSpotDto): Promise<void>;
  updateClimbingSpot(climbingSpot: UpdateClimbingSpotDto): Promise<void>;
  deleteClimbingSpot(id: string): Promise<void>;
  createClimbingSpotComment(comment: CreateClimbingSpotCommentDto): Promise<void>;
  getClimbingSpotConditions(id: string): Promise<GetClimbingSpotConditionsResponse>;
  createClimbingSpotConditionReport(data: CreateClimbingSpotConditionReportDto): Promise<void>;
  getClimbingSpotAlerts(userId: string): Promise<GetClimbingSpotAlertsResponse>;
  createClimbingSpotAlert(spotId: string, data: CreateClimbingSpotAlertDto): Promise<void>;
  updateClimbingSpotAlert(alertId: string, data: UpdateClimbingSpotAlertDto): Promise<void>;
  deleteClimbingSpotAlert(alertId: string): Promise<void>;
}
