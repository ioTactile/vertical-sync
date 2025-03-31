import {
  IClimbingSpotRepository,
  climbingSpotRepository,
} from "@/modules/core/repository/climbing-spot.repository";
import {
  CreateClimbingSpotCommentDto,
  CreateClimbingSpotDto,
  GetClimbingSpotCommentsResponse,
  GetClimbingSpotResponse,
  GetClimbingSpotsResponse,
  UpdateClimbingSpotDto,
} from "@/modules/core/model/ClimbingSpot";

export class ClimbingSpotService {
  constructor(
    private readonly climbingSpotRepository: IClimbingSpotRepository
  ) {}

  async getClimbingSpotById(id: string): Promise<GetClimbingSpotResponse> {
    return await this.climbingSpotRepository.findById(id);
  }

  async getPublicClimbingSpots(): Promise<GetClimbingSpotsResponse> {
    return await this.climbingSpotRepository.findMany(true);
  }

  async getAdminClimbingSpots(): Promise<GetClimbingSpotsResponse> {
    return await this.climbingSpotRepository.findMany(false);
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

  async getClimbingSpotComments(
    id: string
  ): Promise<GetClimbingSpotCommentsResponse> {
    return await this.climbingSpotRepository.findComments(id);
  }

  async createClimbingSpot(climbingSpot: CreateClimbingSpotDto): Promise<void> {
    await this.climbingSpotRepository.create(climbingSpot);
  }

  async updateClimbingSpot(climbingSpot: UpdateClimbingSpotDto): Promise<void> {
    await this.climbingSpotRepository.update(climbingSpot);
  }

  async deleteClimbingSpot(id: string): Promise<void> {
    await this.climbingSpotRepository.delete(id);
  }

  async createClimbingSpotComment(
    comment: CreateClimbingSpotCommentDto
  ): Promise<void> {
    await this.climbingSpotRepository.createComment(comment);
  }
}

export const climbingSpotService = new ClimbingSpotService(
  climbingSpotRepository
);
