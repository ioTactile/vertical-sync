import {
  ClimbingSpotDifficulty,
  ClimbingSpotStatus,
  ClimbingSpotType,
} from "@prisma/client";

export const CLIMBING_SPOT_TYPE_LABELS: Record<ClimbingSpotType, string> = {
  ALL: "Tous les types",
  OUTDOOR: "Extérieur",
  INDOOR: "Intérieur",
  OUTDOOR_BOULDER: "Bloc extérieur",
  OUTDOOR_LEAD: "Voie extérieure",
  INDOOR_BOULDER: "Bloc intérieur",
  INDOOR_LEAD: "Voie intérieure",
  INDOOR_SPEED: "Vitesse intérieure",
  PSICOBLOC: "Psicobloc",
};

export const CLIMBING_SPOT_DIFFICULTY_LABELS: Record<
  ClimbingSpotDifficulty,
  string
> = {
  // Niveaux généraux
  BEGINNER: "Débutant (4a - 5b)",
  INTERMEDIATE: "Intermédiaire (5c - 6b)",
  ADVANCED: "Avancé (6c - 7b)",
  EXPERT: "Expert (7c - 8b)",
  ELITE: "Elite (8c et plus)",

  // Cotations détaillées
  GRADE_4A: "4a",
  GRADE_4B: "4b",
  GRADE_4C: "4c",
  GRADE_5A: "5a",
  GRADE_5B: "5b",
  GRADE_5C: "5c",
  GRADE_6A: "6a",
  GRADE_6B: "6b",
  GRADE_6C: "6c",
  GRADE_7A: "7a",
  GRADE_7B: "7b",
  GRADE_7C: "7c",
  GRADE_8A: "8a",
  GRADE_8B: "8b",
  GRADE_8C: "8c",
  GRADE_9A: "9a",
  GRADE_9A_PLUS: "9a+",
  GRADE_9B: "9b",
  GRADE_9B_PLUS: "9b+",
};

export const CLIMBING_SPOT_STATUS_LABELS: Record<ClimbingSpotStatus, string> = {
  PENDING: "En attente",
  APPROVED: "Approuvé",
  REJECTED: "Rejeté",
};
