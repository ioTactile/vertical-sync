import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";

const getClimbingSpotsByRadiusAndCoords = async (
  radius: number,
  coords: [number, number]
) => {
  return await climbingSpotGateway.getClimbingSpotsByRadiusAndCoords(
    radius,
    coords
  );
};

export default getClimbingSpotsByRadiusAndCoords;
