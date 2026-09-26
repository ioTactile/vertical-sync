import type {
  CreateClimbingSpotConditionReportDto,
  GetClimbingSpotConditionsResponse,
} from "@/modules/core/model/ClimbingSpotConditions";
import {
  IClimbingSpotConditionRepository,
} from "@/modules/core/repository/climbing-spot-condition.repository";

export class ClimbingSpotConditionService {
  constructor(
    private readonly repository: IClimbingSpotConditionRepository,
  ) {}

  async getConditions(
    climbingSpotId: string,
  ): Promise<GetClimbingSpotConditionsResponse> {
    return this.repository.findManyByClimbingSpotId(climbingSpotId);
  }

  async createReport(
    data: CreateClimbingSpotConditionReportDto,
  ): Promise<void> {
    await this.repository.create(data);
  }
}

