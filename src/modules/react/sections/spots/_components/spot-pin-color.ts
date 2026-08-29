import { ClimbingSpotType } from "@/prisma/client";
import { ExtendedClimbingSpot } from "@/modules/core/model/ClimbingSpot";

export type SpotPinCategory =
  | "indoor"
  | "boulder"
  | "lead"
  | "psicobloc"
  | "multi"
  | "outdoor";

/** Couleurs des pins par catégorie (salles indoor, blocs, voies, psicobloc, multi, défaut) */
export const SPOT_PIN_COLORS: Record<SpotPinCategory, string> = {
  indoor: "#3b82f6", // bleu – salles indoor
  boulder: "#f97316", // orange – blocs
  lead: "#22c55e", // vert – voies
  psicobloc: "#06b6d4", // cyan – psicobloc (deep-water soloing)
  multi: "#a855f7", // violet – multi types
  outdoor: "#64748b", // slate – extérieur / défaut
};

/**
 * Détermine la catégorie d'affichage du pin à partir des types du spot.
 * Priorité : Psicobloc > Multi > Indoor > Bloc > Voie > Outdoor.
 */
export function getSpotPinCategory(
  spot: ExtendedClimbingSpot,
): SpotPinCategory {
  const types = (Array.isArray(spot.types) ? spot.types : []).filter(
    (t) => t !== ClimbingSpotType.ALL,
  );

  if (types.includes(ClimbingSpotType.PSICOBLOC)) return "psicobloc";
  if (types.length > 1) return "multi";

  const hasIndoor =
    types.includes(ClimbingSpotType.INDOOR) ||
    types.includes(ClimbingSpotType.INDOOR_BOULDER) ||
    types.includes(ClimbingSpotType.INDOOR_LEAD) ||
    types.includes(ClimbingSpotType.INDOOR_SPEED);
  if (hasIndoor) return "indoor";

  const hasBoulder =
    types.includes(ClimbingSpotType.OUTDOOR_BOULDER) ||
    types.includes(ClimbingSpotType.INDOOR_BOULDER);
  if (hasBoulder) return "boulder";

  const hasLead =
    types.includes(ClimbingSpotType.OUTDOOR_LEAD) ||
    types.includes(ClimbingSpotType.INDOOR_LEAD);
  if (hasLead) return "lead";

  return "outdoor";
}

export function getSpotPinColor(spot: ExtendedClimbingSpot): string {
  return SPOT_PIN_COLORS[getSpotPinCategory(spot)];
}
