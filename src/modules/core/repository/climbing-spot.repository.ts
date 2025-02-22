import {
  CreateClimbingSpotDto,
  GetClimbingSpotsResponse,
} from "@/modules/core/model/ClimbingSpot";
import prisma from "@/prisma";
import { ClimbingSpotStatus } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

export interface IClimbingSpotRepository {
  findMany(): Promise<GetClimbingSpotsResponse>;
  findByRadiusAndCoords(
    radius: number,
    coords: {
      latitude: number;
      longitude: number;
    }
  ): Promise<GetClimbingSpotsResponse>;
  create(climbingSpot: CreateClimbingSpotDto): Promise<void>;
}

export class PrismaClimbingSpotRepository implements IClimbingSpotRepository {
  async findMany(): Promise<GetClimbingSpotsResponse> {
    return await prisma.climbingSpot.findMany({
      where: {
        status: ClimbingSpotStatus.APPROVED,
      },
    });
  }

  async findByRadiusAndCoords(
    radius: number,
    coords: {
      latitude: number;
      longitude: number;
    }
  ): Promise<GetClimbingSpotsResponse> {
    const spots = await prisma.$queryRaw`  
    SELECT 
      id, name, description, country, city, latitude, longitude,
      ST_AsText(coords) as coords,
      "imageUrls", types, difficulties, "bestPeriod", address,
      "websiteUrl", "phoneNumber", email, "parkingAvailable",
      "toiletsAvailable", status, "authorId", "createdAt", "updatedAt"
    FROM "ClimbingSpot"
    WHERE ST_DWithin(
      coords, 
      ST_SetSRID(ST_MakePoint(${coords.longitude}, ${coords.latitude}), 4326), 
      ${radius * 1000}
    );  
  `;

    return spots as GetClimbingSpotsResponse;
  }

  async create(data: CreateClimbingSpotDto): Promise<void> {
    const { coords, ...restData } = data;

    await prisma.$executeRaw`
      INSERT INTO "ClimbingSpot" (
        id,
        name,
        description,
        country,
        city,
        latitude,
        longitude,
        coords,
        "imageUrls",
        types,
        difficulties,
        "bestPeriod",
        address,
        "websiteUrl",
        "phoneNumber",
        email,
        "parkingAvailable",
        "toiletsAvailable",
        status,
        "authorId",
        "createdAt",
        "updatedAt"
      ) VALUES (
        ${createId()},
        ${restData.name},
        ${restData.description},
        ${restData.country},
        ${restData.city},
        ${restData.latitude},
        ${restData.longitude},
        ST_SetSRID(ST_MakePoint(${coords.coordinates[0]}, ${
      coords.coordinates[1]
    }), 4326),
        ${restData.imageUrls},
        ${restData.types}::\"ClimbingSpotType\"[],
        ${restData.difficulties}::\"ClimbingSpotDifficulty\"[],
        ${restData.bestPeriod},
        ${restData.address},
        ${restData.websiteUrl},
        ${restData.phoneNumber},
        ${restData.email},
        ${restData.parkingAvailable},
        ${restData.toiletsAvailable},
        'PENDING',
        ${restData.authorId},
        NOW(),
        NOW()
      )
    `;
  }
}

export const climbingSpotRepository = new PrismaClimbingSpotRepository();
