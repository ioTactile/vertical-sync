import {
  ClimbingSpotDifficulty,
  ClimbingSpotStatus,
  ClimbingSpotType,
} from "@/prisma/client";
import { z } from "zod";

export const createClimbingSpotSchema = z.object({
  name: z.string().min(1, "Veuillez remplir ce champ"),
  description: z.string().nullable(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  latitude: z
    .number({ message: "Veuillez saisir une valeur valide" })
    .min(-90, "Veuillez saisir une valeur valide")
    .max(90, "Veuillez saisir une valeur valide"),
  longitude: z
    .number({ message: "Veuillez saisir une valeur valide" })
    .min(-180, "Veuillez saisir une valeur valide")
    .max(180, "Veuillez saisir une valeur valide"),
  imageUrls: z.array(z.string().url()),
  types: z
    .array(z.enum(ClimbingSpotType))
    .min(1, "Veuillez remplir ce champ"),
  difficulties: z
    .array(z.enum(ClimbingSpotDifficulty))
    .min(1, "Veuillez remplir ce champ"),
  bestPeriod: z.string().nullable(),
  address: z.string().nullable(),
  websiteUrl: z.string().url().nullable(),
  phoneNumber: z.string().nullable(),
  email: z.string().email().nullable(),
  parkingAvailable: z.boolean().nullable(),
  toiletsAvailable: z.boolean().nullable(),
  status: z.enum(ClimbingSpotStatus).default(ClimbingSpotStatus.PENDING),
});

export type CreateClimbingSpotInputs = z.infer<typeof createClimbingSpotSchema>;
