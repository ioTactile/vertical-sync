import type {
  CreateClimbingSpotAlertDto,
  GetClimbingSpotAlertsResponse,
  UpdateClimbingSpotAlertDto,
} from "@/modules/core/model/ClimbingSpotAlert";
import {
  IClimbingSpotAlertRepository,
  climbingSpotAlertRepository,
} from "@/modules/core/repository/climbing-spot-alert.repository";

export class ClimbingSpotAlertService {
  constructor(
    private readonly repository: IClimbingSpotAlertRepository,
  ) {}

  async getAlertsByUserId(
    userId: string,
  ): Promise<GetClimbingSpotAlertsResponse> {
    return this.repository.findManyByUserId(userId);
  }

  async createAlert(data: CreateClimbingSpotAlertDto): Promise<void> {
    await this.repository.create(data);
  }

  async updateAlert(data: UpdateClimbingSpotAlertDto): Promise<void> {
    await this.repository.update(data);
  }

  async deleteAlert(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getAlertByUserAndSpot(
    userId: string,
    climbingSpotId: string,
  ): Promise<{ id: string } | null> {
    return this.repository.findByUserAndSpot(userId, climbingSpotId);
  }
}

export const climbingSpotAlertService = new ClimbingSpotAlertService(
  climbingSpotAlertRepository,
);
