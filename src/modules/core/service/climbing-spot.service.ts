import { IClimbingSpotRepository } from "@/modules/core/repository/climbing-spot.repository";
import {
  CreateClimbingSpotCommentDto,
  CreateClimbingSpotDto,
  GetClimbingSpotCommentsResponse,
  GetClimbingSpotResponse,
  GetClimbingSpotsResponse,
  UpdateClimbingSpotDto,
} from "@/modules/core/model/ClimbingSpot";
import { DomainError } from "@/modules/core/domain/errors";

export class ClimbingSpotService {
  constructor(
    private readonly climbingSpotRepository: IClimbingSpotRepository
  ) {}

  async getClimbingSpotById(id: string): Promise<GetClimbingSpotResponse> {
    if (!id?.trim()) {
      throw new DomainError("Id spot requis", "VALIDATION");
    }
    const spot = await this.climbingSpotRepository.findById(id);
    if (!spot) {
      throw new DomainError("Spot non trouvé", "NOT_FOUND");
    }
    return spot;
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
    if (radius <= 0) {
      throw new DomainError("Rayon invalide", "VALIDATION");
    }
    const [lat, lng] = coords;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      throw new DomainError("Coordonnées invalides", "VALIDATION");
    }
    return await this.climbingSpotRepository.findByRadiusAndCoords(
      radius,
      coords
    );
  }

  async getClimbingSpotsSearch(
    searchQuery: string
  ): Promise<GetClimbingSpotsResponse> {
    if (!searchQuery?.trim()) {
      return [];
    }
    return await this.climbingSpotRepository.findBySearch(searchQuery);
  }

  async getClimbingSpotComments(
    id: string
  ): Promise<GetClimbingSpotCommentsResponse> {
    return await this.climbingSpotRepository.findComments(id);
  }

  async createClimbingSpot(climbingSpot: CreateClimbingSpotDto): Promise<void> {
    if (!climbingSpot.name?.trim()) {
      throw new DomainError("Nom du spot requis", "VALIDATION");
    }
    if (!climbingSpot.authorId?.trim()) {
      throw new DomainError("Auteur requis", "VALIDATION");
    }
    if (!climbingSpot.types?.length || !climbingSpot.difficulties?.length) {
      throw new DomainError("Type et difficulté requis", "VALIDATION");
    }
    await this.climbingSpotRepository.create(climbingSpot);
  }

  async updateClimbingSpot(climbingSpot: UpdateClimbingSpotDto): Promise<void> {
    if (!climbingSpot.id?.trim()) {
      throw new DomainError("Id spot requis", "VALIDATION");
    }
    await this.climbingSpotRepository.update(climbingSpot);
  }

  async deleteClimbingSpot(id: string): Promise<void> {
    if (!id?.trim()) {
      throw new DomainError("Id spot requis", "VALIDATION");
    }
    await this.climbingSpotRepository.delete(id);
  }

  async createClimbingSpotComment(
    comment: CreateClimbingSpotCommentDto
  ): Promise<void> {
    if (!comment.content?.trim()) {
      throw new DomainError("Contenu du commentaire requis", "VALIDATION");
    }
    if (comment.notation < 0 || comment.notation > 5) {
      throw new DomainError("Notation entre 0 et 5", "VALIDATION");
    }
    await this.climbingSpotRepository.createComment(comment);
  }
}
