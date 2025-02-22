import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";

const getClimbingSpotsByRadiusAndCoords = async (
  radius: number,
  coords: {
    latitude: number;
    longitude: number;
  }
) => {
  return await climbingSpotGateway.getClimbingSpotsByRadiusAndCoords(
    radius,
    coords
  );
};

export default getClimbingSpotsByRadiusAndCoords;
