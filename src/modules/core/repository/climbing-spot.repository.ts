import {
  CreateClimbingSpotDto,
  GetClimbingSpotsResponse,
} from "@/modules/core/model/ClimbingSpot";
import prisma from "@/prisma";

export interface IClimbingSpotRepository {
  findMany(): Promise<GetClimbingSpotsResponse>;
  create(climbingSpot: CreateClimbingSpotDto): Promise<void>;
}

export class PrismaClimbingSpotRepository implements IClimbingSpotRepository {
  async findMany(): Promise<GetClimbingSpotsResponse> {
    return await prisma.climbingSpot.findMany({
      where: {
        status: "APPROVED",
        name: {},
      },
    });
  }

  async create(climbingSpot: CreateClimbingSpotDto): Promise<void> {
    await prisma.climbingSpot.create({
      data: {
        ...climbingSpot,
      },
    });
  }
}

export const climbingSpotRepository = new PrismaClimbingSpotRepository();
