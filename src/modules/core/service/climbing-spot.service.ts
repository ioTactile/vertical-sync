import {
  IClimbingSpotRepository,
  climbingSpotRepository,
} from "@/modules/core/repository/climbing-spot.repository";
import {
  CreateClimbingSpotDto,
  GetClimbingSpotsResponse,
} from "@/modules/core/model/ClimbingSpot";

export class ClimbingSpotService {
  constructor(
    private readonly climbingSpotRepository: IClimbingSpotRepository
  ) {}

  async getClimbingSpots(): Promise<GetClimbingSpotsResponse> {
    return await this.climbingSpotRepository.findMany();
  }

  async getClimbingSpotsByRadiusAndCoords(
    radius: number,
    coords: {
      latitude: number;
      longitude: number;
    }
  ): Promise<GetClimbingSpotsResponse> {
    return await this.climbingSpotRepository.findByRadiusAndCoords(
      radius,
      coords
    );
  }

  async createClimbingSpot(climbingSpot: CreateClimbingSpotDto): Promise<void> {
    await this.climbingSpotRepository.create(climbingSpot);
  }
}

export const climbingSpotService = new ClimbingSpotService(
  climbingSpotRepository
);
