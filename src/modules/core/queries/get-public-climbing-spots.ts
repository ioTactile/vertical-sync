import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";

const getPublicClimbingSpots = async () => {
  return await climbingSpotGateway.getPublicClimbingSpots();
};

export default getPublicClimbingSpots;
