import {
  CreateClimbingSpotDto,
  GetClimbingSpotCommentsResponse,
  GetClimbingSpotResponse,
  GetClimbingSpotsResponse,
  UpdateClimbingSpotDto,
} from "@/modules/core/model/ClimbingSpot";
import prisma from "@/prisma";
import { createId } from "@paralleldrive/cuid2";
import { ClimbingSpotStatus, Prisma } from "@prisma/client";

export interface IClimbingSpotRepository {
  findById(id: string): Promise<GetClimbingSpotResponse>;
  findMany(publishedOnly: boolean): Promise<GetClimbingSpotsResponse>;
  findByRadiusAndCoords(
    radius: number,
    coords: [number, number]
  ): Promise<GetClimbingSpotsResponse>;
  findBySearch(searchQuery: string): Promise<GetClimbingSpotsResponse>;
  findComments(id: string): Promise<GetClimbingSpotCommentsResponse>;
  create(climbingSpot: CreateClimbingSpotDto): Promise<void>;
  update(climbingSpot: UpdateClimbingSpotDto): Promise<void>;
  delete(id: string): Promise<void>;
}

export class PrismaClimbingSpotRepository implements IClimbingSpotRepository {
  async findById(id: string): Promise<GetClimbingSpotResponse> {
    const [spot] = await prisma.$queryRaw<GetClimbingSpotResponse[]>`
      SELECT  
        id, name, description, country, city,
        ST_X(coords::geometry) as longitude,
        ST_Y(coords::geometry) as latitude,
        ST_AsText(coords) as coords,
        "imageUrls", types, difficulties, "bestPeriod", notation, "notationCount", address,
        "websiteUrl", "phoneNumber", email, "parkingAvailable",
        "toiletsAvailable", status, "authorId", "createdAt", "updatedAt"
      FROM "ClimbingSpot"
      WHERE id = ${id}
      LIMIT 1
    `;
    return spot as GetClimbingSpotResponse;
  }

  async findMany(publishedOnly: boolean): Promise<GetClimbingSpotsResponse> {
    const baseQuery = Prisma.sql`
      SELECT 
        id, name, description, country, city,
        ST_X(coords::geometry) as longitude,
        ST_Y(coords::geometry) as latitude,
        ST_AsText(coords) as coords,
        "imageUrls", types, difficulties, "bestPeriod", notation, "notationCount", address,
        "websiteUrl", "phoneNumber", email, "parkingAvailable",
        "toiletsAvailable", status, "authorId", "createdAt", "updatedAt"
      FROM "ClimbingSpot"
    `;

    const spots = publishedOnly
      ? await prisma.$queryRaw`
          ${baseQuery}
          WHERE status = ${ClimbingSpotStatus.APPROVED}::"ClimbingSpotStatus"
        `
      : await prisma.$queryRaw`${baseQuery}`;
    return spots as GetClimbingSpotsResponse;
  }

  async findByRadiusAndCoords(
    radius: number,
    coords: [number, number]
  ): Promise<GetClimbingSpotsResponse> {
    const spots = await prisma.$queryRaw`  
    SELECT 
      id, name, description, country, city,
      ST_X(coords::geometry) as longitude,
      ST_Y(coords::geometry) as latitude,
      ST_AsText(coords) as coords,
      "imageUrls", types, difficulties, "bestPeriod", notation, "notationCount", address,
      "websiteUrl", "phoneNumber", email, "parkingAvailable",
      "toiletsAvailable", status, "authorId", "createdAt", "updatedAt"
    FROM "ClimbingSpot"
    WHERE ST_DWithin(
      coords, 
      ST_SetSRID(ST_MakePoint(${coords[1]}, ${coords[0]}), 4326), 
      ${radius * 1000}
    )
    AND status = 'APPROVED';
  `;

    return spots as GetClimbingSpotsResponse;
  }

