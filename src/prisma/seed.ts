import { PrismaClient } from "@prisma/client";
import seedData from "../../public/seed.json";
import { createId } from "@paralleldrive/cuid2";

const prisma = new PrismaClient();

async function main() {
  await prisma.tag.createMany({
    data: [
      { name: "Nutrition" },
      { name: "Bloc" },
      { name: "Voie" },
      { name: "Vitesse" },
      { name: "Santé mentale" },
      { name: "Méditation" },
    ],
  });
  seedData.forEach(async (spot) => {
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
        ${spot.name},
        ${spot.description},
        ${spot.country},
        ${spot.city},
        ST_SetSRID(ST_MakePoint(${spot.coords.coordinates[0]}, ${
      spot.coords.coordinates[1]
    }), 4326),
        ${spot.imageUrls},
        ${spot.types}::\"ClimbingSpotType\"[],
        ${spot.difficulties}::\"ClimbingSpotDifficulty\"[],
        ${spot.bestPeriod},
        ${spot.address},
        ${spot.websiteUrl},
        ${spot.phoneNumber},
        ${spot.email},
        ${spot.parkingAvailable},
        ${spot.toiletsAvailable},
        'PENDING',
        ${spot.userId},
        NOW(),
        NOW()
      )
    `;
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
