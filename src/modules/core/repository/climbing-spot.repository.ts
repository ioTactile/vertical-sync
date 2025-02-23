import {
  CreateClimbingSpotDto,
  GetClimbingSpotsResponse,
  GetClimbingSpotsSearchResponse,
} from "@/modules/core/model/ClimbingSpot";
import prisma from "@/prisma";
import { createId } from "@paralleldrive/cuid2";

export interface IClimbingSpotRepository {
  findMany(): Promise<GetClimbingSpotsResponse>;
  findByRadiusAndCoords(
    radius: number,
    coords: [number, number]
  ): Promise<GetClimbingSpotsResponse>;
  findBySearch(searchQuery: string): Promise<GetClimbingSpotsSearchResponse>;
  create(climbingSpot: CreateClimbingSpotDto): Promise<void>;
}

export class PrismaClimbingSpotRepository implements IClimbingSpotRepository {
  async findMany(): Promise<GetClimbingSpotsResponse> {
    const spots = await prisma.$queryRaw`
      SELECT 
        id, name, description, country, city,
        ST_X(coords::geometry) as longitude,
        ST_Y(coords::geometry) as latitude,
        ST_AsText(coords) as coords,
        "imageUrls", types, difficulties, "bestPeriod", address,
        "websiteUrl", "phoneNumber", email, "parkingAvailable",
        "toiletsAvailable", status, "authorId", "createdAt", "updatedAt"
      FROM "ClimbingSpot"
      WHERE status = 'APPROVED'
    `;
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
      "imageUrls", types, difficulties, "bestPeriod", address,
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

  async findBySearch(
    searchQuery: string
  ): Promise<GetClimbingSpotsSearchResponse> {
    const searchQueryLower = searchQuery.toLowerCase();
    const searchPattern = `%${searchQueryLower}%`;

    const spots = await prisma.$queryRaw`
      SELECT 
        id, name, description, country, city,
        ST_X(coords::geometry) as longitude,
        ST_Y(coords::geometry) as latitude,
        ST_AsText(coords) as coords,
        "imageUrls", types, difficulties, "bestPeriod", address,
        "websiteUrl", "phoneNumber", email, "parkingAvailable",
        "toiletsAvailable", status, "authorId", "createdAt", "updatedAt",
        SIMILARITY(LOWER(name), ${searchQueryLower}) as name_similarity,
        SIMILARITY(LOWER(description), ${searchQueryLower}) as description_similarity,
        SIMILARITY(LOWER(city), ${searchQueryLower}) as city_similarity,
        SIMILARITY(LOWER(types::text), ${searchQueryLower}) as types_similarity,
        SIMILARITY(LOWER(difficulties::text), ${searchQueryLower}) as difficulties_similarity
      FROM "ClimbingSpot"
      WHERE (
        LOWER(name) % ${searchQueryLower}
        OR LOWER(description) % ${searchQueryLower}
        OR LOWER(city) % ${searchQueryLower}
        OR LOWER(types::text) % ${searchQueryLower}
        OR LOWER(difficulties::text) % ${searchQueryLower}
        OR LOWER(name) LIKE ${searchPattern}
        OR LOWER(description) LIKE ${searchPattern}
        OR LOWER(city) LIKE ${searchPattern}
        OR LOWER(types::text) LIKE ${searchPattern}
        OR LOWER(difficulties::text) LIKE ${searchPattern}
      )
      AND status = 'APPROVED'
      ORDER BY name_similarity DESC
      LIMIT 5;
    `;

    return spots as GetClimbingSpotsSearchResponse;
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
}

export const climbingSpotRepository = new PrismaClimbingSpotRepository();
