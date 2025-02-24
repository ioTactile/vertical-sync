import {
  IClimbingSpotRepository,
  climbingSpotRepository,
} from "@/modules/core/repository/climbing-spot.repository";
import {
  CreateClimbingSpotDto,
  GetClimbingSpotCommentsResponse,
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
    coords: [number, number]
  ): Promise<GetClimbingSpotsResponse> {
    return await this.climbingSpotRepository.findByRadiusAndCoords(
      radius,
      coords
    );
  }

  async getClimbingSpotsSearch(
    searchQuery: string
  ): Promise<GetClimbingSpotsResponse> {
    return await this.climbingSpotRepository.findBySearch(searchQuery);
  }

  async createClimbingSpot(climbingSpot: CreateClimbingSpotDto): Promise<void> {
    await this.climbingSpotRepository.create(climbingSpot);
  }

  async getClimbingSpotComments(
    id: string
  ): Promise<GetClimbingSpotCommentsResponse> {
    return await this.climbingSpotRepository.findComments(id);
  }
}

export const climbingSpotService = new ClimbingSpotService(
  climbingSpotRepository
);