  async findBySearch(searchQuery: string): Promise<GetClimbingSpotsResponse> {
    const searchQueryLower = searchQuery.toLowerCase();
    const searchPattern = `%${searchQueryLower}%`;

    const spots = await prisma.$queryRaw`
      SELECT 
        id, name, description, country, city,
        ST_X(coords::geometry) as longitude,
        ST_Y(coords::geometry) as latitude,
        ST_AsText(coords) as coords,
        "imageUrls", types, difficulties, "bestPeriod", notation, "notationCount", address,
        "websiteUrl", "phoneNumber", email, "parkingAvailable",
        "toiletsAvailable", status, "authorId", "createdAt", "updatedAt",
        SIMILARITY(LOWER(name), ${searchQueryLower}) as name_similarity,
        SIMILARITY(LOWER(description), ${searchQueryLower}) as description_similarity,
        SIMILARITY(LOWER(city), ${searchQueryLower}) as city_similarity
      FROM "ClimbingSpot"
      WHERE (
        LOWER(name) % ${searchQueryLower}
        OR LOWER(description) % ${searchQueryLower}
        OR LOWER(city) % ${searchQueryLower}
        OR LOWER(name) LIKE ${searchPattern}
        OR LOWER(description) LIKE ${searchPattern}
        OR LOWER(city) LIKE ${searchPattern}
      )
      AND status = 'APPROVED'
      ORDER BY name_similarity DESC
      LIMIT 5;
    `;

    return spots as GetClimbingSpotsResponse;
  }

  async findComments(id: string): Promise<GetClimbingSpotCommentsResponse> {
    const comments = await prisma.climbingSpotComment.findMany({
      where: { climbingSpotId: id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            clerkId: true,
            _count: {
              select: {
                climbingSpotComments: true,
              },
            },
          },
        },
      },
    });

    return comments;
  }

  async create(data: CreateClimbingSpotDto): Promise<void> {
    const { coords, ...rest } = data;

    await prisma.$executeRaw`
      INSERT INTO "ClimbingSpot" (
        id,
        name,
        description,
        country,
        city,
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
        ${rest.name},
        ${rest.description},
        ${rest.country},
        ${rest.city},
        ST_SetSRID(ST_MakePoint(${coords.coordinates[0]}, ${
      coords.coordinates[1]
    }), 4326),
        ${rest.imageUrls},
        ${rest.types}::\"ClimbingSpotType\"[],
        ${rest.difficulties}::\"ClimbingSpotDifficulty\"[],
        ${rest.bestPeriod},
        ${rest.address},
        ${rest.websiteUrl},
        ${rest.phoneNumber},
        ${rest.email},
        ${rest.parkingAvailable},
        ${rest.toiletsAvailable},
        'PENDING',
        ${rest.authorId},
        NOW(),
        NOW()
      )
    `;
  }

  async update(data: UpdateClimbingSpotDto): Promise<void> {
    const { coords, ...rest } = data;

    await prisma.$executeRaw`
      UPDATE "ClimbingSpot"
      SET
        name = ${rest.name},
        description = ${rest.description},
        country = ${rest.country},
        city = ${rest.city},
        coords = ST_SetSRID(ST_MakePoint(${coords.coordinates[0]}, ${coords.coordinates[1]}), 4326),
        "imageUrls" = ${rest.imageUrls},
        types = ${rest.types}::\"ClimbingSpotType\"[],  
        difficulties = ${rest.difficulties}::\"ClimbingSpotDifficulty\"[],
        "bestPeriod" = ${rest.bestPeriod},
        address = ${rest.address},
        "websiteUrl" = ${rest.websiteUrl},
        "phoneNumber" = ${rest.phoneNumber},
        email = ${rest.email},
        "parkingAvailable" = ${rest.parkingAvailable},
        "toiletsAvailable" = ${rest.toiletsAvailable},
        "updatedAt" = NOW()
      WHERE id = ${data.id}
    `;
  }

  async delete(id: string): Promise<void> {
    await prisma.climbingSpot.delete({
      where: { id },
    });
  }
}

export const climbingSpotRepository = new PrismaClimbingSpotRepository();
